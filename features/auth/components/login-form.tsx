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
    <Card className="lg:w-1/3 md:w-1/2 w-[80%] max-w-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] border-black py-10  shadow-[0_8px_50px_rgb(255,255,255,0.2)] text-white flex flex-col items-center gap-12">
      <h1 className="text-4xl font-extrabold  text-center ">Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="lg:w-1/2 sm:w-4/5 w-[90%]  sm:min-w-[300px] min-w-[250px]  flex flex-col gap-8 text-lg "
        >
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
          {formStatus.status === "error" && (
            <FormMessage type="error" message={formStatus.message} />
          )}
          <Button
            type="submit"
            className="bg-violet-700 text-xl hover:bg-violet-900"
            disabled={formStatus.status === "loading"}
          >
            Login
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
