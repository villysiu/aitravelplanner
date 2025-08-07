import DailyPlan from "./DailyPlan";
import {PrinterFill} from "react-bootstrap-icons";

const AITrip = ({plan}) =>{

    console.log(plan)

    const {destination, dayCount} = plan.input;
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