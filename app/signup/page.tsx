"use client";

import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { object, ref } from "yup";
import Image from "next/image";

import { Button, Group, Input } from "@/components";
import { createUserService } from "@/services/auth";
import { schema } from "@/libs";

export default function Home() {
  const router = useRouter();
  interface FormData {
    name: string;
    email: string;
    password: string;
  }

  const signup = async (values: FormData) => {
    console.log(values);

    await createUserService(values)
      .then((resp) => {
        console.log(resp);
        toast.success("User registered");
        router.push("./dashboard/products");
      })
      .catch((err: any) => {
        toast.error(err.message ?? "Failed to sign up");
        console.log(err);
      });
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

            await signup({
              name: values.name,
              email: values.email,
              password: values.password,
            });

            actions.setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-6 w-full">
                <Group
                  className="w-full !mb-0 text-dark"
                  name="name"
                  label="Name"
                  required
                >
                  <Input
                    as="input"
                    name="name"
                    type="name"
                    value={values.name}
                    placeholder="Enter your name"
                  />
                </Group>

                <Group
                  className="w-full !mb-0 text-dark"
                  name="email"
                  label="Email"
                  required
                >
                  <Input
                    as="input"
                    name="email"
                    type="email"
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
                    placeholder="Create a password"
                  />
                </Group>

                <Group
                  className="w-full !mb-0 text-dark"
                  name="confirmPassword"
                  label="Password"
                >
                  <Input
                    as="input"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    placeholder="Confirm your password"
                  />
                </Group>

                <Button
                  className="flex gap-3 justify-center bg-primary text-white !py-2.5 rounded-md font-medium"
                  type="submit"
                  {...{ isSubmitting }}
                >
                  Get started
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/login" className="font-medium text-info">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
