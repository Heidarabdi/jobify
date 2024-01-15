import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import Main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            accusantium, officia voluptatibus, quibusdam, voluptatum
            exercitationem quia voluptate doloribus tempora voluptates
            consequatur. Quisquam, quod. Quisquam, quod.
          </p>
          <Link to="/register" className="btn register-link"> Register </Link>
          <Link to="/login" className="btn "> Login / Demo User </Link>
        </div>
        <img src={Main} alt="main" className="img main-img" />

      </div>
    </Wrapper>
    
  )
}

export default Landing
