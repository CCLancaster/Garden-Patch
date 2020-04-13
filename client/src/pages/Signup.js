import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

function Signup(props) {
    // Declare and initialize state variables
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [message, setMessage] = useState('')
        
    useEffect(() => {
        setMessage("")
    }, [firstname, lastname, email, password] )

    const handleSubmit = e => {
        e.preventDefault()
        // Send the user sign up data to the server
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({
            first_name: firstname,
            last_name: lastname,
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
        if (!response.ok) {
            console.log(response);
            setMessage(`${response.status}: ${response.statusText}`);
            return;
        }

        // if user signed up successfully
        response.json().then(result => {
            props.updateUser(result.token);
        })

        })     
    }

    if (props.user) {
        return <Redirect to="/profile" />
    }

    return (
        <div className="signup">
            <img src="/Users/monty/SEI29/unit4/p4/garden-patch/client/public/markus-spiske-vrbZVyX2k4I-unsplash.jpg" className="sprouts" alt="sprouts" />
            <div className="signUpForm">
                <h2>Lets Get Growing</h2>
                <h3>Signup below:</h3>
                <form method="POST" onSubmit={handleSubmit}>
                    
                    <input type="text" name="firstname" placeholder="First Name" onChange={e => setFirstname(e.target.value)} />
                    <input type="text" name="lastname" placeholder="Last Name" onChange={e => setLastname(e.target.value)} />
                    <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                
                    <button type="submit">Submit</button>
                </form>
                Already have an account?
                <a href='/auth/login' className="red">Log In Here</a>
            </div>
        </div>
    )
}

export default Signup