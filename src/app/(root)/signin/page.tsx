import { SignInForm } from "@/components/entities/forms/SigInForm";

export default function SignInPage() {
  return (
    <section className="wrapper flex h-[calc(100dvh-80px)] w-full flex-col">
      <div className="m-auto w-full max-w-120 min-w-80">
        <SignInForm />
      </div>
    </section>
  );
}
