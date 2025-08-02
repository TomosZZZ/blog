"use client";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage as FormFieldsMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginDto } from "../dto";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { FormMessage } from "./form-message";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormStatus {
  message: string;
  status: "error" | "success" | "idle" | "loading";
}
const LoginForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: "",
    status: "idle",
  });

  const router = useRouter();

  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data: LoginDto) => {
    setFormStatus({ message: "", status: "loading" });

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setFormStatus({ message: "Invalid credentials", status: "error" });
      return;
    }

    router.replace("/blog");
    setFormStatus({ message: "Success", status: "success" });
  };
  return (
    <Card className=" w-[90%] max-w-[500px]  bg-[#1F1F1F] border-none py-10 shadow-xl shadow-purple-600/20 px-4 text-white flex flex-col items-center gap-3 md:gap-10">
      {" "}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight">
        Login
      </h1>{" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="w-full max-w-sm flex flex-col gap-3 md:gap-6 text-md sm:text-lg"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent border border-slate-700 placeholder:text-slate-500 focus:border-violet-500 transition-colors"
                    type="email"
                    placeholder="joedoe@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormFieldsMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent border border-slate-700 placeholder:text-slate-500 focus:border-violet-500 transition-colors"
                    placeholder="******"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormFieldsMessage />
              </FormItem>
            )}
          />
          {formStatus.status === "error" && (
            <FormMessage type="error" message={formStatus.message} />
          )}
          <Button
            type="submit"
            className="bg-violet-700 text-xl font-bold hover:bg-violet-800 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#1F1F1F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={formStatus.status === "loading"}
          >
            {formStatus.status === "loading" ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-center text-sm text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            Register
          </Link>
        </p>
      </Form>
    </Card>
  );
};

export default LoginForm;
