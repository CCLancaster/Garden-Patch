import React, { useEffect, useState } from 'react';
import Signup from './Signup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


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
    <div className="bigDaddyContainer">
      <h2>Home</h2>
      <h3>{greeting}</h3>
      <Signup user={props.user} updateUser={props.updateUser}/>
    </div>
  )
}

// const Home = props => {
//   if (props.user) return <Redirect to='/profile' />

//   return (
//     <div className="bigDaddyContainer">
//       <h2>Home</h2>
//       <Signup user={props.user} updateUser={props.updateUser}/>
//     </div>
//   )
// }

export default Home;