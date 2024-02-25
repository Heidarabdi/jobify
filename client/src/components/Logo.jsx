import React from 'react'
import logo from '../assets/images/logo.svg'
import {Link} from "react-router-dom";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";

function Logo() {
  return (
      <Link to={'/dashboard'}>
        <img src={logo} alt="Jobify" className='logo'/>
      </Link>
  )
}

        export default Logo
