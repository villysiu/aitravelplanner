import Dropdown from 'react-bootstrap/Dropdown';
import {PlusCircle, DashCircle, Balloon} from 'react-bootstrap-icons'
import {useState} from 'react';
import {Form, Row, Col} from 'react-bootstrap';

const ThemesInput = ({themes, setThemes, }) => {

    // const [error, setError] = useState(''); 
    const themesArray = ['leisure', 'family', 'business', 'adults', 'kid-friendly', 'relax', 'party', 'shopping', 'sightseeing'];
    
    const handleCheckboxChange = (e) => {
    const { checked, name } = e.target;

    if (checked) {
        setThemes((prevThemes) => [...prevThemes, name]);
    } else {
        setThemes((prevThemes) => prevThemes.filter((theme) => theme !== name));
    }
  };
   
    return (
        <Dropdown 
        // show={show} onToggle={handleToggle}
        >
                <Dropdown.Toggle as="div" className="p-2 border border-success rounded" className='custom-dropdown-toggle'>
                    <span className='custom-dropdown-toggle-icon-wrapper'><Balloon size={24}/></span>
                    <span className='custom-dropdown-toggle-right'>

                        <div style={{'fontSize': '10px'}}>Themes</div>
                        <input
                            type="text"
                            value={themes}
                            placeholder="select your themes."
                            className="form-control dest-input-box"
                           
                      
                        />
                    </span>
                </Dropdown.Toggle>

            <Dropdown.Menu>
        
                 <div className='theme-input-dropdown px-2'>
                    <Row>
                    {
                        themesArray.map(th=>{
                            return(

                                <Col xs={12} md={6}>
                                    <Form.Check
                                        inline
                                        label={th}
                                        name={th}
                                        type='checkbox'
                                        id={`theme-${th}`}
                                        onChange={handleCheckboxChange}

                                    />
                                </Col>
                            )
                        })
                    }
                    </Row>
                    
                </div>
                {/* { error && 
                <div> {error}</div>} */}
                
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default ThemesInput