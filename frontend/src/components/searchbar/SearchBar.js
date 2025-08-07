import './searchbar.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayInput from './DayInput';
import DestinationInput from './DestinationInput';
import ThemesInput from './ThemesInput';

import {Search, ExclamationCircle} from "react-bootstrap-icons";
import LoadingOverlay from "./LoadingOverlay";
import {Col, Row} from 'react-bootstrap';
// import { response } from './SampleAiOutput'

const SearchBar = ({setPlan}) => {
    const [destination, setDestination] = useState('');
    const [dayCount, setDayCount] = useState(3);
    const [themes, setThemes] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    
    const handlePlan = async (e) => {
        e.preventDefault(); //
        
        if (!destination.trim()) {
            setError('Please select a destination');
            return; // Prevent running the function if destination is empty
        }
        setLoading(true);
        setError('');
        try {
            
            const response = await axios.post(
                "https://aitravelplanner-villy.netlify.app/.netlify/functions/itinerary", 
                { 
                    destination,
                    dayCount,
                    themes
                }
            );

            navigate('/results', { state: { plan: response.data } }); // use response.data
            setPlan(response.data);

        } catch (error) {
            console.error(error);
            // setError("Oops! Something went wrong.");
            // setPlan('Error generating itinerary');
        } finally {
            setLoading(false);
            setDestination('');
            setDayCount(3);
            setThemes([]);
        }
    };
    useEffect(()=>{
        if(destination && error){
            setError('');
        }
    }, [destination, error])
    return(
        <div id="search">
            {loading && <LoadingOverlay />}
            
                <Row className='search-bar-row p-2 '>
                    <Col xs={12} sm={4} className="mt-3 mt-sm-0">    
                        <DestinationInput destination={destination}  setDestination={setDestination} />
                        {error && <div className='text-danger'><ExclamationCircle className='me-2'/>{error}</div>}
                    </Col>
                    <Col xs={12} sm={2} className="mt-3 mt-sm-0">    
                        <DayInput dayCount={dayCount} setDayCount={setDayCount} />
                    </Col>
                    <Col xs={12} sm={5} className="mt-3 mt-sm-0">    
                        <ThemesInput themes={themes} setThemes={setThemes} />
                    </Col>
                    <Col xs={12} sm={1} className="mt-3 mt-sm-0">
                        <div className='search-btn-container' onClick={handlePlan}>

                            <Search size={24} className='search-icon'  />
                        </div>
                    </Col>
                </Row>
              
           
        </div>
    )
}
export default SearchBar