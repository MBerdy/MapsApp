import React, { Component } from 'react';
import Geocode from 'react-geocode';
import axios from 'axios';
import { LoadScript } from '@react-google-maps/api';

import Map from '../components/Map/Map';
import Modal from '../components/UI/Modal/Modal';
import LocationDescr from '../components/LocationDescr/LocationDescr';
import * as key from '../key';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: {},
            address: '',
            weatherForecast: null,
            showDescr: false,
            error: false
        }
    }

    componentDidMount() {
        console.log('Home')
        let currentPosition;
        navigator.geolocation.getCurrentPosition((position) => {
            currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            this.setState({ currentPosition: currentPosition })
        });
    }

    onCoordinatesSelected = (e) => {
        const currentCoordinates = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        }
        Promise.all([this.convertFromLatLng(currentCoordinates), this.fetchWeatherForecast(currentCoordinates)])
            .then(r => {
                this.setState({
                    showDescr: true
                })
            })

    }

    fetchWeatherForecast = (coordinates) => {
        const lat = coordinates.lat;
        const lng = coordinates.lng;
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key.WEATHER_API_KEY}&q=${lat},${lng}&days=3`)
            .then(response => {
                this.setState({ weatherForecast: response.data.forecast.forecastday })
            })
            .catch(e => this.setState({ error: true }))
    }

    convertFromLatLng = (coordinates) => {
        Geocode.setApiKey(key.GOOGLE_MAPS_API_KEY);
        Geocode.fromLatLng(coordinates.lat, coordinates.lng)
            .then(response => {
                const address = response.results[0].formatted_address;
                this.setState({ address: address })
            })
            .catch(e => this.setState({ error: true }))
    }

    onClosedModalHandler = () => {
        this.setState({ showDescr: false })
    }


    render() {
        let locationDescr;
        if (this.state.weatherForecast && this.state.address) {
            locationDescr = (
                <LocationDescr
                    weatherForecast={this.state.weatherForecast}
                    address={this.state.address}
                    modalClosed={this.onClosedModalHandler} />
            )
        }
        return (
            <LoadScript
                googleMapsApiKey = {key.GOOGLE_MAPS_API_KEY}>
                <Modal
                    show={this.state.showDescr}
                    modalClosed={this.onClosedModalHandler} >
                    {locationDescr}
                </Modal>
                <Map
                    currentPosition={this.state.currentPosition}
                    coordinatesSelected={this.onCoordinatesSelected} />
            </LoadScript>

        );
    }
}

export default Home