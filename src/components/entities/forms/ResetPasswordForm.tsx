"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AsteriskIcon, KeyRoundIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { InputField } from "@/components/features/fields/InputField";
import { Button } from "@/components/shared/buttons/Button";
import { resetPasswordWithToken } from "@/actions/auth";
import { ResetPasswordSchema } from "@/utils/config/schemas";
import { ROUTES } from "@/utils/config/routes/routes";

import type { TResetPasswordSchema } from "@/utils/config";

export const ResetPasswordForm = () => {
  const router = useRouter();

  const params = useSearchParams();
  const token = params.get("token");

  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const submitHandler = async (data: TResetPasswordSchema) => {
    if (!token) {
      toast.error("Invalid reset link.");
      return;
    }
    console.log("payload", data);
    const res = await resetPasswordWithToken(token, data);

    if (res.isSuccess) {
      toast.success("Password reset successfully!");
      router.push(ROUTES.SIGNIN);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Form form={form} onSubmit={submitHandler} title="Set New Password">
      <InputField
        id="newPassword"
        label="New Password"
        type="password"
        Icon={KeyRoundIcon}
        placeholder="Enter new password"
        EyeIcon
        autoComplete="new-password"
      />
      <InputField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        Icon={AsteriskIcon}
        placeholder="Confirm new password"
        autoComplete="new-password"
      />

      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </Form>
  );
};
