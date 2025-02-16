import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentPopUp, setcurrentPopUp] = useState(null);

  const [product, setproduct] = useState({
    productName: "",
    description: "",
    price : null,
  });


  


  const [resturent, setresturant] = useState({
    name: "",
    location: "",
    email: "",
    phoneNumber: "",
    password : "",
  });

  function hadnleChangeProduct(e){
    setproduct({...product, [e.target.name]: e.target.value})
  }

  function hadnleChangeResturant(e){
    setresturant({...resturent, [e.target.name]: e.target.value})
  }

  function handleOpenPopUp(type) {
    setcurrentPopUp(type);
  }
  function handleClosePopUp() {
    setcurrentPopUp(null);
  }

  function togleShowPassword(ref) {
    ref.current.type = ref.current.type === "password" ? "text" : "password";
  }


  const [currentRes , setcurrentRes] = useState(null);



  return (
    <AppContext.Provider
      value={{
        togleShowPassword,
        handleOpenPopUp,
        handleClosePopUp,
        user,
        setUser,
        currentPopUp,
        setcurrentPopUp,
        resturent,
        setresturant,
        product,
        setproduct,
        hadnleChangeProduct,
        hadnleChangeResturant,
        currentRes, 
        setcurrentRes
        
        
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
