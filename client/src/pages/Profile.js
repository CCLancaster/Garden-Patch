import React, { useEffect } from "react";
import { BrowserRouter as Route, Redirect } from "react-router-dom"
import Zone from './Zone';
import Search from './Search';
import Plants from './Plants';
import Garden from './Garden';

function Profile(props) {

    
     

    return (
        <div className="profile">
            <h1>Welcome!</h1>
            <div class="profileSquares">
                <img src="/Users/monty/SEI29/unit4/p4/garden-patch/client/public/usda_plant_hardiness_zones_map-smaller.png" className="square" alt="usda plant hardiness zone map" />
                <Route path="/zone" render={() => <Zone user={props.user} updateUser={props.updateUser} token={props.token} /> } />
            </div>
            <div class="profileSquares">
            <img src="/Users/monty/SEI29/unit4/p4/garden-patch/client/public/agence-producteurs-locaux-damien-kuhn-fd05H8aHoXY-unsplash.jpg" className="square" alt="little cacti in the corner" />
                <Route path="/search" render={() => <Search user={props.user} updateUser={props.updateUser} token={props.token} /> } />
            </div>
            <div class="profileSquares">
            <img src="/Users/monty/SEI29/unit4/p4/garden-patch/client/public/daniel-oberg-sEApBUS4fIk-unsplash.jpg" className="square" alt="three plants on a tray" />
                <Route path="/plants" render={() => <Plants user={props.user} updateUser={props.updateUser} token={props.token} /> } />
            </div>
            <div class="profileSquares">
            <div>
            <img src="/Users/monty/SEI29/unit4/p4/garden-patch/client/public/www-zanda-photography-RBdE3jv5y68-unsplash.jpg" className="square" alt="tomato hothouse" />
                <Route path="/garden" render={() => <Garden user={props.user} updateUser={props.updateUser} token={props.token} /> } />
            </div>
            </div>
        </div>
    )
}

export default Profile;