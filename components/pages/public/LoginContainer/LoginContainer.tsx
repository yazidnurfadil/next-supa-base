"use client";

import React, { useCallback } from "react";
import { Formik } from "formik";
import Link from "next/link";
import { getCsrfToken, signIn } from "next-auth/react";

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
    const csrfToken = await getCsrfToken();
    await signIn("credentials", {
      csrfToken,
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });
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
