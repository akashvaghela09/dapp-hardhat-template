
import React from 'react';
import './App.css';
import { AllRoutes } from './Routes/AllRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from "./Component/Spinner";
import { Error } from './Component/Error';
import { Alert } from './Component/Alert';

function App() {
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isAlert
} = useSelector(state => state.app)

  return (
    <div className="App">
      
      <AllRoutes />
      
      {
        isLoading === true && <Spinner />
      }
      {
        isError === true && <Error />
      }
      {
        isAlert.status === true && <Alert />
      }
    </div>
  );
}

export default App;
