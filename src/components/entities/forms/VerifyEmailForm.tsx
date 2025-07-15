"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { OtpField } from "@/components/features";
import { Button } from "@/components/shared";
import { resendVerificationCode, verifyUser } from "@/actions/auth";

import { OtpSchema, ROUTES, type TOtpSchema } from "@/utils/config";
import { useCooldown } from "@/utils/hooks";
import type { User } from "@prisma/client";
import { useEffect } from "react";

interface IProps {
  session: User;
  code: string | undefined;
}

export const VerifyEmailForm = ({ code, session }: IProps) => {
  const { cooldown, startCooldown } = useCooldown(30);

  useEffect(() => {
    startCooldown();
  }, []);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      code: code || "",
    },
    mode: "onSubmit",
  });
  const submitHandler = async (data: TOtpSchema) => {
    try {
      console.log("data", data);
      const res = await verifyUser(session.id, data.code);
      if (!res.isSuccess) {
        form.setError("code", { message: res.message });
        return;
      } else {
        toast.success(res.message);
        router.push(`${ROUTES.SIGNIN}`);
      }
    } catch (error) {
      console.log("[SigInForm]", error);
      toast.error("Something went wrong!");
    }
  };
  const clickHandler = async () => {
    try {
      console.log("clickHandler", session);
      const res = await resendVerificationCode(session);
      if (!res.isSuccess) {
        form.setError("code", { message: res.message });
      } else {
        toast.success("New code sent!");
      }
      startCooldown();
    } catch (error) {
      console.log("[VerifyEmailForm]", error);
      toast.error("ResendVerificationCode went wrong!");
    }
  };

  return (
    <Form form={form} onSubmit={submitHandler}>
      {
        // inputs
        <div className="flex flex-col gap-2">
          <h3 className="text-center text-2xl font-bold text-text-high">
            Email Verification
          </h3>
          <p className="text-center text-sm text-text-low">
            Enter the 6-digit verification code that was sent to your email
          </p>
          <OtpField
            name="code"
            length={6}
            onComplete={() => form.handleSubmit(submitHandler)()}
          />
        </div>
      }
      {
        // formControls
        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Verify Account
          </Button>
          <div className="flex items-center justify-between">
            <p>Did not receive a code?</p>
            <Button
              onClick={clickHandler}
              disabled={cooldown > 0}
              size="none"
              type="button"
              variant="text"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
            </Button>
          </div>
        </div>
      }
    </Form>
  );
};
