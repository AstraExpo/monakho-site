import { FallbackLoader } from "@/components/FallBackLoader";
import { LoginForm } from "@/components/forms/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <LoginForm />
    </Suspense>
  );
}
