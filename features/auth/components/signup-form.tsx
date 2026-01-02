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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupDto } from "../dto";
import { FormMessage } from "./form-message";
import Link from "next/link";
import { useRegister } from "../api";

const SignupForm = () => {
  const [message, setMessage] = useState("");
  const form = useForm<SignupDto>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { mutate, isPending, isError, isSuccess } = useRegister();

  const submitHandler = async (data: SignupDto) => {
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        setMessage("Account created successfully! You can now log in.");
      },
      onError: (error) => {
        setMessage(error.message);
      },
    });
  };

  return (
    <Card className="w-[90%] max-w-[500px]  bg-[#1F1F1F] border-none py-10 shadow-xl shadow-purple-600/20 text-white flex flex-col items-center px-4 gap-3 md:gap-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight">
        Sign Up
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="w-full max-w-sm flex flex-col gap-2 md:gap-6 text-md sm:text-lg"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent border border-slate-700 placeholder:text-slate-500 focus:border-violet-500 transition-colors"
                    placeholder="Joe Doe"
                    {...field}
                  />
                </FormControl>
                <FormFieldsMessage />
              </FormItem>
            )}
          />
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
          {isError && <FormMessage message={message} type="error" />}
          {isSuccess && <FormMessage message={message} type="success" />}

          <Button
            disabled={isPending}
            type="submit"
            className="mt-2 bg-violet-700 text-xl font-bold hover:bg-violet-800 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#1F1F1F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-center text-sm text-slate-400 mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              Log in!
            </Link>
          </p>
        </form>
      </Form>
    </Card>
  );
};

export default SignupForm;
