import SignupComponent from "../components/SingUpComponents.jsx";
import BasicMenu from "../menus/BasicMenu.jsx";

const SignupPage = () => {
  return (
      <div className='fixed top-0 left-0 z-[1055] flex flex-col h-full w-full overflow-auto'>
        <BasicMenu/>
        <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
          <SignupComponent/>
        </div>
      </div>
  );
}

export default SignupPage;