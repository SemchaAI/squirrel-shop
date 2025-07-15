"use server";
import { AuthError } from "next-auth";
import { hashSync } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { signOut, signIn } from "@/auth";
import prisma from "@/prismaClient";

import { fetcher, saltAndHashPassword } from "@/utils/helpers";
import { API_ROUTES, ROUTES } from "@/utils/config";

import { Role, type User } from "@prisma/client";
import type { TSignUpSchema, TSignInSchema } from "@/utils/config/schemas";
import { IDataResponse, type IResponse } from "@/models/response";
import { headers } from "next/headers";

//0
export async function getIPAddress() {
  return (await headers()).get("x-forwarded-for");
}

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
          return {
            isSuccess: false,
            message: "Invalid credentials or not verified email",
          };
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
): Promise<IDataResponse<{ id: string } | null>> => {
  try {
    if (!process.env.NEXTAUTH_URL)
      throw new Error("Missing  NEXTAUTH_URL in env");

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { name: body.name }],
      },
    });
    //email already in use and verified
    if (existingUser?.verified) {
      return {
        data: null,
        isSuccess: false,
        message:
          "User with this  email or nickname already exists and verified.",
      };
    }

    const hashedPassword = await saltAndHashPassword(body.password);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // new data
    let user: User | null = null;
    if (!existingUser) {
      user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,

          password: hashedPassword,
          verified: null,
          role: Role.USER,
          favorite: { create: {} },
          cart: { create: {} },
          verificationCode: {
            create: {
              code: otp,
              expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
          },
        },
      });
    } else {
      const [userData] = await prisma.$transaction([
        prisma.user.update({
          where: { id: existingUser.id },
          data: {
            email: body.email,
            name: body.name,
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,

            password: hashedPassword,
            verified: null,
          },
        }),
        prisma.verificationCode.upsert({
          where: { userId: existingUser.id },
          update: {
            code: otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          },
          create: {
            code: otp,
            userId: existingUser.id,
          },
        }),
      ]);
      user = userData;
    }
    if (!user) throw new Error("User wasn`t created/updated");
    const activationUrl = `${process.env.NEXTAUTH_URL}${ROUTES.VERIFY}?id=${user.id}&code=${otp}`;

    const ipClient = await getIPAddress();
    await fetcher<IDataResponse<null>>(
      `${process.env.NEXTAUTH_URL}${API_ROUTES.ACTIVATION}`,
      {
        method: "POST",
        body: JSON.stringify({
          user,
          code: otp,
          link: activationUrl,
          ipClient,
        }),
      },
    );
    //if activation wasn`t sent we already have user in db,
    //he need to know about error and resend mail
    // if (!res.isSuccess) {
    //throw new Error(res.message);
    // }

    await signOut({ redirect: false });
    return {
      data: { id: user.id },
      isSuccess: true,
      message: "Registration successful!",
    };
    // revalidatePath("/login");
  } catch (error) {
    console.log("[registerWithCreds]", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            data: null,
            isSuccess: false,
            message: "Invalid credentials!",
          };
        default:
          return {
            data: null,
            isSuccess: false,
            message: "Something went wrong!",
          };
      }
    }
    return { data: null, isSuccess: false, message: "Something went wrong!" };
  }
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

//4 tmp
export async function verifyUser(id: string, code: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { verificationCode: true },
    });
    if (!user)
      return { data: null, isSuccess: false, message: "User not found!" };
    if (!user.verificationCode)
      return { data: null, isSuccess: false, message: "Code not found!" };
    if (user.verificationCode.remainingAttempts <= 0)
      return {
        data: null,
        isSuccess: false,
        message: "Attempts are over! Try to resend code",
      };

    const isCodeValid = user.verificationCode.code === code;
    if (!isCodeValid) {
      const code = await prisma.verificationCode.update({
        where: {
          userId: id,
        },
        data: {
          remainingAttempts: {
            decrement: 1,
          },
        },
      });
      return {
        data: null,
        isSuccess: false,
        message: `Invalid code. Attempts left: ${code.remainingAttempts}`,
      };
    }

    await prisma.user.update({
      where: { id },
      data: { verified: new Date() },
    });
    await prisma.verificationCode.delete({
      where: {
        id: user.verificationCode.id,
      },
    });
    return { data: null, isSuccess: true, message: "User verified!" };
  } catch (error) {
    console.log("[verifyUser]", error);
    return { data: null, isSuccess: false, message: "Something went wrong!" };
  }
}

//5tmp
export async function resendVerificationCode(userData: User) {
  console.log("userData", userData);
  const user = await prisma.user.findUnique({
    where: { id: userData.id },
  });
  if (!user) return { isSuccess: false, message: "User not found." };

  const existing = await prisma.verificationCode.findFirst({
    where: {
      userId: userData.id,
      createdAt: {
        gte: new Date(Date.now() - 3 * 60 * 1000), // cooldown: 3 min
      },
    },
  });

  if (existing)
    return {
      isSuccess: false,
      message: "Please wait 3 minutes before requesting another code.",
    };

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.verificationCode.update({
    where: {
      userId: userData.id,
    },
    data: {
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min as in db
      createdAt: new Date(),
    },
  });
  const ipClient = await getIPAddress();
  console.log("ipClient", ipClient);
  const activationUrl = `${process.env.NEXTAUTH_URL}${ROUTES.VERIFY}?id=${user.id}&code=${code}`;
  const res = await fetcher<IDataResponse<null>>(
    `${process.env.NEXTAUTH_URL}${API_ROUTES.ACTIVATION}`,
    {
      method: "POST",
      body: JSON.stringify({
        user,
        code,
        link: activationUrl,
        ipClient,
      }),
    },
  );
  if (!res.isSuccess) throw new Error(res.message);
  // await sendActivationMail(user.email, activationUrl, code);

  return { isSuccess: true, message: "Code resent successfully." };
}
