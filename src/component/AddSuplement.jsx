import { X } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../AppProvider";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";

const apiLink = import.meta.env.VITE_API_LINK;

function AddSuplement() {
  const { handleClosePopUp, currentRes } = useContext(AppContext);
  const clientQuery = useQueryClient();
  const supArr = currentRes.SupplementId.reverse();

  function addSuplement(e) {
    e.preventDefault();
    addSuplementMutation.mutate({
      supplementName: e.target[0].value,
      price: e.target[1].value,
    });
  }

  // useEffect(() => {
  //   if (divRef.current) {
  //     divRef.current.scrollTop = 200;
  //   }
  // }, []);

  const addSuplementMutation = useMutation({
    mutationKey: ["addSuplement"],
    mutationFn: async (data) => {
      const res = await axios.post(
        `${apiLink}/restaurant/supplement/${currentRes._id}`,
        data
      );
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      document.getElementById("form1").value = "";
      document.getElementById("form2").value = "";
      Swal.fire({
        title: "Suplement ajouter avec succes",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      clientQuery.invalidateQueries(["resturant"]);
    },
  });

  return (
    <div className="w-[70%] flex flex-col items-center justify-center relative bg-white rounded-2xl h-fit pt-6 pb-2">
      <div className="w-full pb-12 pt-3 flex justify-between items-center px-10 ">
        <h2 className="text-2xl text-main ">Ajouter un Suplement</h2>
        <X
          size={34}
          onClick={() => handleClosePopUp()}
          className="text-main cursor-pointer "
        />
      </div>
      <div className="flex px-8 flex-col gap-2 w-full  ">
        <form
          onSubmit={(e) => addSuplement(e)}
          className="flex items-center gap-3  "
        >
          <input
            className="px-3 w-[60%]  py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 "
            type="text"
            required
            id="form1"
            placeholder="Le nom du suplement"
          />
          <input
            className="px-3 w-[40%]  py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 "
            type="number"
            inputMode="numeric"
            id="form2"
            placeholder="Le prix du prouduit"
          />
          <button
            type="submit"
            disabled={addSuplementMutation.isPaused}
            className={` py-3 mb-2 ${
              addSuplementMutation.isPending ? "bg-gray-400" : "bg-main"
            } rounded-2xl px-6 text-white  `}
          >
            Ajouter
          </button>
        </form>
        <div
          className="w-full overflow-y-auto mt-5  py-4 flex flex-col  gap-6 h-56 px-8 "
        >
          {currentRes.SupplementId != null &&
            supArr.map((info, index) => {
              return (
                <SupLine
                  key={index}
                  price={info.price}
                  name={info.supplementName}
                  id={info._id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

function SupLine({ id, name, price }) {
  const removeSuplementMutation = useMutation({
    mutationKey: ["removeSuplement"],
    mutationFn: async () => {
      try{
        const res = await axios.delete(`${apiLink}/supplement/${id}`);
      console.log(res.data);
      return res.data;
      }catch(err){
        console.error(err);
      }
    },
    onSuccess: () => {
      Swal.fire({
        title: "Suplement suprimer avec succes",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  return (
    <div className="w-full hover:bg-main  flex justify-between items-center px-5">
      <p className="w-[60%] "> {name} </p>
      <p className=" w-[30%] "> {price} </p>
      <button onClick={() => removeSuplementMutation.mutate()} className="bg-main text-white rounded-full p-2 flex justify-center items-center w-[35px] h-[35px]   ">
        {" "}
        <Trash />{" "}
      </button>
    </div>
  );
}

export default AddSuplement;
