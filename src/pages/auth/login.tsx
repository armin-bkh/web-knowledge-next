import React, { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/common/Input/Input";
import { loginSchema } from "@/validators/login";
import { useCRouter } from "@/hooks/useCRouter";
import { useAuth, useAuthActions } from "@/containers/Providers/AuthProvider";

export type TLoginForm = {
  email: string;
  password: string;
};

const defaultValues: TLoginForm = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { control, reset, formState, handleSubmit } = useForm<TLoginForm>({
    defaultValues,
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(loginSchema),
  });

  console.log("test");

  const { user } = useAuth();
  const { handleLogin } = useAuthActions();

  const router = useCRouter();

  useEffect(() => {
    if (user) {
      (async () => {
        await router.replace("/");
        reset(defaultValues);
      })();
    }
  }, [user]);

  return (
    <main className="container lg:max-w-screen-xl px-4 md:px-4 mx-auto min-h-screen relative flex-center p-5">
      <img
        src="/svg/signup.svg"
        className="absolute drop-shadow-xl hidden md:block"
      />
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full md:w-1/3 flex flex-col md:ml-44 bg-gray-100 dark:bg-gray-dark z-10 rounded-xl p-5 shadow-lg shadow-gray-dark/50"
      >
        <h3 className="text-4xl md:text-5xl mb-10 text-cyan-light font-black">
          Login
        </h3>
        <Input control={control} name="email" label="email" type="email" />
        <Input
          control={control}
          name="password"
          label="password"
          type="password"
        />
        <div className="mt-5 flex flex-col">
          <Link href="/auth/signup">
            <a className="mb-1 text-xs underline text-blue-400">
              Create an account
            </a>
          </Link>
          <button
            type="submit"
            disabled={!formState.isValid}
            className="bg-cyan-light py-3 rounded-sm text-gray-50 shadow shadow-cyan-light/50 disabled:bg-opacity-50 disabled:shadow-none"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
