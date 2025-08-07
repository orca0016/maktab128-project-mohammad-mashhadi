import HeaderStructure from "@/components/molecules/header-structure";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-gray-dark bg-white min-h-screen ">
      <HeaderStructure />
      <div className="grid grid-cols-12 min-h-screen">
        <div className="xl:col-span-4 md:col-span-6  hidden md:block   dark:bg-[#21282E] bg-[#F9FAFB] pt-20 text-center px-10">
          <h1 className="text-4xl dark:text-white text-title-text-light font-[900]">
            سلام ,خوش آمدید.
          </h1>
          <p className="dark:text-gray-secondary-text-dark text-gray-secondary-text-light my-7">
            یک خرید راحت و ایمن را با ما تجربه کنید.
          </p>
          <div className="w-full">
            <Image
              src="/images/auth/login-welcome.webp"
              alt="welcome image"
              width={600}
              height={500}
              className="w-full h-auto my-16"
              loading="lazy"
            />
          </div>
        </div>
        <div className="xl:col-span-8 md:col-span-6 col-span-12  pt-20 flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
