import React from "react";

function Loader() {
  return (
    <div className="w-full py-28 h-full flex-col gap-10 flex justify-center items-center">
      <div className="loader"></div>
      <p className="text-main"  > Loading... </p>
    </div>
  );
}

export default Loader;
