"use server";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { auth, signOut, signIn } from "@/auth";
import prisma from "@/prismaClient";

import { saltAndHashPassword } from "@/utils/helpers";

import { Role, type User } from "@prisma/client";
import type { TSignUpSchema, TSignInSchema } from "@/utils/config/schemas";
import type { IResponse } from "@/models/response";

// 1. ready?
export const signInWithCredentials = async (
  body: TSignInSchema,
): Promise<IResponse> => {
  try {
    await signIn("credentials", {
      email: body.email,
      password: body.password,
      redirect: false,
    });
    return { isSuccess: true, message: "Login successful!" };
  } catch (error) {
    console.log("[signInWithCredentials]", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { isSuccess: false, message: "Invalid credentials!" };
        default:
          return { isSuccess: false, message: "Something went wrong!1" };
      }
    }
    return { isSuccess: false, message: "Something went wrong!2" };
  }
};
// 2. check
export const registerWithCreds = async (
  body: TSignUpSchema,
): Promise<IResponse> => {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { name: body.name }],
      },
    });
    if (findUser) return { isSuccess: false, message: "User already exists!" };

    const session = await auth();
    const hashPassword = await saltAndHashPassword(body.password);

    let user: User | null = null;
    if (session?.user.role === Role.GUEST) {
      user = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          email: body.email,
          name: body.name,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          password: hashPassword,
          role: Role.USER,
          verified: null,
          favorite: {
            create: {},
          },
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          password: hashPassword,
          cart: {
            create: {},
          },
          favorite: {
            create: {},
          },
        },
      });
    }
    console.log("userDATA", user);
    if (!user) return { isSuccess: false, message: "User not created!" };

    await signOut({ redirect: false });
    // revalidatePath("/login");
  } catch (error) {
    console.log("[registerWithCreds]", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { isSuccess: false, message: "Invalid credentials!" };
        default:
          return { isSuccess: false, message: "Something went wrong!" };
      }
    }
    return { isSuccess: false, message: "Something went wrong!" };
  }
  return { isSuccess: true, message: "Registration successful!" };
};
// 3. ok
export async function registerGuest() {
  try {
    //node js (v16.17+, v18+) for inbox crypto uuid
    const uuid = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        name: `Guest ${uuid}`,
        email: `guest@${uuid}.com`,
        password: hashSync(uuid, 10),

        verified: new Date(),
        role: Role.GUEST,
        cart: {
          create: {},
        },
      },
      include: {
        cart: true,
      },
    });
    if (!newUser || !newUser.cart) return null;
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      cartId: newUser.cart.id,
      avatar: null,
    };
  } catch (error) {
    console.log(`[GUEST USER] server error ${error}`);
    // authorize wait for null in some went wrong
    return null;
  }
}
