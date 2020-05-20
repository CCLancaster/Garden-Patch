//TD: create a button to add this zone to the db
import React, { useState, useEffect } from 'react'


function Zone(props) {
    //Declare and Initialize state variables
    let [zipcode, setZipcode] = useState('')
    let [zone, setZone] = useState({})
    let [showZone, setShowZone] = useState(false)
    let [message, setMessage] = useState('')
    
    useEffect(() => {
        setMessage("")
    }, [zipcode, zone])

    //event to handle the zipcode submit and trigger the API call
    const handleZipSubmit = e => {
        e.preventDefault()

        //send zip code to the server
        fetch(`${process.env.REACT_APP_SERVER_URL}/zone`, {
            method: 'POST',
            body: JSON.stringify({
                zip_code: zipcode
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            if (!response.ok) {
                console.log(response);
                setMessage(`${response.status}: ${response.statusText}`);
                return;
            } else {
                response.json().then(result => {
                    console.log(result)
                    setZone(result)
                })
            setShowZone(true)
            }
        })
    }


    return (
        <div className="zone">
            <h3>Find your zone</h3>
            <div className="zoneimg">
                <img src="/Users/monty/SEI29/unit4/p4/garden-patch/client/public/usda_plant_hardiness_zones_map-smaller.png" className="usdaImage" alt="usda_plant_hardiness_zones"/>
            </div>
            <p>USDA Hardiness Zones help gardeners and farmers alike identify which plants will thrive and survive in their specific geographic location based on average winter temperatures</p>
            <h5>Enter your zip code below</h5>
            <form method="POST" className="searchform" onSubmit={handleZipSubmit}>
                <input type="text" name="search" id="search" onChange={e => setZipcode(e.target.value)} placeholder="Zipcode" />
                <button type="submit">Search</button>
            </form>
            <div className={`zone ${showZone ? '' : 'hidden'}`}>
                <h5>Your hardiness zone is {zone.zone}</h5>
                <p>This means your average winter temperatures range from {zone.temperature_range}</p>
            </div>

        </div>


    )


}

export default Zone;