import React from "react";
import { useState, useEffect} from 'react'

import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios';



function CountryDetails (props) {
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

    // this is how to retrieve a route parameter using react router
	const params = useParams()
	const id = params.id

    const country = countries.find(country => country.alpha3Code === id)

    // function to take the alpha3code of a country and fetch its common name
    const borderName = (input) => {
        const borderCountry = countries.find(country => country.alpha3Code === input)
        return borderCountry.name.common
    }

    return (
        <div className="col-7">
        {/* Die ganze Function CountryDetails läuft einmal komplett durch, befor die API gegettet wird. Daher müssen wir beim ersten Durchlauf
fragen, ob "country" bekannt ist. Falls nicht mache <h1>Loading</h1>, sonst mach alles wie es sien soll. */}
            {country? 
                <div> 
                    <h1>{country.name.common}</h1>
                    <table className="table">
                    <thead></thead>
                    <tbody>
                        <tr>
                        <td style={{width: "30%"}}>Capital</td>
                        <td>{country.capital[0]}</td>
                        </tr>
                        <tr>
                        <td>Area</td>
                        <td>
                            {country.area} km
                            <sup>2</sup>
                        </td>
                        </tr>
                        <tr>
                        <td>Borders</td>
                        <td>
                            <ul>
                                {country.borders.map(border => {
                                    return (
                                        <li>
                                            <Link to={`/${border}`}>
                                                {borderName(border)}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </td>
                        </tr>
                    </tbody>
                    </table> 
                </div>:<h1>loading</h1>}
          </div>
    )
}

export default CountryDetails