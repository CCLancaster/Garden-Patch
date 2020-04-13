import React, {useState, useEffect} from 'react';
// import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav';
import Content from './Content';

function App() {
  // Declare state variables
  let [user, setUser] = useState(null)
  let [token, setToken] = useState(null)

const setUserToken = (responseData) => {
  setUser({user: responseData.user, token: responseData.token})
}

const updateUser = newUserDeets => {
  setUser({...user, user: newUserDeets})
}


  return (
    <Router>
      <div className="app">
        <Nav updateUser={updateUser} user={user} token={token} />
        <main>
          <Content setUserToken={setUserToken} user={user} token={token} updateUser={updateUser} />
        </main>
      </div>
    </Router>  
  )
}

export default App;
