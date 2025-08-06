import AuthorizeUserAction from "./authorize-user-action";
import HeaderStructure from "./header-structure";

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
