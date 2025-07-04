"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { UserApi } from "../lib/api/user-api";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await UserApi.userLogin(data);
      toast("User has been login", {
        description: `${new Date().toLocaleString()}`,
        closeButton: true,
        duration: 3000,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.error;
        toast(message, {
          description: `${new Date().toLocaleString()}`,
          closeButton: true,
          duration: 1000,
        });
      } else {
        console.log(error);
      }
    } finally {
      reset();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      router.back();
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            title="Masukkan email Anda"
            placeholder="email@example.com"
            type="email"
            className={cn(errors.email && "border-red-500")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            title="Masukkan password Anda"
            placeholder="******"
            type="password"
            className={cn(errors.password && "border-red-500")}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>

        {/* Link ke Register */}
        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
