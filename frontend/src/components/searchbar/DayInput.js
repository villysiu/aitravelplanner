import Dropdown from 'react-bootstrap/Dropdown';
import {PlusCircle, DashCircle, Calendar2Week} from 'react-bootstrap-icons'
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
        <Dropdown >
                <Dropdown.Toggle as="div" className="p-2 border border-success rounded" className='custom-dropdown-toggle'>
                    <span className='custom-dropdown-toggle-icon-wrapper'><Calendar2Week size={24}/></span>
                    <span className='custom-dropdown-toggle-right'>

                        <div style={{'fontSize': '10px'}}>Days</div>
                        <input
                            type="text"
                            value={dayCount}
                            placeholder="2 Days"
                            className="form-control dest-input-box"
                           
                      
                        />
                    </span>
                </Dropdown.Toggle>

            <Dropdown.Menu style={{'minWidth': 0}}>
        
                <div className='day-input-dropdown'>
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