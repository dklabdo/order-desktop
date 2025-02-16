import React, { useContext, useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { AppContext } from "../AppProvider";
import { X, LockKeyhole } from "lucide-react";
import def from "../assets/defImg.svg";
import { MapPin } from "lucide-react";
import { Phone } from "lucide-react";
import { LockKeyholeOpen } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
const apiLink = import.meta.env.VITE_API_LINK;

function AddResturant() {
  const {
    handleClosePopUp,
    togleShowPassword,
    resturent,
    hadnleChangeResturant,
  } = useContext(AppContext);
  const [file, setfile] = useState(null);
  const [url, seturl] = useState(null);
  const passRef = useRef();
  const [show, setshow] = useState(false);
  const clientQueries = useQueryClient();

  function HandleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file);
    console.log("test");
    setfile(file);
  }
  function HandleFileChange(e) {
    e.preventDefault();
    const file = e.target.files[0];

    setfile(file);
  }
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        seturl(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(url);
    }
  }, [file]);

  const AddProductMutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async () => {
      const res = await axios.post(`${apiLink}/restaurant`, resturent);
      return res.data;
    },
    onSuccess: () => {
      clientQueries.invalidateQueries(["resturants"]);
      handleClosePopUp();
      Swal.fire({
        title: "Resturant crée avec succes",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    AddProductMutation.mutate();
  }

  return (
    <div className="w-[70%] flex flex-col items-center justify-center relative bg-white rounded-2xl h-fit py-6 ">
      <div className="w-full pb-12 pt-3 flex justify-between items-center px-10 ">
        <h2 className="text-2xl text-main ">Ajouter un resturant</h2>
        <X
          size={34}
          onClick={() => handleClosePopUp()}
          className="text-main cursor-pointer "
        />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex px-16 h-fit flex-col items-center gap-4 w-full "
      >
        {/* <label
          htmlFor="file"
          onDrop={(e) => HandleDrop(e)}
          onDragOver={(e) => e.preventDefault()}
          className="object-cover w-32 my-6 h-32 flex justify-center items-center rounded-2xl shadow-lg shadow-gray-100  "
        >
          <img
            className=" rounded-2xl "
            src={url == null ? def : url}
            alt="..."
          />
        </label> */}

        <input
          onChange={(e) => HandleFileChange(e)}
          id="file"
          type="file"
          className="hidden"
        />
        <div className="flex w-full justify-between flex-wrap ">
          <input
            className="px-2 w-full py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 "
            type="text"
            name="name"
            required
            placeholder="Le nom du resturant"
            onChange={(e) => hadnleChangeResturant(e)}
          />

          <div className="flex relative  w-[49%]  items-center  ">
            <Mail size={28} className="text-gray-600 absolute left-2  pb-2" />
            <input
              className="pl-10  py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 w-full "
              type="email"
              name="email"
              required
              placeholder="example@gmail.com"
              onChange={(e) => hadnleChangeResturant(e)}
            />
          </div>
          <div className="flex w-[49%] relative items-center  ">
            {show ? (
              <LockKeyhole
                onClick={() => {
                  togleShowPassword(passRef);
                  setshow(false);
                }}
                size={28}
                className="text-gray-600 absolute left-2 cursor-pointer z-20 pb-2"
              />
            ) : (
              <LockKeyholeOpen
                onClick={() => {
                  togleShowPassword(passRef);
                  setshow(true);
                }}
                size={28}
                className="text-gray-600 absolute left-2 cursor-pointer z-20 pb-2"
              />
            )}
            <input
              className="pl-10  py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 w-full "
              type="password"
              ref={passRef}
              name="password"
              required
              placeholder="mot de pass"
              onChange={(e) => hadnleChangeResturant(e)}
            />
          </div>
          <div className="flex w-[49%] relative items-center  ">
            <Phone
              onClick={() => togleShowPassword(passRef)}
              size={28}
              className="text-gray-600 absolute left-2 cursor-pointer z-20 pb-2"
            />
            <input
              className="pl-10  py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 w-full "
              type="password"
              name="phoneNumber"
              required
              placeholder="0X XX XX XX XX"
              onChange={(e) => hadnleChangeResturant(e)}
            />
          </div>
          <div className="flex w-[49%] relative items-center  ">
            <MapPin
              onClick={() => togleShowPassword(passRef)}
              size={28}
              className="text-gray-600 absolute left-2 cursor-pointer z-20 pb-2"
            />
            <input
              className="pl-10  py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 w-full "
              type="url"
              name="location"
              required
              placeholder="Google map link"
              onChange={(e) => hadnleChangeResturant(e)}
            />
          </div>
        </div>
        <div className="flex  w-full  py-6 items-center justify-between">
          <button
            type="submit"
            disabled={AddProductMutation.isPending}
            className={`py-[12px] ${
              AddProductMutation.isPending ? "bg-gray-400" : "bg-main"
            } w-full rounded-2xl cursor-pointer h-fit  text-white px-8`}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddResturant;
