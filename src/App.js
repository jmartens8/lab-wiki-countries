import React from "react";
import "./App.css";
import { Routes, Route } from 'react-router-dom';
// import countries from './countries.json';

import Navbar from "./components/Navbar";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";

function App() {
  return (
  <>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <CountriesList/>
          <Routes>
            <Route path="/:id" element={ <CountryDetails/> } />
          </Routes>
        </div>
      </div>
  </>
  )
}
export default App;
