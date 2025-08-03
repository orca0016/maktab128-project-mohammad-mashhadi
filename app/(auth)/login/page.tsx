import LoginForm from "@/components/molecules/login-form"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className="max-w-[420px] w-full ">
      <div className="my-5">
        <h1 className="text-2xl text-title-text-light dark:text-white my-6">
          وارد اکانت خود شوید.
        </h1>
        <p className="text-gray-secondary-text-dark">
          هنوز اکانتی ندارید؟ 
          <Link href={"/sign-up"} className="text-custom-purple font-semibold">
            شروع کنید
          </Link>
        </p>
      </div>
      <LoginForm/>
    </div>
  )
}

export default LoginPage