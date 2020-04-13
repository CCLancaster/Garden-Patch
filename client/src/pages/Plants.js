import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function Plants(props) {
    let [plantList, setPlantlist] = useState([])

    const handlePlantDelete = (e, id) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_SERVER_URL}//plants/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            if (!response.ok) {
                console.log(response);
                return;
            }
        })
    }

    let favPlantList = props.plants.length < 1 ?
        <h3>You have no favorite plants yet! Go to the <Link to="/search">Search</Link>page to add some.</h3> :
        props.plants.map((plant, i) => {
            return(
                <div className="itemlist" key={`plantListItem-${i}`}>
                    <div className="apideetcontainer">
                        <div classname="boxes">
                            <img src={plant.img} className="apiimg" />
                        </div>
                        <div className="boxes">
                            <p className="hidden">{plant.id}</p>
                            <h4>{plant.name}</h4>
                            <h5><i>{plant.s_name}</i></h5>
                            <h5>type: {plant.p_type}</h5>
                            <h5>style: {plant.style}</h5>
                            <h5>minimum water (in inches): {plant.water_min}</h5>
                            <h5>shade tolerance: {plant.shade_tol}</h5>
                            <h5>drought tolerance: {plant.drought_tol}</h5>
                            <h5>max that can be planted in square mile: {plant.density_max}</h5>
                            <button type="submit" onClick={(e) => {handlePlantDelete(e, plant.id);}}>Remove</button>
                        </div>
                    </div>
                </div>
            )
        })


    return (
        <div className="plants">
            <div>
                <h1 className="headtitle">Your Plants List</h1>
            </div>
            <div>
                {favPlantList}
            </div>
            <div>
                <h5>Want more?</h5>
                <button><Link to="/search">Search</Link></button>
            </div>
        </div>
    )
}

export default Plants;