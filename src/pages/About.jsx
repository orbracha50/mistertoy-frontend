
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Button } from "@mui/material";

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;

export function About() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function onHandleClick({ lat, lng }) {
        console.log(lat,lng)
        setCoords({ lat, lng })
    }

    return (<section>
        <Button onClick={() => onHandleClick({ lat: 32.0853, lng: 34.7818 })} variant="contained">Tel Aviv</Button>
        <Button onClick={() => onHandleClick({ lat: 32.7940, lng: 34.9896 })} variant="contained">Haifa</Button>
        <Button onClick={() => onHandleClick({ lat: 32.0340, lng: 34.8859 })} variant="contained">Yehud</Button>
        <div style={{ height: '50vh', width: '50vw' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCYoCUmd9GzcKDM8mMDSn8zr3329o_bEK4" }}
                center={coords}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    // lat={coords.lat}
                    // lng={coords.lng}
                    {...coords}
                    text="🚩"
                />
            </GoogleMapReact>
        </div>
    </section>
    );
}

// Important! Always set the container height explicitly

