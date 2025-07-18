import React from 'react';
import './searchbar.css';
import {Spinner} from "react-bootstrap"; // Styles for overlay

const LoadingOverlay = () => (
    <div className="loading-overlay">
        <Spinner animation="border" style={{ width: '4rem', height: '4rem' }}  />
        <div className="spinner">Loading...</div>

    </div>
);

export default LoadingOverlay;