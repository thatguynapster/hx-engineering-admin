"use client";

import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { object, ref } from "yup";
import { useState } from "react";
import Image from "next/image";

import { Button, Field, FormError, FormSuccess } from "@/components";
import { createUserService } from "@/services/auth";
import { schema } from "@/libs";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Home = () => {
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const signup = async (values: FormData) => {
    const { name, email, password } = values; // Destructure the required fields
    try {
      await createUserService({ name, email, password }); // Pass only the required fields
      setSuccess("User registered.");
      router.push("/"); // Redirect to login page after successful signup
    } catch (error: any) {
      setError(error.message ?? "Failed to sign up");
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-64 min-h-screen">
      <div className="w-[155px] lg:w-[311px] h-[132px] lg:h-[264px] relative">
        <Image src={"/img/logo.png"} alt={"HX logo"} fill />
      </div>
      <div className="flex flex-col gap-6 w-[360px]">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-center">
            Create an account
          </h1>
        </div>

        <Formik
          validateOnMount
          enableReinitialize
          validationSchema={object({
            name: schema.requireString("Name"),
            email: schema.requireEmail("Email"),
            password: schema.requirePassword("Password"),
            confirmPassword: schema
              .requirePassword("Confirm")
              .oneOf([ref("password"), ""], "Passwords don't match"),
          })}
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            setSuccess("");
            setError("");
            await signup(values);
            actions.setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-6 w-full">
                <Field.Group
                  className="w-full !mb-0 text-dark"
                  name="name"
                  label="Name"
                  required
                >
                  <Field.Input
                    as="input"
                    name="name"
                    type="name"
                    value={values.name}
                    placeholder="Enter your name"
                  />
                </Field.Group>

                <Field.Group
                  className="w-full !mb-0 text-dark"
                  name="email"
                  label="Email"
                  required
                >
                  <Field.Input
                    as="input"
                    name="email"
                    type="email"
                    value={values.email}
                    placeholder="Enter your email"
                  />
                </Field.Group>

                <Field.Group
                  className="w-full !mb-0 text-dark"
                  name="password"
                  label="Password"
                  required
                >
                  <Field.Input
                    as="input"
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="Create a password"
                  />
                </Field.Group>

                <Field.Group
                  className="w-full !mb-0 text-dark"
                  name="confirmPassword"
                  label="Confirm Password"
                  required
                >
                  <Field.Input
                    as="input"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    placeholder="Confirm your password"
                  />
                </Field.Group>

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button
                  className="flex gap-3 justify-center bg-info text-white !py-2.5 rounded-md font-medium"
                  type="submit"
                  disabled={isSubmitting}
                  {...{ isSubmitting }}
                >
                  Get started
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/" className="font-medium text-info">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
};

export default Home;
