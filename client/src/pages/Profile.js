import React, { useEffect } from "react";
// import { BrowserRouter as Router, Link, Route, NavLink, Redirect } from "react-router-dom"


function Profile(props) {

     useEffect(() => {
         console.log(props.user)
    }, [])
     

    return (
        <div className="profile">
            <h1>You have a profile</h1>
            <div class="profileSquares">
                <Route path="/zone" render={() => <Zone user={props.user} updateUser={props.updateUser} token={props.token} /> } />
            </div>
            <div class="profileSquares">
                <Route path="/search" render={() => <Search user={props.user} updateUser={props.updateUser} token={props.token} /> } />
            </div>
            <div class="profileSquares">
                <Route path="/plants" render={() => <Plants user={props.user} updateUser={props.updateUser} token={props.token} /> } />
            </div>
            <div class="profileSquares">
            <div>
                <Route path="/garden" render={() => <Garden user={props.user} updateUser={props.updateUser} token={props.token} /> } />
            </div>
            </div>
        </div>
    )
}

export default Profile;