import { X } from "lucide-react";
import def from "../assets/defImg.svg";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppProvider";

function AddProduct() {
  const { handleClosePopUp, product, hadnleChangeProduct } =
    useContext(AppContext);
  const [file, setfile] = useState(null);
  const [url, seturl] = useState(null);

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

  return (
    <div className="w-[70%] flex flex-col items-center justify-center relative bg-white rounded-2xl h-fit py-6 ">
      <div className="w-full pb-6 pt-3 flex justify-between items-center px-10 ">
        <h2 className="text-2xl text-main ">Ajouter un prouduit </h2>
        <X
          size={34}
          onClick={() => handleClosePopUp()}
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
          <div className="w-[30%] p-1 flex justify-center items-center  ">
            <label
              htmlFor="file"
              onDrop={(e) => HandleDrop(e)}
              onDragOver={(e) => e.preventDefault()}
              className={`object-cover border-dashed  ${
                url === null && "border-2 border-gray-500"
              } mb-2    w-full  h-[88%] flex justify-center items-center rounded-2xl shadow-lg shadow-gray-100`}
            >
              <img
                className=" rounded-2xl "
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
                className="px-3 min-h-44 py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 w-full "
                type="text"
                name="description"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
                value={product.description}
              />
              <p className="absolute bottom-6  right-4 ">
                {" "}
                <span> {compterMots(product.description)} </span> /10{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full   ">
          <div className="w-full flex items-center gap-3 ">
            <input
              className="px-3 w-full  py-3 outline-none mb-2 rounded-xl border-[1px] border-gray-600 "
              type="text"
              name="productName"
              placeholder="Selectioner un suplement"
              
            />
            
            <button className="py-3 px-4 bg-main mb-2 text-white rounded-2xl  " > Ajouter </button>
          </div>
          <div className="w-full h-28 " >

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

        <div className="flex  w-full  py-6 items-center justify-between">
          <button
            type="submit"
            className="py-[12px] w-full rounded-2xl cursor-pointer h-fit bg-main text-white px-8 "
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
