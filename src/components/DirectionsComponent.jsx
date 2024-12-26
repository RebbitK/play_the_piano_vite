import React, { useEffect } from "react";

export const API_NAVER_MAP = import.meta.env.VITE_APP_API_NAVER_KEY

const DirectionsComponent = () => {
  useEffect(() => {
    try {
      const script = document.createElement("script")
      script.src = `http://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_NAVER_MAP}`
      script.async = true;
      script.onload = () => {
        const mapOptions = {
          center: new naver.maps.LatLng(37.3595704, 127.105399),
          zoom: 10,
        }
        new naver.maps.Map("map", mapOptions)
      }
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    } catch (error) {
    }
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>
}

export default DirectionsComponent
