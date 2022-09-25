import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToasts } from "react-toast-notifications";

import { ToastMode } from "@/global/toast";
import Input from "@/common/Input/Input";
import { signup } from "@/services/auth";
import { signupSchema } from "@/validators/signup";

export type TSignupForm = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const defaultValues: TSignupForm = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const SignupPage = () => {
  const { control, reset, formState, handleSubmit } = useForm<TSignupForm>({
    defaultValues,
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(signupSchema),
  });

  const router = useRouter();
  const { addToast } = useToasts();

  const onSignup = useCallback(async (data: TSignupForm) => {
    try {
      console.log(data, "data is here");
      const { confirmPassword, ...user } = data;
      const result = await signup(user);
      console.log(result, "result is here");
      await router.replace("/");
      addToast("welcome to web-knowledge!", {
        appearance: ToastMode.SUCCESS,
        autoDismiss: false,
      });
    } catch (e: any) {
      addToast(e.response.data.message, {
        appearance: ToastMode.ERROR,
        autoDismiss: false,
      });
      console.log(e, "error is here");
    }
  }, []);

  return (
    <main className="container lg:max-w-screen-xl px-4 md:px-4 mx-auto min-h-screen relative flex-center p-5">
      <img
        src="/svg/signup.svg"
        className="absolute drop-shadow-xl -z-10 md:z-0"
      />
      <form
        onSubmit={handleSubmit(onSignup)}
        className="w-full md:w-auto flex flex-col md:ml-44 bg-gray-100 dark:bg-gray-dark z-10 rounded-xl p-5 shadow-lg shadow-gray-dark/50"
      >
        <h3 className="text-4xl md:text-5xl mb-10 text-cyan-light font-black">
          Sign up
        </h3>
        <Input control={control} name="name" label="name" type="text" />
        <Input control={control} name="email" label="email" type="email" />
        <Input
          control={control}
          name="phoneNumber"
          label="phone number"
          type="text"
        />
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            control={control}
            name="password"
            label="password"
            type="password"
          />
          <Input
            control={control}
            name="confirmPassword"
            label="password confirmation"
            type="password"
          />
        </div>
        <button
          type="submit"
          disabled={!formState.isValid}
          className="mt-5 bg-cyan-light py-3 rounded-sm text-gray-50 shadow shadow-cyan-light/50 disabled:bg-opacity-50 disabled:shadow-none"
        >
          Register
        </button>
      </form>
    </main>
  );
};

export default SignupPage;
