import LoginComponent from "../components/LoginComponents.jsx";
import BasicMenu from "../menus/BasicMenu.jsx";

const LoginPage = () => {
  return (
      <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
        <BasicMenu />
        <div className="w-full flex flex-wrap h-full justify-center items-center border-2">
          <div className="max-w-xl w-full px-4">
            <LoginComponent />
          </div>
        </div>
      </div>
  );
};

export default LoginPage;