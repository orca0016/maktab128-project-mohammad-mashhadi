import HeaderStructure from "@/components/atoms/header-structure";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-gray-dark light:bg-gray-dark min-h-screen ">
      <HeaderStructure >
        <></>
      </HeaderStructure>
      <div className="grid grid-cols-12 min-h-[300vh] ">
        <div className="col-span-4 bg-gray-500">
          dsadasd
        </div>
        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
