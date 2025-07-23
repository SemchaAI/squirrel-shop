"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { KeyRound, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { InputField } from "@/components/features/fields/InputField";
import { Button } from "@/components/shared/buttons/Button";
import { signInWithCredentials } from "@/actions/auth";

import { ROUTES } from "@/utils/config/routes/routes";
import { type TSignInSchema, SignInSchema } from "@/utils/config";

export const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(SignInSchema),
  });
  const submitHandler = async (data: TSignInSchema) => {
    try {
      console.log("SigInForm", data);
      const res = await signInWithCredentials(data);

      if (!res.isSuccess) {
        form.setError("email", { message: res.message });
        return;
      }
      toast.success(res.message);
      // router.push("/");
      window.location.href = "/";
    } catch (error) {
      console.log("[SigInForm]", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form form={form} onSubmit={submitHandler}>
      {
        // inputs
        <>
          <InputField
            id="email"
            label="Email"
            type="email"
            Icon={Mail}
            autoComplete="username"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            Icon={KeyRound}
            autoComplete="current-password"
          />
        </>
      }
      {
        // formControls
        <div className="flex flex-col gap-2 border-t border-border py-2">
          <div className="flex items-center justify-between">
            <span className="text-text-medium text-sm">
              Don&apos;t have an account?{" "}
            </span>
            <Link
              className="px-0.5 text-primary underline hover:text-primary-hover"
              href={ROUTES.SIGNUP}
            >
              Sign Up
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-medium text-sm">Forgot password?</span>
            <Link
              className="px-0.5 text-primary underline hover:text-primary-hover"
              href={ROUTES.FORGOT_PASSWORD}
            >
              Reset
            </Link>
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </div>
      }
    </Form>
  );
};
