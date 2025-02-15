import React from "react";
import img from "../assets/logo.png";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
function NavBar() {

  return (
    <div className="w-full py-2  flex justify-between px-8 ">
      <div className="w-[50%] flex gap-4 items-center   ">
        <img
          className="w-14 border-[.8px] h-14 object-contain object-center rounded-full"
          src={img}
          alt="..."
        />
        <div className="flex flex-col   ">
          <h2 className="text-second font-medium text-lg ">Order admin</h2>
          <p className="text-gray-600 font-light"> qrorder@gmail.com </p>
        </div>
      </div>
      <div className="py-4 ">
        <button className="text-main  cursor-pointer ">
          <button className="flex bg-main text-white py-3 px-4 rounded-2xl items-center gap-2">
            <LogOut />
            Deconecter
          </button>
        </button>
      </div>
    </div>
  );
}

export default NavBar;

{
  /* <div className="flex flex-row-reverse gap-4 px-2  items-center ">
  <Link
    className={`py-[10px] border-[.8px] border-[#200E32] px-3 text-[#200E32] hover:text-white hover:bg-[#200E32] rounded-2xl ${
      window.location.pathname === "/admin" && "bg-[#200E32] text-white "
    }      `}
    to="/admin"
  >
    Home
  </Link>
  <Link
    className={`py-[10px] border-[.8px] border-[#200E32] px-3 text-[#200E32] hover:text-white hover:bg-[#200E32] rounded-2xl ${
      window.location.pathname === "/command" && "bg-[#200E32] text-white "
    }    `}
    to="/command"
  >
    {" "}
    Commande{" "}
  </Link>
  <Link
    className={`py-[10px] border-[.8px] border-[#200E32] px-3 text-[#200E32] hover:text-white hover:bg-[#200E32] rounded-2xl ${
      window.location.pathname === "/products" && "bg-[#200E32] text-white "
    }  `}
    to="/products"
  >
    {" "}
    Products{" "}
  </Link>
</div>; */
}
