import React from 'react';

import Button from '../UI/Button/Button';
import classes from './LocationDescr.module.css'

const LocationDescr = (props) => {
    const weather = props.weatherForecast.map(day => {
        return (
            <p key={day.date}>Date:<span>{day.date}</span>Temperature: <span>{day.day.avgtemp_c} C</span></p>
        )
    })
    return (
        <>
            <div className={classes.Address}>
                 <p>Addresss</p> 
                 <p>{props.address}</p>
            </div> 
            {weather}
            <Button clicked={props.modalClosed}>Go back to the Map</Button>
        </>
    )
}

export default LocationDescr;