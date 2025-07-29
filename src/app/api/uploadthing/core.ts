import { auth } from "@/auth";
import prisma from "@/prismaClient";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productImageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 10,
    },
  })
    .input(z.object({ productVariantId: z.string() }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload
      const session = await auth();
      if (!session) return { userId: null };
      const user = session.user;

      // If you throw, the user will not be able to upload
      if (!user || user.role !== "ADMIN")
        throw new UploadThingError("Unauthorized");

      const { productVariantId } = input;
      const variant = await prisma.productVariants.findUnique({
        where: { id: productVariantId },
      });
      // If you throw, the user will not be able to upload
      if (!variant) throw new UploadThingError("Product variant not found");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { success: true, userName: user.name, productVariantId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("file url", file.ufsUrl);
      const nameWithoutFormat = file.name.replace(/\.[^/.]+$/, "");
      try {
        await prisma.productImage.create({
          data: {
            url: file.key,
            alt: nameWithoutFormat,
            variants: {
              connect: {
                id: metadata.productVariantId,
              },
            },
          },
        });
      } catch (error) {
        console.error("Error creating product image:", error);
        return {
          uploadedBy: metadata.userId,
          fileUrl: file.ufsUrl,
          isSuccess: false,
        };
      }
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {
        uploadedBy: metadata.userId,
        fileUrl: file.ufsUrl,
        isSuccess: true,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
