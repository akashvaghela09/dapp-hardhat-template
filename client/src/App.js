
import React, { useEffect } from 'react';
import './App.css';
import { ethers } from "ethers";
import { abi } from './helper';
import { AllRoutes } from './Routes/AllRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './Component/Header';


function App() {
  const dispatch = useDispatch();


  return (
    <div className="App">
      {/* <Header /> */}
      <AllRoutes />
    </div>
  );
}

export default App;
