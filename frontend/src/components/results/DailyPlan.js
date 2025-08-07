import './results.css'
import {Card, Col, Row} from "react-bootstrap";
const DailyPlan = ({itinerary}) =>{
    const {day, description, landmarks} = itinerary;
    return(
        <div className="dailyplan-box p-4 mb-4">
            <h2>Day {day}</h2>
            <p>{description}</p>
            <Row>
            { landmarks.map( (landmark, idx)=>{
                return (
                    <Col xs={12} md={4} className="mb-4 col-print-4" key={idx}>
                        <Card>
                            <Card.Img variant="top" 
                                        src={landmark.imageUrl} 
                                        alt={landmark.name} 
                                        className='daily-img' 
                                        onError={(e) => e.target.style.display = 'none'} />
                            <Card.Body>
                                <Card.Title>
                                    <h3>{landmark.name}</h3>
                                </Card.Title>
                                <Card.Text>
                                    {landmark.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Col>
                )
            })}
            </Row>
        </div>
    )
}
export default DailyPlan