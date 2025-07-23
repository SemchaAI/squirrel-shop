import { ResetPasswordForm } from "@/components/entities/forms/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <section className="wrapper flex h-[calc(100dvh-80px)] w-full flex-col">
      <div className="m-auto w-full max-w-120 min-w-80">
        <ResetPasswordForm />
      </div>
    </section>
  );
}
