import React, { useEffect } from "react";
// import { BrowserRouter as Router, Link, Route, NavLink, Redirect } from "react-router-dom"


function Profile(props) {

     useEffect(() => {
         console.log(props.user)
    }, [])
     

    return (
        <div className="profile">
            <h1>You have a profile</h1>
        </div>
    )
}

export default Profile;