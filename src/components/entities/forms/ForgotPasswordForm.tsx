"use client";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { InputField } from "@/components/features/fields/InputField";
import { Button } from "@/components/shared/buttons/Button";
import { useCooldown } from "@/utils/hooks";
import { API_ROUTES, ForgotPasswordSchema } from "@/utils/config";
import { fetcher } from "@/utils/helpers";
import { getIPAddress } from "@/actions/auth";

import type { TForgotPasswordSchema } from "@/utils/config";
import type { IDataResponse } from "@/models/response";

export const ForgotPasswordForm = () => {
  const { cooldown, startCooldown } = useCooldown(60);
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const isDisabled =
    !form.formState.isValid || form.formState.isSubmitting || cooldown > 0;

  const submitHandler = async (data: TForgotPasswordSchema) => {
    try {
      const ipClient = await getIPAddress();
      const res = await fetcher<IDataResponse<null>>(
        `${API_ROUTES.FORGOT_PASSWORD}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            ipClient: ipClient,
          }),
        },
      );

      if (!res.isSuccess) {
        toast.error(res.message || "Failed to send reset email.");
        return;
      }
      startCooldown();
      toast.success("Password reset email sent. Check your inbox!");
    } catch (error) {
      console.error("ForgotPasswordForm error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Form form={form} onSubmit={submitHandler} title="Reset Password">
      <>
        <InputField
          id="email"
          label="Email"
          type="email"
          Icon={Mail}
          placeholder="Enter your email"
        />
      </>
      <div className="flex flex-col gap-2 border-t border-border py-2">
        <Button className="w-full" type="submit" disabled={isDisabled}>
          {cooldown > 0 ? `Wait ${cooldown} seconds` : "Send reset link"}
        </Button>
      </div>
    </Form>
  );
};
