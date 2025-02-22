import logo from './logo.svg';
import './App.css';
import './assets/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './view/auth/Login';
import Register from './view/auth/Register';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
function App() {
  const { token } = useContext(AuthContext)
  return (
    <div className="App">
      <Routes>
        {
          token ?
            privateRoutes.map((route) => (
              <Route path={route.path} element={route.element} />
            ))
            :
            publicRoutes.map((route) => (
              <Route path={route.path} element={route.element} />

            ))

        }

      </Routes>
    </div>

  );
}

export default App;



