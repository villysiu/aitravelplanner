import Dropdown from 'react-bootstrap/Dropdown';
import {PlusCircle, DashCircle, Person} from 'react-bootstrap-icons'
import {useState} from 'react';
const DayInput = ({dayCount, setDayCount, }) => {

    const [error, setError] = useState(''); 

    const handleDay = (action) => {
        if(action === '+' && dayCount < 14){
            setDayCount(d=>d+1);
        }
        else if(action === '-' && dayCount > 1){
            setDayCount(d=>d-1);
        }
        else {
            setError('Days must be between 1 to 14.')
        }
    }
    return (
        <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic" className='search-input'>
                            <span className='search-input-icon'><Person size={24}/></span>
                            <span className='search-input-text'>
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
                            { error && 
                            <div> {error}</div>}
                            
                        </Dropdown.Menu>
                    </Dropdown>
    )
}
export default DayInput