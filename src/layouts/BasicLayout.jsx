import React from "react";
import BasicMenu from "../menus/BasicMenu.jsx";

const BasicLayout = ({ children }) => {
  return (
      <>
        <BasicMenu />
        <div className="w-screen h-screen flex flex-col bg-gray-50">
          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>
        </div>
      </>
  );
};

export default BasicLayout;
