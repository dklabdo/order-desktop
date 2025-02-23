import { X } from "lucide-react";
import def from "../assets/defImg.svg";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppProvider";
import { RemoveFormattingIcon } from "lucide-react";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const apiLink = import.meta.env.VITE_API_LINK;

function AddProduct() {
  const {
    handleClosePopUp,
    product,
    setproduct,
    hadnleChangeProduct,
    currentRes,
  } = useContext(AppContext);
  const quesries = useQueryClient();
  const [file, setfile] = useState(null);
  const [url, seturl] = useState(null);
  const [selectedSup, setselectedSup] = useState(0);
  const [supArr, setsupArr] = useState([]);

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

  function compterMots(texte) {
    if (!texte.trim()) return 0; // Vérifie si le texte est vide après suppression des espaces
    return texte.trim().split(/\s+/).length; // Sépare par les espaces et compte les mots
  }

  const addProductMutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async () => {
      const result = currentRes.SupplementId.map((item) => item._id).join(",");
      console.log({
        supplementIds: result,
        ...product,
        image: file,
      });

      try {
        const res = await axios.post(
          `${apiLink}/restaurant/product/${currentRes._id}`,
          {
            supplementIds: result,
            ...product,
            image: file,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.data);

        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    onSuccess: () => {
      quesries.invalidateQueries(["products"]);
      setproduct({
        productName: "",
        description: "",
        price: null,
      });
      handleClosePopUp();
      Swal.fire({
        title: "Proudit crée avec succes",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

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

  function handleChange(e) {
    console.log(compterMots(product.description));

    if (
      e.target.name == "description" &&
      compterMots(product.description) >= 10
    ) {
      console.log(product.productName);
      return;
    }
    hadnleChangeProduct(e);
  }

  function addSup() {
    setsupArr([...supArr, currentRes.SupplementId[selectedSup]]);
  }

  function close() {
    setproduct({
      productName: "",
      description: "",
      price: null,
    });
    handleClosePopUp();
  }

  return (
    <div className="w-[70%] flex flex-col items-center justify-center relative bg-white rounded-2xl h-fit py-6 ">
      <div className="w-full pb-6 pt-3 flex justify-between items-center px-10 ">
        <h2 className="text-2xl text-main ">Ajouter un prouduit </h2>
        <X
          size={34}
          onClick={() => close()}
          className="text-main cursor-pointer "
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex px-16 h-fit flex-col items-center gap-4 w-full "
      >
        {/* <div
          onDrop={(e) => HandleDrop(e)}
          onDragOver={(e) => e.preventDefault()}
          className=""
        ></div> */}
        <div className="w-full flex ">
          <div className="w-[30%] py-2  p-1 flex justify-center items-center  ">
            <label
              htmlFor="file"
              onDrop={(e) => HandleDrop(e)}
              onDragOver={(e) => e.preventDefault()}
              className={`object-cover border-dashed  ${
                url === null && "border-2 border-gray-500"
              } mb-2 w-full h-full p-2  flex justify-center items-center rounded-2xl shadow-lg shadow-gray-100`}
            >
              <img
                className={`object-contain ${
                  url != null && "w-52 h-52"
                }  rounded-2xl `}
                src={url == null ? def : url}
                alt="..."
              />
            </label>
          </div>
          <div className="flex p-4 w-[70%] justify-between flex-wrap ">
            <div className="flex relative gap-2 w-full  items-center  ">
              <input
                className="px-3 w-full  py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 "
                type="text"
                name="productName"
                placeholder="Le nom du peouduit"
                onChange={(e) => handleChange(e)}
                value={product.productName}
              />
              <input
                className="px-3 w-full py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600  "
                type="number"
                name="price"
                placeholder="Prix de prouduit"
                onChange={(e) => handleChange(e)}
                value={product.price}
              />
            </div>

            <div className="flex relative  w-full  items-center  ">
              <textarea
                className="px-3 min-h-28 py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 w-full "
                type="text"
                name="description"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
                value={product.description}
              />
              <p className="absolute bottom-4  right-4 ">
                {" "}
                <span> {compterMots(product.description)} </span> /10{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full   ">
          {currentRes.SupplementId.length != 0 && (
            <div className="w-full flex items-center gap-3 ">
              <select
                className="px-4  w-full   py-3 outline-none mb-2 rounded-xl  "
                type="text"
                name="productName"
                onChange={(e) => setselectedSup(e.target.value)}
                placeholder="Selectioner un suplement"
              >
                {currentRes.SupplementId.map((info, index) => {
                  return (
                    <option
                      className="bg-white outline-none w-full flex justify-between "
                      key={index}
                      value={index}
                    >
                      {" "}
                      {info.supplementName} - {info.price}DA{" "}
                    </option>
                  );
                })}
              </select>

              <button
                onClick={() => addSup()}
                className="py-[13px] px-4 bg-main mb-2 text-white rounded-md  "
              >
                {" "}
                Ajouter{" "}
              </button>
            </div>
          )}
          <div className="w-full flex flex-col gap-4 py-4 overflow-y-auto max-h-36 ">
            {supArr.map((data, index) => {
              return (
                <div className="flex justify-between px-4" key={index}>
                  <p className=" w-[40%] "> {data.supplementName} </p>
                  <p className=" w-[45%] "> {data.price} </p>
                  <button className="rounded-2xl py-2 bg-main text-xl p-2 h-8 w-8 flex justify-center items-center text-white ">
                    {" "}
                    <Trash />{" "}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <input
          onChange={(e) => {
            HandleFileChange(e);
            handleChange(e);
          }}
          id="file"
          type="file"
          className="hidden"
          name="image"
        />

        <div className="flex  w-full   items-center justify-between">
          <button
            type="submit"
            onClick={() => addProductMutation.mutate()}
            disabled={addProductMutation.isPending}
            className={`py-[12px] ${
              addProductMutation.isPending
                ? "bg-gray-400 text-white"
                : "bg-main text-white"
            } w-full rounded-2xl cursor-pointer h-fit  px-8`}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
