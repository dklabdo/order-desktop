import React, { useContext, useEffect, useState  } from "react";
import img from "../assets/image.png";
import logo from "../assets/logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import { auth } from "../firebase";
import { AppContext } from "../AppProvider";
function Auth() {
  
  const navigate = useNavigate()
  const {user , setUser} = useContext(AppContext)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user when they are authenticated
      if(currentUser){
        navigate('/resturant')
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      // Firebase signIn with email and password
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      console.log("User logged in successfully!");
      navigate('/admin')
      // Redirect or do something else after successful login
    } catch (err) {
      setError(err.message); // Set error message if login fails
      console.log("Login error: ", err.message);
    }
  }

  if (user) {
    return (
      <></>
    );
  } else {
    return (
      <div className="w-full  flex h-screen  ">
        <div className="w-[50%] items-center justify-center flex flex-col h-screen ">
          <div className="py-12">
            <img src={logo} />
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex scale-90 w-[80%] flex-col gap-2"
          >
            <label className="pr-1">E-mail</label>
            <input className="input" required type="email" placeholder="example@gmail.com" />
            <label className="pr-1"> Password </label>
            <input
              required
              className="input"
              type="password"
              placeholder="entrer votre mot de pass"
            />
            <button
              type="submit"
              className="bg-main text-white py-3 rounded-xl mt-6"
            >
              {" "}
              Connecter{" "}
            </button>
          </form>
        </div>
        <div className="w-[50%] flex flex-col items-center rounded-tl-4xl rounded-bl-4xl bg h-screen ">
          <div className="w-full items-center px-6 py-20 gap-4 flex flex-col ">
            <h1 className="text-4xl text-white font-black">Bienvenue</h1>
            <p className="text-center  text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              eos dolore qui a, voluptates esse.
            </p>
          </div>
          <div className=" pt-16 ">
            <img className="  " src={img} />
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
