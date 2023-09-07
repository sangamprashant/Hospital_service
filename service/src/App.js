import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
import Search from "./Components/Search";
import AdminLogin from "./Components/Admin/AdminLogin";
import NotFound from "./Components/NotFound";
function App() {
  const [isSearch,setIsSearch] = useState(false);
  return (
    <BrowserRouter>
      <Navbar isSearch={isSearch} setIsSearch={setIsSearch}/>
      <Routes>
      {/* client */}
        <Route path="/" element={<Home isSearch={isSearch} setIsSearch={setIsSearch}/>} />
        <Route path="/search/hospital" element={<Search isSearch={isSearch} setIsSearch={setIsSearch}/>} />
        {/* admin */}
        <Route path="/login" element={<AdminLogin isSearch={isSearch} setIsSearch={setIsSearch}/>} />

        <Route path="*" element={<NotFound isSearch={isSearch} setIsSearch={setIsSearch}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
