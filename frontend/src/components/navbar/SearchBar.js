import './navbar.css';
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Form, InputGroup} from 'react-bootstrap';
import {Search} from "react-bootstrap-icons";
import LoadingOverlay from "./LoadingOverlay";

import {apiLink} from "../api";

const SearchBar = () => {
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handlePlan = async (e) => {
        e.preventDefault(); //
        if (!destination) {
            return; // Prevent running the function if destination is empty
        }
        setLoading(true);
        try {
            const response = await axios.post(`${apiLink}/api/itinerary`, { destination });
            navigate('/results', { state: { plan: response.data } }); // use response.data


        } catch (error) {
            console.error(error);
            setError(error);
            // setPlan('Error generating itinerary');
        } finally {
            setLoading(false);
        }
    };
    return(
        <div id="search">
            {loading && <LoadingOverlay />}
            <Form onSubmit={handlePlan}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Enter destination, number of days and people"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <InputGroup.Text>

                        <button
                            className="search-btn"
                            onClick={handlePlan}
                            disabled={!destination || loading} // Disable button if destination is empty
                        >
                            <Search />
                        </button>


                    </InputGroup.Text>
                </InputGroup>

            </Form>
        </div>
    )
}
export default SearchBar