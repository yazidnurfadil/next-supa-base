"use client";

import { useCallback } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { Formik } from "formik";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

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
        email: values.email,
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
        onSubmit={submitHandler}
        initialValues={initialValues}
        validationSchema={LoginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <>
            <div className="mb-4 flex w-1/2 flex-col gap-4">
              <Input
                type="email"
                name="email"
                label="Email"
                variant="bordered"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                errorMessage={errors.email}
                placeholder="example@domain.com"
                isInvalid={!!errors.email && !!touched.email}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                variant="bordered"
                onBlur={handleBlur}
                placeholder="••••••"
                onChange={handleChange}
                value={values.password}
                errorMessage={errors.password}
                isInvalid={!!errors.password && !!touched.password}
              />
            </div>

            <Button
              variant="flat"
              color="success"
              onPress={() => handleSubmit()}
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