"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { KeyRoundIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { InputField } from "@/components/features/fields/InputField";
import { registerWithCreds } from "@/actions/auth";
import { Button } from "@/components/shared/buttons/Button";
import { ROUTES } from "@/utils/config/routes/routes";

import { type TSignUpSchema, SignUpSchema } from "@/utils/config";

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
  });
  const submitHandler = async (data: TSignUpSchema) => {
    try {
      // console.log("SigUpForm", data);
      const res = await registerWithCreds(data);
      if (!res.isSuccess) {
        form.setError("email", { message: res.message });
      } else {
        toast.success(res.message);
        router.push(`${ROUTES.VERIFY}?id=${res.data?.id}`);
      }
    } catch (error) {
      console.log("[SigInForm]", error);
    }
  };

  return (
    <Form form={form} onSubmit={submitHandler} title="Sign Up">
      {
        // inputs
        <>
          <InputField
            id="email"
            label="Email"
            type="text"
            Icon={MailIcon}
            autoComplete="email"
          />
          <InputField id="name" label="Nickname" type="text" Icon={UserIcon} />
          <InputField
            id="password"
            label="Password"
            type="password"
            Icon={KeyRoundIcon}
            autoComplete="new-password"
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            Icon={KeyRoundIcon}
            autoComplete="off"
          />
          <InputField
            id="firstName"
            label="First Name"
            type="text"
            Icon={UserIcon}
            autoComplete="given-name"
          />
          <InputField
            id="lastName"
            label="Last Name"
            type="text"
            Icon={UserIcon}
            autoComplete="family-name"
          />
          <InputField
            id="phone"
            label="Phone"
            type="text"
            Icon={PhoneIcon}
            autoComplete="tel"
          />
        </>
      }
      {
        // formControls
        <div className="flex flex-col gap-2 border-t border-border py-2">
          <div className="flex items-center justify-between">
            <span className="text-text-medium text-sm">
              Already have an account?{" "}
            </span>
            <Link
              className="px-0.5 text-primary underline hover:text-primary-hover"
              href={ROUTES.SIGNIN}
            >
              {" "}
              Sign In
            </Link>
          </div>
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      }
    </Form>
  );
};
