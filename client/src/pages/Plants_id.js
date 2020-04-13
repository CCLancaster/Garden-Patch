import React from 'react'
import { Link } from 'react-router-dom'

function Plant_id(props) {

    return (
        <div>
            <h3>Welcome to a specific plant page</h3>
            <h5>(feature coming soon...)</h5>
            <h5>In the meantime, why not search for plants you'd like to grow <Link to="/search">here</Link>?</h5>
            <h5>Not sure what USDA Growing Zone you live in? Find out <Link to="/zone">here</Link>!</h5>
        </div>
    )
}

export default Plant_id;