"use client";
import {
  loginFormSchema,
  loginFormSchemaType,
} from "@/validations/login-schema";
import { Button, Chip, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed } from "react-icons/lu";
const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginFormSchema),
  });
  const onSubmit: SubmitHandler<loginFormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-title-text-light dark:text-white space-y-6"
    >
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            type="text"
            label="نام کاربری"
            variant={"bordered"}
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{ inputWrapper: "border-1" }}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="رمز ورود"
            variant="bordered"
            isInvalid={!!fieldState.error}
            type={isVisible ? "text" : "password"}
            errorMessage={fieldState.error?.message}
            classNames={{ inputWrapper: "border-1" }}
            endContent={
              <Button
                isIconOnly
                variant="light"
                type="button"
                onPress={toggleVisibility}
                aria-label="toggle password visibility"
                className="focus:outline-solid outline-transparent rounded-full"
              >
                {isVisible ? (
                  <LuEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <LuEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </Button>
            }
          />
        )}
      />

      <Button
        variant="solid"
        size="lg"
        type="submit"
        className="bg-title-text-light dark:bg-white w-full text-white dark:text-title-text-light  text-lg font-semibold"
      >
        ورود به حساب
      </Button>
      <div className="flex items-center">
        <div className="border-t-1  border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1 " />
        <Chip
          color="default"
          variant="light"
          className="font-semibold text-lg text-[#637381]"
        >
          یا
        </Chip>
        <div className="border-t-1  border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1" />
      </div>
      <div className=" flex justify-center items-center gap-6">
        <Button isIconOnly variant="light" className="rounded-full">
          <FcGoogle size={"1.5rem"} />
        </Button>
        <Button isIconOnly variant="light" className="rounded-full">
          <FaGithub size={"1.5rem"} />
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
