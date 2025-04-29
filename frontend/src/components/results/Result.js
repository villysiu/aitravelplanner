import {useLocation} from "react-router-dom";
import DailyPlan from "./DailyPlan";

const Result = () =>{
    const location = useLocation();
    // console.log(location)
    const plan = location.state?.plan;
    console.log(plan)

    const {description, destination, itineraries, imageUrl} = plan;
    return (
        // <div id="ai-result" >
            <div id="result">
                <img className="result_image mb-3" alt={destination}
                     src={imageUrl}
                />
                <div className="px-4">
                    <h2>3 Days trip in {destination}</h2>
                    <p>{description}</p>

                    <div className="mt-4">
                        {itineraries.map(itinerary => <DailyPlan key={itinerary.day} plan={itinerary} />)}
                    </div>
                </div>
            </div>
        // </div>
    )
}
export default Result