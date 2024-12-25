import UpdatePasswordComponent from "../components/UpdatePasswordComponent.jsx";
import BasicMenu from "../menus/BasicMenu.jsx";

const UpdatePasswordPage = () => {
  return (
      <div
          className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full overflow-auto bg-gray-50">
        <BasicMenu/>
        <div className="w-full flex justify-center items-center h-full">
          <div
              className="w-full max-w-[30%] p-10 bg-white border border-gray-300 rounded-lg shadow-lg">
            <UpdatePasswordComponent/>
          </div>
        </div>
      </div>
  )
}

export default UpdatePasswordPage;