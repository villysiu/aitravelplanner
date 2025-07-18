import './searchbar.css';
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import DayInput from './DayInput';
import DestinationInput from './DestinationInput';

import {Search} from "react-bootstrap-icons";
import LoadingOverlay from "./LoadingOverlay";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import {Col, Row} from 'react-bootstrap';


const SearchBar = () => {
    const [destination, setDestination] = useState('');

    const [dayCount, setDayCount] = useState(3);
    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const handlePlan = async (e) => {
        e.preventDefault(); //
        if (!destination.trim()) {
            return; // Prevent running the function if destination is empty
        }
        setLoading(true);
        try {
            const response = await axios.post(
                "https://aitravelplanner-villy.netlify.app/.netlify/functions/itinerary", 
                { 
                    destination 
                }
            );
            navigate('/results', { state: { plan: response.data } }); // use response.data


        } catch (error) {
            console.error(error);
            setError("Oops! Something went wrong.");
            // setPlan('Error generating itinerary');
        } finally {
            setLoading(false);
            setDestination('');
        }
    };
    return(
        <div id="search">
            {loading && <LoadingOverlay />}
            
            <Row className='search-bar-row'>
                <Col xs={12} sm={4}>    
                    <DestinationInput destination={destination}  setDestination={setDestination} />
                </Col>
                <Col xs={12} sm={3}>    
                    <DayInput dayCount={dayCount} setDayCount={setDayCount} />
                </Col>
                <Col xs={12} sm={4}>    
                    <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic" className='search-input'>
                            theme
                        </Dropdown.Toggle>

                     
                   {/* disabled={!destination || loading} // Disable button if destination is empty */}
                            
                        {/* </Dropdown.Menu> */} 
                    </Dropdown>
                </Col>
                    
                <Col xs={12} sm={1}>
                    <div className='search-btn-container'>
                    
                        <Search size={24} className='search-icon'
                            // onClick={handlePlan}
                        />
                    </div>
                    
                </Col>
            </Row>

            {error && <div>{error}</div>}
        </div>
    )
}
export default SearchBar