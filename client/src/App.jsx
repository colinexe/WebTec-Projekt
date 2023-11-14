import { useState } from "react";
import { useEffect } from "react";
import React from 'react'
import { Route, Routes } from "react-router-dom";
import GerichtList from "./components/gerichtList.jsx";
import GerichtForm from "./components/gerichtForm.jsx";
import Navigation from "./components/Navigation.jsx";
import './index.css'



const App = () => {

  return (
    <div>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<GerichtList />} />
        <Route path="/form" element={<GerichtForm />} />
      </Routes>
    </div>
  );

};

export default App;
