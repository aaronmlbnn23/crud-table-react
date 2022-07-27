import { Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { userStore } from "./stores/UserStore";
import { LandingPage, Dashboard, Login, Register, Home, Profile, Accounts, NotFound, Layout, Applications, ReviewApplications, Properties } from './pages';
import { TP_dashboard, TP_layout, TP_property, TP_signup, TP_application } from './tax-payer-side/taxpayer-pages'
import { useState, useEffect } from 'react'
import { accessToken, userData } from "./Utilities/Utilities";


const Views = () => {
  const getUserData = userStore((state) => state.getUser)
  const user = userStore((state) => state.user)
  const setToken = userStore((state) => state.setToken)
  const navigate = useNavigate()
  const currentLocation = useLocation();

  
  useEffect(() => {
    getUserData()

    navigate(currentLocation.pathname)
  }, [])

  
  return (

    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/sign-up' element={<TP_signup />} />




      {user && user.role == 'admin' || user.role == 'user' ?
        <Route element={<ProtectedRoutes />}>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/application/:id' element={<ReviewApplications />} />
            <Route path='/applications' element={<Applications />} />
            <Route path='/properties' element={<Properties />} />
          </Route>
        </Route> :
        <Route element={<ProtectedRoutes />}>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<TP_layout />}>
            <Route path="/property" element={<TP_property />} />
            <Route path="/apply-property" element={<TP_application />} />
            <Route path="/dashboard" element={<TP_dashboard />} />
          </Route>
        </Route>
      }






    </Routes>
  );
};

export default Views;
