import Link from "next/link";
import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-xl px-8 py-8 pt-12 space-y-12 bg-card rounded-xl border">
        <h1 className="font-semibold text-2xl">Create your Account</h1>
        <RegisterForm />
        <p className="text-center">
          Have an account?{" "}
          <Link className="text-indigo-500 hover:underline" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
