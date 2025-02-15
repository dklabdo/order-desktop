import { useEffect, useState } from "react";
const useImage = (file) => {
  const [url, seturl] = useState("");
  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        seturl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      seturl("ereur");
    }
  }, [file]);
  return url;
};

export default useImage;
