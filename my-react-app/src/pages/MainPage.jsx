import React from "react";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
  return (
      <BasicLayout>
        <div className="flex items-center justify-center bg-sky-300 h-full w-full">
          <h1 className="text-6xl font-bold text-white">Welcome to the Main Page</h1>
        </div>
      </BasicLayout>
  );
};

export default MainPage;
