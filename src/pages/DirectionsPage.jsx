import React from "react"
import BasicMenu from "../layouts/BasicLayout.jsx"
import DirectionsComponent from "../components/DirectionsComponent.jsx";

const DirectionsPage = () => {

  return (
      <div
          className='fixed top-0 left-0 z-[1055] flex flex-col h-full w-full overflow-auto'>
        <BasicMenu/>
        <div
            className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
          <DirectionsComponent/>
        </div>
      </div>
  )
}

export default DirectionsPage
