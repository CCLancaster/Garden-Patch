import Signup from './Signup';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'; 
// eslint-disable-next-line

export default function Home(props) {
  const [greeting, setGreeting] = useState('')
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/protected`, {
      headers: {
        "Authorization": `Bearer ${props.user.token}`
      }
    }).then(response => {
      console.log(response.data)
      setGreeting(response.data.data)
    }), [props.user]})
  
  if (props.user) return <Redirect to='/profile' />

  return (
    <div className="macDaddyContainer">
      <h2>Home</h2>
      <h3>{greeting}</h3>
      <Signup user={props.user} updateUser={props.updateUser}/>
    </div>
  )
}