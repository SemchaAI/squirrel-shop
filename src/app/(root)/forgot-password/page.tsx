import { ForgotPasswordForm } from "@/components/entities";

export default function ForgotPasswordPage() {
  return (
    <section className="flex h-[calc(100dvh-80px)] w-full flex-col">
      <div className="m-auto w-full max-w-1/3 min-w-80">
        <ForgotPasswordForm />
      </div>
    </section>
  );
}
