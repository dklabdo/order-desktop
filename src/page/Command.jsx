import React, { useContext, useEffect } from "react";
import NavBar from "../component/NavBar";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Filter } from "lucide-react";
import { BadgePlus } from "lucide-react";
import { AppContext } from "../AppProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TimerIcon } from "lucide-react";
import Loader from "../component/Loader";
import { io } from "socket.io-client";
const apiLink = import.meta.env.VITE_API_LINK;
const socketLink = import.meta.env.VITE_API_LINK_REAL_TIME;

const socket = io(`${socketLink}`);

function Command() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleOpenPopUp, setcurrentRes } = useContext(AppContext);
  const queryClient = useQueryClient();

  const oneResturantQuery = useQuery({
    queryKey: ["resturant"],

    queryFn: async () => {
      console.log(`${apiLink}/restaurant/${id}`);
      const res = await axios.get(`${apiLink}/restaurant/${id}`);
      console.log(res.data);
      setcurrentRes(res.data);
      return res.data;
    },
  });

  const getOrder = useQuery({
    queryKey: ["order", id],

    queryFn: async () => {
      console.log(`${apiLink}/restaurant/order/${id}`);

      try {
        const res = await axios.get(`${apiLink}/restaurant/order/${id}`);
        console.log(res.data.data.slice().reverse());
        return res.data.data;
      } catch (err) {
        console.error(err);
      }
    },

  });

  useEffect(() => {
    console.log("test");

    socket.on("connect", (newMessage) => {
      console.log("New message received:", newMessage);
      socket.on("new-order", () => {
        queryClient.invalidateQueries(["order"]);
      });

      // Update React Query cache by invalidating the messages query
    });
  }, [queryClient]);

  return (
    <div className="w-full flex bg-white flex-col h-screen">
      <NavBar />
      <div className="w-full h-full flex flex-col overflow-y-hidden gap-3  px-6 py-2  ">
        <div className="flex items-center justify-between p-2">
          <span className="flex items-center gap-3">
            <button
              onClick={() => {
                navigate("/resturant");
              }}
              className="bg-main cursor-pointer w-12 h-12 flex justify-center items-center p-2 rounded-full"
            >
              <ChevronLeft size={24} className="text-white  " />
            </button>

            {oneResturantQuery.isLoading ? (
              <div className="h-12 w-36 bg-gray-200 rounded-lg "></div>
            ) : oneResturantQuery.isError ? (
              <p>Error {oneResturantQuery.error} </p>
            ) : (
              <div className="text-second flex flex-col  text-xl font-medium ">
                <h2 className="text-md"> {oneResturantQuery.data.name} </h2>
                <p className="text-sm"> {id} </p>
              </div>
            )}
          </span>
          <div className="flex gap-2">
            <button className="px-6 mb-2 py-[10px] items-center gap-2 bg-main text-white flex gpa-2 rounded-2xl ">
              <Filter size={18} />
              filter
            </button>
            <button
              onClick={() => {
                handleOpenPopUp("AddSuplement");
                setsupId(id);
              }}
              className="px-6 mb-2 py-[10px] items-center gap-2 bg-main text-white flex gpa-2 rounded-2xl "
            >
              <BadgePlus className="mb-[2px] " size={20} />
              Suplement
            </button>
          </div>
        </div>

        {/*-------------------------------------------------*/}
        <div className="flex gap-4 ">
          <div className="bg-second rounded-2xl text-white items-center justify-center h-24 w-full flex flex-col gap-2 ">
            <p> 250 </p>
            <h2> Commande </h2>
          </div>

          <div className="bg-second rounded-2xl text-white items-center justify-center h-24 w-full flex flex-col gap-2 ">
            <p> 250 </p>
            <h2> Commande </h2>
          </div>
          <div className="bg-second rounded-2xl text-white items-center justify-center h-24 w-full flex flex-col gap-2 ">
            <p> 250 </p>
            <h2> Commande </h2>
          </div>
        </div>
        {/*-------------------------------------------------*/}
        <div className="w-full h-full flex   flex-wrap overflow-y-auto  items-center rounded-2xl bg-gradient-to-b py-4">
          {getOrder.isLoading ? (
            <Loader />
          ) : getOrder.isError ? (
            <p className="w-full text-center"> Error.... </p>
          ) : (
            getOrder.data.slice().reverse().map((info, index) => {
              return (
                <OrderCard
                  time={info.createdAt}
                  location={info.location}
                  key={index}
                  index={index}
                  product={info.product}
                  total={info.price}
                  id={info._id}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Command;

function OrderCard({ total, id, product, index, location, time }) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div
      title={id}
      className="w-1/2 min-w-96 border-8 border-white p-6 flex flex-col gap-2 rounded-2xl bg-gray-100  "
    >
      <div className="w-full flex justify-center items-center ">
        <div className="w-24 flex justify-center items-center h-24 rounded-full bg-main text-white ">
          <p className="text-2xl"> {index + 1} </p>
        </div>
      </div>
      <div className="slider-container ">
        {product.map((info, index) => {
          return (
            <div key={index} className="p-4 flex items-center  flex-col gap-2 ">
              {info.productId != null ? (
                <>
                  <p className=" text-xl text-center font-bold text-main  ">
                    {" "}
                    {info.productId.productName}{" "}
                  </p>
                  <p className=" text-center  ">
                    {info.SupplementId.map((info2, index2) => {
                      return <span key={index2}> {info2.supplementName} </span>;
                    })}
                  </p>
                  <p className="w-fit py-3 px-6 rounded-2xl bg-main text-white ">
                    {" "}
                    {info.productId.price}{" "}
                  </p>
                </>
              ) : (
                <p>Prouduit suprimer</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="w-full flex px-2 justify-between items-center ">
        <p> {location} </p>
        <p className="flex items-center gap-2">
          {" "}
          <span>
            {" "}
            <TimerIcon />{" "}
          </span>{" "}
          {time}{" "}
        </p>
      </div>
      <div className="w-full rounded-2xl py-4 bg-main text-white flex justify-center items-center ">
        <p> {total}DA </p>
      </div>
    </div>
  );
}

{
  /* <div className="flex justify-between" >
          <div className="w-full flex  gap-4 px-4 py-2 items-center ">
            <button className="p-[7px] bg-main rounded-2xl text-white ">
              <ChevronLeft />
            </button>
            <h2 className="text-lg  ">Calma Chicken</h2>
          </div>

          <div className="flex -space-x-[36px] ml-3 group w-[35%] items-center  ">
            <Search
              size={30}
              className="text-gray-600 group-focus:text-[#FF5152] pb-[10px] "
            />
            <input
              type="text"
              className="w-full group-focus:text-[#FF5152] focus:border-[#FF5152] pl-10  px-2 py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600  "
              placeholder="type a resturant name"
            />
          </div>
        </div> */
}

{
  /* <div className="w-full  relative pl-22 p-1 bg2 h-56 flex flex-col rounded-2xl    ">
<div className=" absolute left-0 top-0 flex justify-center items-center h-56 w-20  ">
  <ChevronLeft
    onClick={() => navigate("/resturant")}
    size={35}
    className="text-white hover:scale-105 hover:-translate-x-1 transition-all cursor-pointer "
  />
</div>
<div className="w-full px-3 py-2  flex items-center justify-between  ">
  <div className="flex py-2 gap-3 items-center">
    <div className=" w-14 h-14 rounded-full bg-gray-200 "></div>
    <h2 className="text-white text-2xl pt-2" > Calma chicken </h2>
  </div>
  <button className="px-6 mb-2 py-[10px] items-center gap-2 bg-main text-white flex gpa-2 rounded-2xl ">
    <Filter size={18} />
    filter
  </button>
</div>
<div className="w-full text-white gap-3 flex justify-center  px-3 pt-2 items-center h-full  ">
  <div className="flex w-full p-5 rounded-2xl bg-black/25 backdrop-blur-4xl flex-col gap-2 items-center">
    <p>200</p>
    <h2>Commande recu</h2>
  </div> 
  <div className="flex p-5 w-full rounded-2xl bg-black/25 backdrop-blur-4xl flex-col gap-2 items-center">
    <p>100</p>
    <h2>Commande livré</h2>
  </div> 
  <div className="flex p-5 w-full rounded-2xl bg-black/25 backdrop-blur-4xl flex-col gap-2 items-center">
    <p>100</p>
    <h2>Commande Anulez</h2>
  </div>
 <div className="flex p-5 w-full rounded-2xl bg-black/25 backdrop-blur-4xl flex-col gap-2 items-center">
    <p>1230000 DA</p>
    <h2>Chifre d'affaire</h2>
  </div>
  
</div>
</div> */
}
