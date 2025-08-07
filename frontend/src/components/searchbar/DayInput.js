import Dropdown from 'react-bootstrap/Dropdown';
import {PlusCircle, DashCircle, Calendar2Week, ExclamationCircle} from 'react-bootstrap-icons'
import {useState, useEffect} from 'react';
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
    useEffect(()=>{
        if(dayCount > 1 && dayCount < 14 && error){
            setError('');
        }
    }, [dayCount,error])    
    return (
        <Dropdown >
            <Dropdown.Toggle as="div" className="p-2 border border-success rounded custom-dropdown-toggle">
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
                
                {error && <div className='text-danger'><ExclamationCircle className='me-2'/>{error}</div>}

                
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default DayInput