import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/navImg/img1.png"
import img2 from "../assets/navImg/img2.png"
import img3 from "../assets/navImg/img3.png"
import img4 from "../assets/navImg/img4.png"
import img5 from "../assets/navImg/img5.png"

function Select() {
  return <div className=" w-full flex gap-4 min-h-24 rounded-2xl">
    <SelectCard link="/resturant" title="Les resturants" img={img1} />
    <SelectCard link="/livreur" title="Les Livreurs" img={img2} />
    <SelectCard link="/university" title="Les Univérsites" img={img3} />
    <SelectCard link="/products" title="Les Prouduits" img={img4} />
    <SelectCard link="/news" title="Les Nauveautés" img={img5} />
  </div>;
}

function SelectCard({link , title , img}) {
    const navigate = useNavigate()
  return (
    <div
        className={`py-[10px] flex flex-col gap-[8px] cursor-pointer items-center w-[25%] max-h-24  h-22   px-3 text-[#200E32] hover:text-white hover:bg-[#200E32] rounded-2xl ${
          window.location.pathname === link ? "bg-[#200E32] text-white " : "bg-gray-100"
        }      `}
        to={link}
        onClick={() => navigate(link)}
      >
        <img className="w-10 " src={img} alt="..." />
        <p className="text-sm  ">{title}</p>
      </div>
  );
}

export default Select;
