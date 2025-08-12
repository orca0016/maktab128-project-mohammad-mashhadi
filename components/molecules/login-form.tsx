"use client";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import {
  loginFormSchema,
  loginFormSchemaType,
} from "@/validations/login-schema";
import { addToast, Button, Chip, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const loginUser = useMutation({
    mutationFn: async (data: loginFormSchemaType) =>
      await axiosInstanceBackEnd()
        .post(
          "/api/auth/login",
          {
            username: data.username,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",

              credentials: "include",
            },
          }
        )
        .then((res) => res.data),
    onSuccess: (res: IResponseUserData) => {
      localStorage.setItem("access-token", res.token.accessToken);
      localStorage.setItem("refresh-token", res.token.refreshToken);
      localStorage.setItem("user-id", res.data.user._id);

      addToast({
        title: "درود .",
        description: `شما  با موفقیت وارد شدید .`,
        color: "success",
      });
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      if (error.message.includes("401")) {
        addToast({
          title: "دوباره امتحان کنید.",
          description: "کاربر مود نظر یافت نشد .",
          color: "danger",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<loginFormSchemaType> = (data) => {
    loginUser.mutate(data);
  };
  return (
    <form
      autoComplete="off"
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
            classNames={{ inputWrapper: "border-1" }}
            errorMessage={fieldState.error?.message}
            disabled={loginUser.isPending || loginUser.isSuccess}
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
            classNames={{ inputWrapper: "border-1" }}
            errorMessage={fieldState.error?.message}
            disabled={loginUser.isPending || loginUser.isSuccess}
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
        size="lg"
        type="submit"
        variant="solid"
        isLoading={loginUser.isPending}
        disabled={loginUser.isPending || loginUser.isSuccess}
        className="bg-title-text-light dark:bg-white w-full text-white dark:text-title-text-light  text-lg font-semibold"
      >
        ورود به حساب
      </Button>

      <div className="flex items-center">
        <div className="border-t-1  border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1 " />
        <Chip
          variant="light"
          color="default"
          className="font-semibold text-lg text-[#637381]"
        >
          یا
        </Chip>
        <div className="border-t-1  border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1" />
      </div>
      <div className=" flex justify-center items-center gap-6">
        <Button
          isIconOnly
          variant="light"
          className="rounded-full cursor-not-allowed"
        >
          <FcGoogle size={"1.5rem"} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          className="rounded-full cursor-not-allowed"
        >
          <FaGithub size={"1.5rem"} />
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
