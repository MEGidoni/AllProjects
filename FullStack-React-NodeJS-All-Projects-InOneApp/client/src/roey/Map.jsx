import React, { useContext, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import { OpenStreetMapProvider } from "leaflet-geosearch"
import MyMarker from './MyMarker';
import ApiW from './ApiW';
import UserContext from '../context/userContext';

const Map = () => {
    const { user } = useContext(UserContext);
    const inputRef = useRef();
    const [position, setPosition] = useState([31.776810080617157, 35.23442267368167]);
    const [name, setName] = useState("הכותל המערבי");
    const mapProvider = new OpenStreetMapProvider();
    const searchLocation = async (e) => {
        e.preventDefault();
        const inputValue = inputRef.current.value;
        setName(inputValue);
        const [searchResult] = await mapProvider.search({ query: inputValue });
        // console.log(searchResult);
        if (searchResult) {
            setPosition([searchResult.y, searchResult.x]);
        }
        else {
            console.log("there is no such place!");
        }
        // console.log(position);
    }

    return (
        <>
            {user
                ?
                <>
                    <div className='w-fill flex justify-center items-center text-center flex-col min-h-[500px]'>
                        <h2 className='text-4xl p-10'>פיצ'ר מפות</h2>
                        <div>
                            <form className='mb-10' onSubmit={searchLocation}>
                                <input className='border me-3 p-2' type='text' ref={inputRef} placeholder='search location...' />
                                <button className='bg-blue-500 p-2 rounded-lg' type='submit'>Search</button>
                            </form>
                        </div>


                        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '70%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                            <MyMarker position={position} location={name} />
                        </MapContainer>
                    </div>
                    <br />
                    <br />
                    <ApiW x={position[0]} y={position[1]} loc={name} />
                </>
                :
                <div style={{
                    backgroundColor: '#d32f2f', /* Deep red background */
                    color: '#fff', /* White text for contrast */
                    padding: '20px',
                    borderRadius: '5px',
                    textAlign: 'left', /* Left-aligned text for formality */
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', /* Subtle shadow for depth */
                    maxWidth: '700px',
                    margin: '20px auto', /* Center div with more margin */
                    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' /* Modern, sans-serif font */
                  }}>
                    <h1 style={{
                      fontSize: '24px', /* Conservative font size */
                      borderBottom: '2px solid #fff', /* White underline title for emphasis */
                      paddingBottom: '10px', /* Spacing under title */
                      marginBottom: '20px' /* Spacing after title */
                    }}>Access Restricted - Map</h1>
                    <p style={{
                      fontSize: '16px', /* Standard text size */
                      lineHeight: '1.6',
                      marginBottom: '10px' /* Spacing between paragraphs */
                    }}>This area is reserved for members only. Please <a href="/login" style={{
                      color: '#ffcccb', /* Soft red for links */
                      textDecoration: 'none' /* No underline to maintain formality */
                    }}>sign in</a> to view this content.</p>
                    <p style={{
                      fontSize: '16px',
                      lineHeight: '1.6'
                    }}>If you are not a member, <a href="/signup" style={{
                      color: '#ffcccb',
                      textDecoration: 'none'
                    }}>register here</a> for access.</p>
                  </div>
                  
            }
        </>
    )
}

export default Map