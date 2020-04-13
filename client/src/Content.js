import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';


const Content = props => {
  return (
    <div className="container">
      <Route exact path="/" render={
        () => <Home user={props.user} updateUser={props.updateUser} token={props.token} />
      } />
      <Route path="/auth/login" render={
        () => <Login user={props.user} updateUser={props.updateUser} token={props.token} />
      } />
      <Route path="/auth/signup" render={
        () => <Signup user={props.user} updateUser={props.updateUser} token={props.token} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} updateUser={props.updateUser} token={props.token} />
      } />
   </div>
  )
}

export default Content;