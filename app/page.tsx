"use client";

import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { object } from "yup";

import { Button, Group, Input } from "@/components";
import { loginUserService } from "@/services/auth";
import { schema } from "@/libs";

export default function Home() {
  const router = useRouter();

  interface FormData {
    email: string;
    password: string;
  }

  const login = async (values: FormData) => {
    const { email, password } = values; // Destructure the required fields
    try {
      await loginUserService({ email, password }); // Pass only the required fields
      toast.success("Login successful. Loading panel...");
      router.push("/dashboard/products");
    } catch (error: any) {
      toast.error(error.message ?? "Failed to log in");
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

                {/* <p
                  className="text-info text-right font-medium text-sm"
                  onClick={resetPassword}
                >
                  Forgot password
                </p> */}

                <Button
                  className="flex gap-3 justify-center bg-primary text-white !py-2.5 rounded-md font-medium"
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
