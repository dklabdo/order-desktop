import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Auth from "./page/Auth";
import Command from "./page/Command";
import Products from "./page/Products";
import Admin from "./page/Resturants";
import AppProvider from "./AppProvider";
import PopUp from "./page/PopUp";
import Resturants from "./page/Resturants";
import University from "./page/University";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/command/:id" element={<Command />} />
            <Route path="/products" element={<Products />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/resturant" element={<Resturants />} />
            <Route path="/university" element={<University />} />
            <Route path="/livreur" element={<University />} />
          </Routes>
          <PopUp />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
