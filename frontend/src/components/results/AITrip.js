import {useLocation} from "react-router-dom";
import DailyPlan from "./DailyPlan";
import {PrinterFill} from "react-bootstrap-icons";

const AITrip = () =>{
    const location = useLocation();
    // console.log(location)
    const plan = location.state?.plan;
    console.log(plan)

    const {description, destination, itineraries, imageUrl} = plan;
    return (
            <div id="result">
                <img className="result_image mb-3" alt={destination}
                     src={imageUrl}
                />
                <div className="px-4">

                    <div className="title-row">
                        <h2>{itineraries.length} Days trip in {destination}</h2>
                        {/*<button onClick={() => window.print()}>Print / Save as PDF</button>*/}
                        <PrinterFill size={30}
                                     className="print-btn no-print"
                                     title="Print / Save as PDF"
                                     onClick={() => window.print()} />
                    </div>
                    <p>{description}</p>

                    <div className="mt-4 ">
                        {itineraries.map(itinerary => <DailyPlan key={itinerary.day} plan={itinerary}/>)}
                    </div>
                </div>
            </div>

    )
}
export default AITrip