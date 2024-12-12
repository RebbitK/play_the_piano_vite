import React from "react";
import BasicMenu from "../menus/BasicMenu.jsx";


const BasicLayout = ({children}) => {
  return (
      <>
        <BasicMenu></BasicMenu>
        <div className="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4
md:space-y-0">
          <main className="bg-white md:w-2/3 lg:w-3/4 px-5 py-10">
            <h1 className="text-2xl md:text-4xl">{children}</h1>
          </main>
        </div>
      </>
  );
}
export default BasicLayout;