"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserApi } from "../lib/api/user-api";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const registerSchema = z.object({
  name: z.string().min(1, "Name wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await UserApi.userRegister(data);
      toast("User has been created", {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Register
        </h2>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name")}
            id="name"
            title="Masukkan name Anda"
            placeholder="yourname"
            className={cn(errors.name && "border-red-500")}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

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
          Register
        </Button>

        {/* Link ke Login */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
