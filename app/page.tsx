"use client";

import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { object } from "yup";

import { Button, FormError, Field } from "@/components";
import { loginUserService } from "@/services/auth";
import { schema } from "@/libs";
import { useState } from "react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useStore } from "@/hooks";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const { store, setStore } = useStore();

  const [error, setError] = useState<string>("");

  const login = async (values: FormData) => {
    const { email, password } = values; // Destructure the required fields
    try {
      await loginUserService({ email, password })
        .then((data) => {
          setStore((state) => ({
            ...state,
            user: data.user,
            token: data.token,
          }));
          setTimeout(() => router.push(DEFAULT_LOGIN_REDIRECT));
        })
        .catch((error) => {
          toast.error("Login failed");
        });

      // router.push("/dashboard/inventory");
    } catch (error: any) {
      setError(error.message ?? "Failed to log in");
    }
  };

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-64 min-h-screen">
      <div className="w-[156px] lg:w-[312px] h-[124px] lg:h-[248px] relative">
        <Image
          src={"/img/logo.png"}
          alt={"HX logo"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
          priority
        />
      </div>
      <div className="flex flex-col gap-6 w-[360px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Log in to your account</h1>
          <p className="text-neutral-40 text-center">Welcome back</p>
        </div>

        <Formik
          validateOnMount
          enableReinitialize
          validationSchema={object({
            email: schema.requireEmail("Email"),
            password: schema.requireString("Password"),
          })}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            await login(values);
            actions.setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-6 w-full">
                <Field.Group
                  className="w-full !mb-0 text-dark"
                  name="email"
                  label="Email"
                >
                  <Field.Input
                    as="input"
                    name="email"
                    value={values.email}
                    placeholder="Enter your email"
                  />
                </Field.Group>

                <Field.Group
                  className="w-full !mb-0 text-dark"
                  name="password"
                  label="Password"
                >
                  <Field.Input
                    as="input"
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  />
                </Field.Group>

                {/* <p
                  className="text-info text-right font-medium text-sm"
                  onClick={resetPassword}
                >
                  Forgot password
                </p> */}

                <FormError message={error} />

                <Button
                  className="flex gap-3 justify-center bg-info text-white !py-2.5 rounded-md font-medium"
                  {...{ isSubmitting }}
                  type="submit"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="font-medium text-info">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
