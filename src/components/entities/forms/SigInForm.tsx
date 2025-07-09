"use client";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { KeyRound, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { InputField } from "@/components/features";
import { signInWithCredentials } from "@/actions/auth";

import { type TSignInSchema, SignInSchema } from "@/utils/config";
import { Button } from "@/components/shared";

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
          <InputField id="email" label="Email" type="text" Icon={Mail} />
          <InputField
            id="password"
            label="Password"
            type="password"
            Icon={KeyRound}
          />
        </>
      }
      {
        // formControls
        <div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </div>
      }
    </Form>
  );
};
