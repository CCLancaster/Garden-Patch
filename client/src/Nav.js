// TD: remove Profile link from nav bar and make the logo act as profile (which will redirect to home if no user token found)
import React from 'react'
import { Link, Redirect } from 'react-router-dom'

const Nav = props => {
  const handleLogout = e => {
    e.preventDefault()
    // Remove the token from localstorage (or cookies)
    localStorage.removeItem('token')
    // Update the state of the App
    props.updateUser();
  }

  let links = (
    <span>
      <li>
        {/* <Link to="/auth/login">Login</Link> */}
      </li>
      <li>
        {/* <Link to="/auth/signup">Signup</Link> */}
      </li>
    </span>
  )
  
  if(props.user) {
    links = (
      <span>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/zone">Zone</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/plants">Plants</Link>
        </li>
        <li>
          <Link to="/garden">Garden</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>Log Out</Link>
        </li>
      </span>
    )
  }

  return (
    <div className="navbar">
        {/* <div className="logobox">
            <a href="/"><img src="" className="logo" alt='logo'/></a>
        </div> */}
        <div className="links">
            <ul>
            {links}
            </ul>
        </div>
    </div>
  )
}

export default Nav