"use client";

import React, { useCallback } from "react";
import { Formik } from "formik";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { LoginSchema } from "@/lib/validations";

type LoginFormType = {
  email: string;
  password: string;
};

export const LoginContainer = () => {
  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const submitHandler = useCallback(async (values: LoginFormType) => {
    try {
      await signIn("credentials", {
        npa: values.email,
        password: values.password,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`/login?error=${error.type}`);
      }
      throw error;
    }
  }, []);

  return (
    <>
      <div className="mb-6 text-center text-[25px] font-bold">Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="mb-4 flex w-1/2 flex-col gap-4">
              <Input
                variant="bordered"
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                defaultValue={initialValues.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••"
                defaultValue={initialValues.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="success"
            >
              Login
            </Button>
          </>
        )}
      </Formik>

      <div className="mt-4 text-sm font-light text-slate-400">
        Belum punya akun ?{" "}
        <Link href="/register" className="font-bold">
          Daftarkan disini
        </Link>
      </div>
    </>
  );
};
