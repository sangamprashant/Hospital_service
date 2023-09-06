import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
import Search from "./Components/Search";
function App() {
  const [isSearch,setIsSearch] = useState(false);
  return (
    <BrowserRouter>
      <Navbar isSearch={isSearch} setIsSearch={setIsSearch}/>
      <Routes>
        <Route path="/" element={<Home isSearch={isSearch} setIsSearch={setIsSearch}/>} />
        <Route path="/search/hospital" element={<Search isSearch={isSearch} setIsSearch={setIsSearch}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
