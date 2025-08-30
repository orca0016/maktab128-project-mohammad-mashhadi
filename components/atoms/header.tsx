import AuthorizeUserAction from "../molecules/authorize-user-action";
import HeaderStructure from "../molecules/header-structure";


const Header = () => {
  return (
    <div>
      <HeaderStructure>
        <AuthorizeUserAction />
      </HeaderStructure>
    </div>
  );
};

export default Header;
