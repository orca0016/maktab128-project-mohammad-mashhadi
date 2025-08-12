"use client";
import { useState } from "react";

import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import {
  signUpFormSchema,
  signUpFormSchemaType,
} from "@/validations/signUp-schema";
import { addToast, Button, Chip, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signUpFormSchema),
  });

  const signUpUser = useMutation({
    mutationFn: (data: signUpFormSchemaType) =>
      axiosInstanceBackEnd()
        .post("/api/auth/signUp", data)
        .then((res) => res.data),

    onSuccess: (res: IResponseUserData) => {
      localStorage.setItem("access-token", res.token.accessToken);
      localStorage.setItem("refresh-token", res.token.refreshToken);
      localStorage.setItem("user-id", res.data.user._id);

      addToast({
        title: "اکانت ساخته شد  .",
        description: `تبریک اکانت شما با موفقیت ساخته شد .`,
        color: "success",
      });
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      if (error.message.includes("409")) {
        addToast({
          title: "خطا در ساخت اکانت .",
          description: `کاربری با این اطلاعات در سامانه وجود دارد .`,
          color: "danger",
        });
      }else{
        addToast({
          title: "خطا در ساخت اکانت .",
          description: `مشکلی خیر منتظره رخ داد. (${error.message}) .`,
          color: "danger",
        });

      }
    },
  });

  const onSubmit: SubmitHandler<signUpFormSchemaType> = (data) => {
    signUpUser.mutate(data);
  };
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="text-title-text-light dark:text-white space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="firstname"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              type="text"
              label="نام "
              autoComplete="off"
              variant={"bordered"}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              classNames={{ inputWrapper: "border-1" }}
              disabled={signUpUser.isPending || signUpUser.isSuccess}
              {...field}
            />
          )}
        />
        <Controller
          name="lastname"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              type="text"
              label="نام خانوادگی "
              autoComplete="off"
              variant={"bordered"}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              classNames={{ inputWrapper: "border-1" }}
              disabled={signUpUser.isPending || signUpUser.isSuccess}
              {...field}
            />
          )}
        />
      </div>

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
            disabled={signUpUser.isPending || signUpUser.isSuccess}
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
            disabled={signUpUser.isPending || signUpUser.isSuccess}
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

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            type="text"
            label="شماره تلفن"
            variant={"bordered"}
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            classNames={{ inputWrapper: "border-1" }}
            disabled={signUpUser.isPending || signUpUser.isSuccess}
            {...field}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            type="text"
            label="آدرس "
            variant={"bordered"}
            isInvalid={!!fieldState.error}
            classNames={{ inputWrapper: "border-1" }}
            errorMessage={fieldState.error?.message}
            disabled={signUpUser.isPending || signUpUser.isSuccess}
          />
        )}
      />

      <Button
        size="lg"
        type="submit"
        variant="solid"
        isLoading={signUpUser.isPending}
        disabled={signUpUser.isPending || signUpUser.isSuccess}
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

export default SignUpForm;
