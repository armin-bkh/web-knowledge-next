import React from "react";
import { Controller, FieldValue } from "react-hook-form";

export interface IInputProps {
  control: FieldValue<any>;
  name: string;
  label: string;
  type: string;
}

const Input = (props: IInputProps) => {
  const { control, name, label, type } = props;

  return (
    <fieldset className="flex flex-col mb-5 md:mb-7 transition-all">
      <div>
        <label
          htmlFor={name}
          className="capitalize inline text-base md:text-lg font-bold text-gray-darkest transition-all dark:text-gray-50 mb-1 md:mb-3"
        >
          {label}
        </label>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const hasError = fieldState.isTouched && fieldState.error?.message;
          return (
            <>
              <input
                {...field}
                type={type}
                id={name}
                className={`
                px-3 py-1 text-sm
                  md:px-5 md:py-2 rounded-sm outline-none bg-gray-50 focus:border shadow focus:border-cyan-light bg-gray-50 dark:bg-gray-darkest dark:text-gray-50
                ${field.value && !hasError && "border border-cyan-light"}
                ${hasError && "border border-red-400"}
                `}
              />
              {hasError && (
                <span className="text-xs ml-2 mt-2 text-red-400">
                  {fieldState?.error?.message}
                </span>
              )}
            </>
          );
        }}
      />
    </fieldset>
  );
};

export default Input;
