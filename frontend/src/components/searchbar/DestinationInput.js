import {GeoAlt} from 'react-bootstrap-icons';
import {InputGroup, Form} from 'react-bootstrap';
const DestinationInput = ({destination, setDestination}) => {
    return(
        <div className='search-input btn'>
            <span className='search-input-icon'><GeoAlt size={24}/></span>
            <span className='destination-input-text'>
                <Form.Control
                    type="text"
                    placeholder="Where to? "
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className='destination-input' 
                />
            </span>
        </div>
        
    )
}
export default DestinationInput