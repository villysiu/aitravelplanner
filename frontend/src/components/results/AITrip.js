import React, { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DailyPlan from "./DailyPlan";
import {PrinterFill} from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";

const AITrip = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location)
    const plan = location.state?.plan;
    console.log(plan)

    useEffect(() => {
        if (!plan) {
            navigate("/", { replace: true });
        }
    }, [plan, navigate]);

    if (!plan){
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Redirecting...</span>
                </Spinner>
            </div>
        );
    }
    const {destination, dayCount, themes} = plan.input;
    const {description, imageUrl, itineraries} = plan.aiOutput;

    return (
            <div id="result">
                <img className="result_image mb-3" 
                    alt={destination}
                    src={imageUrl}
                    onError={(e) => e.target.style.display = 'none'}
                />
                <div className="px-4">

                    <div className="title-row">
                        <h2>{dayCount} Days trip in {destination}</h2>
                        {/*<button onClick={() => window.print()}>Print / Save as PDF</button>*/}
                        <PrinterFill size={30}
                                     className="print-btn no-print"
                                     title="Print / Save as PDF"
                                     onClick={() => window.print()} />
                    </div>
                    <p>{description}</p>

                    <div className="mt-4 ">
                        {itineraries.map(itinerary => <DailyPlan key={itinerary.day} itinerary={itinerary}/>)}
                    </div>
                </div>
            </div>

    )
}
export default AITrip