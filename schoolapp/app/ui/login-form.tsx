'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (result?.error) {
      setError("Email or password incorrect");
    } else if (result?.ok) {
      router.push(result.url || "/dashboard");
    } else {
      setError("Unexpected error, try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto"
    >
      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        required
      />
      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        required
      />

      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (window.confirm("Are you sure you want to cancel and leave this page?")) {
              router.push("/");
            }
          }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </form>
  );
}
