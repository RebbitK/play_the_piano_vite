import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import test from "../img/test.png"

const MainPage = () => {
  return (
      <BasicLayout>
        <div
            className="relative mx-auto mt-0"
            style={{
              width: "100%",
              height: "700px",
              marginTop: "0",
              backgroundImage: `url(${test})`,
              backgroundPosition: "top center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
        />
      </BasicLayout>
  )
}

export default MainPage;
