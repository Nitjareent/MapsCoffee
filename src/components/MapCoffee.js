import React, { useState} from "react"
import { GoogleMap, withGoogleMap, Marker, InfoWindow } from "react-google-maps"
import withScriptjs from "react-google-maps/lib/withScriptjs";
import * as parksData from "../data/skateboard-parks.json"

export default function MapCoffee () {
    const [selectedPark, setSelectedPark] = useState(null)

    return (
        <GoogleMap 
            defaultZoom={12} 
            defaultCenter={{ lat:45.421532, lng:-75.697189 }}> 
    
            {parksData.features.map(park => (
                <Marker 
                key={park.properties.PARK_ID} 
                position={{
                    lat: park.geometry.coordinates[1],
                    lng: park.geometry.coordinates[0]
                }}
                onClick={() => {
                    setSelectedPark(park);
                }}
                //select icon here if you wate another icon
                // icon={{
                //     url: '/'
                //     scaledSize: new window.google.maps.Size(25, 25)
                // }}
                />
            ))}


        {selectedPark && (
            <InfoWindow 
                position={{
                    lat: selectedPark.geometry.coordinates[1],
                    lng: selectedPark.geometry.coordinates[0]
                }}
                onCloseClick={() => {
                    setSelectedPark(null);
                }}
            >
                <div>
                    <h2>{selectedPark.properties.NAME}</h2>
                    <p>{selectedPark.properties.DESCRIPTIO}</p>
                </div>
            </InfoWindow>
        )}        
        </GoogleMap>
    );
}

export const WrappedMap = withScriptjs(withGoogleMap(MapCoffee));



