import SignUpForm from "@/components/molecules/signUp-form";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="max-w-[420px] w-full px-3 md:px-0">
      <div className="my-5">
        <h1 className="text-2xl text-title-text-light dark:text-white my-6 font-bold">
          کاملا رایگان شروع کنید.{" "}
        </h1>
        <p className="text-gray-secondary-text-dark">
          درحال حاضر اکانتی دارید؟{" "}
          <Link href={"/sign-up"} className="text-custom-purple font-semibold">
            وارد شوید{" "}
          </Link>
        </p>
      </div>
      <SignUpForm />
    </div>
  );
};

export default LoginPage;
