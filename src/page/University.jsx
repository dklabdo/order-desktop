import React from "react";
import NavBar from "../component/NavBar";
import Select from "../component/Select";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";

function University() {
  return (
    <div className="w-full h-screen bg-white overflow-y-hidden flex flex-col ">
      <NavBar />
      <div className="w-full h-full  flex flex-col  p-5 ">
        <Select />
        <div className="w-full pt-2  flex items-center justify-between ">
          <div className="flex  -space-x-[33px] ml-3 group w-[35%] items-center  ">
            <Search
              size={20}
              className="text-gray-600 mb-[8px] group-focus:text-[#FF5152]  "
            />
            <input
              type="text"
              className="w-full group-focus:text-[#FF5152] focus:border-[#FF5152] pl-10  px-2 py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600  "
              placeholder="type a resturant name"
            />
          </div>
          <button
            onClick={() => handleOpenPopUp("AddResturant")}
            className="flex py-[12px] mr-2 text-md font-light gap-2 items-center px-5 bg-main text-white rounded-2xl "
          >
            {" "}
            <Plus />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default University;
