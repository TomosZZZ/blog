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

interface FormStatus {
  message: string;
  type: "error" | "success" | "idle" | "loading";
}

const SignupForm = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: "",
    type: "idle",
  });
  const form = useForm<SignupDto>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const submitHandler = async (data: SignupDto) => {
    try {
      setFormStatus({ message: "", type: "loading" });
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      if (!res.ok) {
        setFormStatus({ message: resData.message, type: "error" });
        return;
      }
      setFormStatus({ message: resData.message, type: "success" });
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus({ message: error.message, type: "error" });
      } else {
        setFormStatus({ message: "An unknown error occurred", type: "error" });
      }
    }
  };

  return (
    <Card className="lg:w-1/3 md:w-1/2 w-[80%] max-w-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] bg-[#050505] border-black sm:py-10 py-5   shadow-[0_8px_50px_rgb(255,255,255,0.2)] text-white flex flex-col items-center gap-2 sm:gap-6">
      <h1 className="sm:text-4xl text-2xl font-extrabold  text-center up ">
        Sign up
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="lg:w-1/2 sm:w-4/5 w-[95%]  sm:min-w-[300px] min-w-[250px]  flex flex-col gap-2 text-lg "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
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
                    className="text-black"
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
                    className="text-black"
                    placeholder="******"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormFieldsMessage />
              </FormItem>
            )}
          />
          {formStatus.type === "error" && (
            <FormMessage message={formStatus.message} type="error" />
          )}
          {formStatus.type === "success" && (
            <FormMessage message={formStatus.message} type="success" />
          )}

          <Button
            disabled={formStatus.type === "loading"}
            type="submit"
            className="bg-violet-700 text-xl hover:bg-violet-900"
          >
            Create account
          </Button>

          <Link href="/auth/login" className="text-center mt-3">
            <Button className="text-white font-thin underline" variant={"link"}>
              Already have an account? Log in!
            </Button>
          </Link>
        </form>
      </Form>
    </Card>
  );
};

export default SignupForm;
