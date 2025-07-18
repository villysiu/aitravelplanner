import './navbar.css';
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Form, InputGroup} from 'react-bootstrap';
import {Search} from "react-bootstrap-icons";
import LoadingOverlay from "./LoadingOverlay";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import {Col, Row} from 'react-bootstrap';
import {PlusCircle, DashCircle, Person} from 'react-bootstrap-icons'

const SearchBar = () => {
    const [destination, setDestination] = useState('');
    const [adultCount, setAdultCount] = useState(2);
    const [childCount, setChildCount] = useState(2);
    const [dayCount, setDayCount] = useState(3);
    const [dayError, setDayError] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDay = (action) => {
        if(action === '+' && dayCount < 14){
            setDayCount(d=>d+1);
        }
        else if(action === '-' && dayCount > 1){
            setDayCount(d=>d-1);
        }
        else {
            setDayError('Days must be between 1 to 14.')
        }
    }
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
                    <Form.Control
                        type="text"
                        placeholder="Destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </Col>
                <Col xs={12} sm={3}>    
                    <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic" className='search-input'>
                            <span className='search-input-icon'><Person size={24}/></span>
                            <span className='search-inpit-text'>
                                <div style={{'fontSize': '10px'}}>Days</div>
                                <div>{dayCount} Days</div>
                            </span>
                            
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                    
                            <div className='serach-input-dropdown'>
                                <span className='btn-wrapper'><DashCircle className='minus-btn' onClick={()=>handleDay('-')}/></span>
                
                                <span className='day-input'>{dayCount}</span>
                                <span className='btn-wrapper'><PlusCircle className='plus-btn' onClick={()=>handleDay('+')} /></span>
                                
                                
                                
                            </div>
                  
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={12} sm={3}>    
                    <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic" className='search-input'>
                            {adultCount} Travellers
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                    
                            <div style={{'width': '50px', 'height': '100px'}}>
                                Adult: - 2 + <br/>
                                Children(age 0-17) -0+
                            </div>
                  
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                    {/* <InputGroup.Text>

                        <button
                            className="search-btn"
                            onClick={handlePlan}
                            disabled={!destination || loading} // Disable button if destination is empty
                        >
                            <Search />
                        </button>


                    </InputGroup.Text> */}
                {/* </InputGroup> */}
                <Col xs={12} sm={2}>
                    <Button variant="primary" onClick={handlePlan}>Look up</Button>
                </Col>
            </Row>

            {error && <div>{error}</div>}
        </div>
    )
}
export default SearchBar