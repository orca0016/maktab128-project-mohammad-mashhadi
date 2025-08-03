"use client";
import { Button, Chip, Input } from "@heroui/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form className="text-title-text-light dark:text-white space-y-6">
      <Input
        classNames={{ inputWrapper: "border-1" }}
        label="نام کاربری"
        type="text"
        variant={"bordered"}
      />
      <Input
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
        label="رمز ورود"
        type={isVisible ? "text" : "password"}
        variant="bordered"
      />
      <Button
        variant="solid"
        size="lg"
        className="bg-title-text-light dark:bg-white w-full text-white dark:text-title-text-light  text-lg font-semibold"
      >
        ورود به حساب
      </Button>
      <div className="flex items-center">
        <div className="border-t-1  border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1 " />
        <Chip color="default" variant="light" className="font-semibold text-lg text-[#637381]">
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
