import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound404'
import { useEffect, useState, useContext } from "react";
import AuthContext from "./contexts/AuthProvider";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Navbar from './components/navbar'
import Profile from "./pages/Profile";
import Layout from './pages/Layout'
import Accounts from "./pages/Accounts";

const Views = () => {

  return (

    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path="/" element={<LandingPage />} />
      <Route path='/login' element={<Login /> } />
      <Route path='/register' element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Layout/>}>
         <Route path="home" element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='accounts' element={<Accounts />} />
      </Route>  
      </Route>
    </Routes>
  );
};

export default Views;
