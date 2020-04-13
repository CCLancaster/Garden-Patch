import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

function Login(props) {
    // Declare and initialize state variables
    let [email, setEmail] = useState('')
    let [message, setMessage] = useState('')
    let [password, setPassword] = useState('')
        
    useEffect(() => {
        setMessage("")
    }, [email, password] )

    const handleSubmit = e => {
        e.preventDefault()
        // Send the user sign up data to the server
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
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

        // if user logged in successfully
        response.json().then(result => {
            props.updateUser(result.token);
        })

        })     
    }

    if (props.user) {
        return <Redirect to="/profile" />
    }

    return (
        <div className="logimg">
            <img src="#" className=""/>
            <div className="login">
                <div className="logform">
                    <div>
                        <h2>Login</h2>
                        <form method="POST" onSubmit={handleSubmit}>
                            <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                            <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            <button type="submit">Submit</button>
                        </form>
                        <p>New user?
                        <a href='/' className="red">Sign up here</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;