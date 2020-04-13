import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

function Search(props) {
    // declare and initialize state variables
    let [plantname, setPlantname] = useState('')
    let [plantinfo, setPlantinfo] = useState([])
    let [favplant, setFavplant] = useState([])
    let [message, setMessage] = useState('')

    useEffect(() => {
        setMessage("")
    }, [plantname])

    // event for submiting plant name for API call
    const handleSearchSubmit = e => {
        e.preventDefault()

        // send search criteria to back-end
        fetch(`${process.env.REACT_APP_SERVER_URL}/search`, {
            method = 'POST',
            body: JSON.stringify({
                name: plantname
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            console.log(`${response}`)
            return response.json()
        }).then((data) => {
            console.log(data)
            // map through data to find pieces to show

            setPlantinfo(data.map(plants => {
                return {
                    name: plants.common_name,
                    sname: plants.scientific_name,
                    id: plants.id
                }
            }))
            setShowForms(true)
        }).catch(err => {
            console.log(err)
        });
    }

    // select plants, make secondary api call and push them into the plants table
    const handlePlantSubmit = (e, id) => {
        e.preventDefault()
        setFavplant([...faveplant, id])

        //send plant id to back end for secondary api call and adding to plants table
        fetch(`${process.env.REACT_APP_SERVER_URL}/search/plants`, {
            method = 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            if(!response.ok) {
                console.log(response);
                return;
            }
        })
    }

    console.log(plantinfo);
    let plantList = plantinfo.length < 1 ?
        <h5>Hmmm. There are no plants by that name, try a different one!</h5> :
        plantinfo.map((plant, i) => (
            <div key={`plantListItem-${i}`}>
                <div className="apideetcontainer">
                    <h2>{plant.name}</h2>
                    <h5>{plant.sname}</h5>
                    <p class="hidden">{plant.id}</p>
                    <button disabled={favplant.find(chosenPlant=>chosenPlant.id === plantinfo.id) ? true : false} type="submit" onClick={(e) => {handlePlantSubmit(e, plant.id);}}>Add To Your Plants List</button>
                </div>
                <hr/>
            </div>


        ))
    
    return (
        <div className="search">
            <div className="add">
                <form method="Post" onSubmit={handleSearchSubmit}>
                    <input type="text" name="search" id="search" onChange={e => setPlantname(e.target.value)} placeholder="Enter a Plant Name Here" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className={`choose ${showForms ? '' : 'hidden'}`}>
                <div  className="apibox">
                    {plantList}
                </div>
            </div>
        </div>
    )



}