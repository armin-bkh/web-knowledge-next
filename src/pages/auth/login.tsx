import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToasts } from "react-toast-notifications";

import { ToastMode } from "@/global/toast";
import Input from "@/common/Input/Input";
import { login } from "@/services/auth";
import { loginSchema } from "@/validators/login";

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

  const router = useRouter();
  const { addToast } = useToasts();

  const onLogin = useCallback(async (data: TLoginForm) => {
    try {
      const result = await login(data);
      console.log(result, "results is here");
      await router.replace("/");
      addToast("welcome back to web-knowledge!", {
        appearance: ToastMode.SUCCESS,
        autoDismiss: false,
      });
      reset(defaultValues);
    } catch (e: any) {
      addToast(e.response.data.message, {
        appearance: ToastMode.ERROR,
        autoDismiss: false,
      });
    }
  }, []);

  return (
    <main className="container lg:max-w-screen-xl px-4 md:px-4 mx-auto min-h-screen relative flex-center p-5">
      <img
        src="/svg/signup.svg"
        className="absolute drop-shadow-xl hidden md:block"
      />
      <form
        onSubmit={handleSubmit(onLogin)}
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
        <button
          type="submit"
          disabled={!formState.isValid}
          className="mt-5 bg-cyan-light py-3 rounded-sm text-gray-50 shadow shadow-cyan-light/50 disabled:bg-opacity-50 disabled:shadow-none"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
