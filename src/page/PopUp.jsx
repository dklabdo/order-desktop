import React, { useContext } from "react";
import AddResturant from "../component/AddResturant";
import { AppContext } from "../AppProvider";
import AddProduct from "../component/AddProduct";
import AddSuplement from "../component/AddSuplement";

function PopUp() {
  const { currentPopUp } = useContext(AppContext);

  return (
    currentPopUp != null && (
      <div  className="absolute top-0 left-0 w-full h-screen flex justify-center items-center z-20 bg-black/60   ">
        {currentPopUp === "AddResturant" && <AddResturant />}
        {currentPopUp === "AddProduct" && <AddProduct/>  }
        {currentPopUp === "AddSuplement" && <AddSuplement/>  }
      </div>
    )
  );
}

export default PopUp;
