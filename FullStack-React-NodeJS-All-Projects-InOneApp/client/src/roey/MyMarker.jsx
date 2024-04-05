import React from 'react'
import { Marker, Popup, Tooltip , useMap } from 'react-leaflet'

const MyMarker = ({ position, location }) => {
    const map = useMap();
    map.flyTo(position)
    return (
        <Marker position={position}>
            <Popup className='max-w-24'>
                לקריאה נוספת
                <br />
                <a
                    target='blank'
                    href={`https://he.wikipedia.org/wiki/${location}`}
                >לחץ כאן</a>
            </Popup>
            <Tooltip> {location} </Tooltip>
        </Marker>
    )
}

export default MyMarker