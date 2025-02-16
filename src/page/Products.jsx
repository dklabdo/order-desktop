import React, { useContext, useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import Select from "../component/Select";
import { Plus } from "lucide-react";
import { Search } from "lucide-react";
import { EyeOff } from "lucide-react";
import { PencilLine } from "lucide-react";
import { AppContext } from "../AppProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../component/Loader";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const apiLink = import.meta.env.VITE_API_LINK;
const uploadLink = import.meta.env.VITE_API_LINK_UPLOADS;

function Products() {
  const { handleOpenPopUp, setcurrentRes } = useContext(AppContext);
  const [selected, setselected] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const resturantQuery = useQuery({
    queryKey: ["resturants"],

    queryFn: async () => {
      const res = await axios.get(`${apiLink}/restaurant`);
      console.log(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    if (resturantQuery.data != null) {
      setcurrentRes(resturantQuery.data.data[selected]);
    }
  }, [selected, resturantQuery.isLoading]);

  return (
    <div className="w-full overflow-y-hidden flex flex-col bg-white h-screen">
      <NavBar />

      <div className="w-full h-full  flex flex-col  p-5 ">
        <Select />
        <div className="slider-container ">
          <Slider {...settings}>
            {resturantQuery.isLoading ? (
              <div className="flex w-full justify-center  py-6 gap-3">
                <p className="text-center text-main pt-2 ">Loading ...</p>
              </div>
            ) : resturantQuery.isError ? (
              <p>Error ...</p>
            ) : (
              resturantQuery.data.data.map((info, index) => {
                return (
                  <div
                    onClick={() => {
                      setselected(index);
                    }}
                    key={index}
                    className="px-2 pt-2"
                  >
                    <div
                      className={`h-12 flex justify-center ${
                        selected === index
                          ? "bg-main text-white"
                          : "bg-white text-main"
                      } py-3 rounded-2xl my-3 items-center cursor-pointer px-5  `}
                    >
                      {" "}
                      {info.name}{" "}
                    </div>
                  </div>
                );
              })
            )}
          </Slider>
        </div>

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
            onClick={() => handleOpenPopUp("AddProduct")}
            className="flex cursor-pointer py-[12px] mr-2 text-md font-light gap-2 items-center px-5 bg-main text-white rounded-2xl "
          >
            {" "}
            <Plus />{" "}
          </button>
        </div>
        <div className="w-full  py-8 pb-20 overflow-y-auto flex flex-wrap gap-4 h-full">
          {resturantQuery.isLoading ? (
            <Loader />
          ) : resturantQuery.isError ? (
            <p>Error ...</p>
          ) : (
            resturantQuery.data.data[selected].product.map((info, index) => {
              return (
                <ProductCard
                  key={index}
                  desc={info.description}
                  img={info.image}
                  price={info.price}
                  name={info.productName}
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

function ProductCard({ name, img, desc, price, id }) {
  const [url, seturl] = useState(null);
  const queries = useQueryClient();
  console.log(img);

  useEffect(() => {
    async function getImg() {
      const res = await axios
        .get(`${uploadLink}/${img}`, {
          responseType: "blob",
        })
        .then((res) => {
          const imageObjectUrl = URL.createObjectURL(res.data);
          seturl(imageObjectUrl);
        });
    }
    getImg();
  }, [img]);

  const deleteProduct = useMutation({
    mutationKey: ["deletePr"],
    mutationFn: async () => {
      const res = await axios.delete(`${apiLink}/products/${id}`);
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      queries.invalidateQueries(["products"]);
      Swal.fire({
        title: "Prouduit suprimer avec succes",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  function handledelete() {
    

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        
        deleteProduct.mutate();
       
      }
    });
  }

  return (
    <div className="max-w-72 w-72 scale-90  overflow-y-hidden rounded-2xl  relative flex flex-col items-center   h-[470px]   ">
      <div className=" w-[70%]  top-0 h-42 flex justify-center items-center absolute border-none z-10 bg-white rounded-2xl   ">
        {url != null && <img className="w-[80%] " src={url} />}
      </div>
      <div className="h-[80%] gap-3 relative  text-white items-center pt-[44%] flex flex-col mt-[20%]  w-full bg-second rounded-2xl ">
        <h2 className="text-xl pb-2  "> {name} </h2>
        <p className="text-sm w-full overflow-hidden font-light text-gray-300 px-5 text-center ">
          {desc}
        </p>
        <p className=""> {price}DA </p>
        <div className="p-3 w-full absolute bottom-0  py-3 flex divide-x-2 divide-[#FF5152] h-18 mt-[6px] rounded-bl-2xl rounded-br-2xl bg-[#FF5152]/30 ">
          <div className=" w-[50%] text-main flex justify-center gap-2 items-center flex-col ">
            <EyeOff size={25} />
            <p className="text-sm">Desactiver</p>
          </div>
          <div className=" w-[50%] text-main flex justify-center gap-2 items-center flex-col ">
            <PencilLine size={25} />
            <p className="text-sm">Modifier</p>
          </div>
          <div
            onClick={() => handledelete()}
            className=" w-[50%] text-main flex justify-center gap-2 items-center flex-col "
          >
            <Trash size={25} />
            <p className="text-sm">Suprimer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
