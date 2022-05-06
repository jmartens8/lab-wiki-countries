import React from "react";
import { Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import axios from 'axios';



function CountriesList(props) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("https://ih-countries-api.herokuapp.com/countries")
        .then(response => {
            console.log('axios response:',response);
            setCountries(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])


    return(
    <div className="col-5" style={{ maxHeight: "90vh", overflow: "scroll"}}>
        <div className="list-group">
            {countries.map(country => {
                return (                    
                    <Link className="list-group-item list-group-item-action" to={`/${country.alpha3Code}`}>
                        {<img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt="Flag"/>} {country.name.common}
                    </Link>
                )
            })}
        </div>
    </div>
    )
}

export default CountriesList