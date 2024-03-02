"use client";

import { Form, Formik } from "formik";
import { object } from "yup";

import { Button, FormError, FormSuccess, Group, Input } from "@/components";
import { schema } from "@/libs";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Home() {
  interface FormData {
    email: string;
    password: string;
  }

  const [error, setError] = useState<string>("");

  const login = async (values: FormData) => {
    const { email, password } = values; // Destructure the required fields
    try {
      // await loginUserService({ email, password }); // Pass only the required fields
      // router.push("/dashboard/inventory");
    } catch (error: any) {
      setError(error.message ?? "Failed to log in");
      console.error(error);
    }
  };
  return (
    <>
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
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          await login(values);
          actions.setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-6 w-full">
              <Group
                className="w-full !mb-0 text-dark"
                name="email"
                label="Email"
              >
                <Input
                  as="input"
                  name="email"
                  value={values.email}
                  placeholder="Enter your email"
                />
              </Group>

              <Group
                className="w-full !mb-0 text-dark"
                name="password"
                label="Password"
              >
                <Input
                  as="input"
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                />
              </Group>

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
    </>
  );
}
