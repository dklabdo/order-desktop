import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "../AppProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import NavBar from "../component/NavBar";
import { Plus } from "lucide-react";
import Select from "../component/Select";
import { Search } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import def from "../assets/def.jpg";
import Loader from "../component/Loader";
import Swal from "sweetalert2";
const apiLink = import.meta.env.VITE_API_LINK;

function Resturants() {
  const navigate = useNavigate();
  const { user, setUser, handleOpenPopUp } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user when they are authenticated
      if (user === null) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const resturantQuery = useQuery({
    queryKey: ["resturants"],

    queryFn: async () => {
      const res = await axios.get(`${apiLink}/restaurant`);
      console.log(res.data);
      return res.data;
    },
  });

  console.log(resturantQuery.data);

  return (
    <div className="w-full overflow-y-hidden flex flex-col bg-white h-screen">
      <NavBar />

      <div className="w-full h-full flex flex-col  p-5 ">
        <Select />

        <div className="w-full pt-2  flex items-center justify-between ">
          <div className="flex  -space-x-[33px] ml-3 group w-[35%] items-center  ">
            <Search
              size={20}
              className="text-gray-600 group-focus:text-[#FF5152] mb-[8px] "
            />
            <input
              type="text"
              className="w-full group-focus:text-[#FF5152] focus:border-[#FF5152] pl-10  px-2 py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600  "
              placeholder="type a resturant name"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => handleOpenPopUp("AddResturant")}
              className="flex cursor-pointer py-[12px] mr-2 text-md font-light gap-2 items-center px-5 bg-main text-white rounded-2xl "
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className="py-6 px-4 pb-28 overflow-y-auto flex flex-col gap-3">
          {resturantQuery.isLoading && <Loader />}
          {resturantQuery.isError && <p>Error ...</p>}
          {!resturantQuery.isError &&
            !resturantQuery.isLoading &&
            resturantQuery.data != null &&
            resturantQuery.data.data.map((info, index) => {
              return (
                <Resturant
                  total={2000}
                  key={index}
                  email={info.email}
                  name={info.name}
                  id={info._id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

function ParamSection() {
  return <></>;
}

function Resturant({ id, img, total, name, email, banned }) {
  const navigate = useNavigate();
  const queries = useQueryClient();
  const deleteResturant = useMutation({
    mutationKey: ["deleteRes"],
    mutationFn: async () => {
      console.log(`${apiLink}/restaurant/${id}`);
      const res = await axios.delete(`${apiLink}/restaurant/${id}`);
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      queries.invalidateQueries(["resturants"]);
    },
  });

  function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this resturant",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        queries.invalidateQueries(["resturants"]);
        Swal.fire({
          title: "Deleted!",
          text: "This resturant has been deleted.",
          icon: "success",
        });
      }
    });
  }

  return (
    <div className="flex px-6 cursor-pointer hover:bg-[#200E32] hover:text-white justify-between rounded-2xl items-center bg-gray-100  ">
      <div
        onClick={() => navigate(`/command/${id}`)}
        className="flex  h-full py-5 justify-between w-full items-center "
      >
        <div className="w-14 bg-gray-200 h-14 rounded-full">
          <img className="rounded-3xl" src={def} />
        </div>
        <p className="w-[20%] "> {name} </p>
        <p className="w-[20%] "> {email} </p>
        <p className="w-[20%] "> {total}DA </p>
      </div>
      {/* <button
        onClick={() => handleDelete()}
        className="bg-main cursor-pointer z-20 py-2 px-4 text-white rounded-2xl"
      >
        Suprimer
      </button> */}

      {/* <ShieldCKheck /> */}
    </div>
  );
}

export default Resturants;
