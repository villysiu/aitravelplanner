import {GeoAlt} from 'react-bootstrap-icons';
import {Form, Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import Papa from "papaparse";

const DestinationInput = ({destination, setDestination}) => {
    const [error, setError] = useState(''); 
    const [inputValue, setInputValue] = useState('');
    const [show, setShow] = useState(false);

    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);

    const handleToggle = (isOpen, event, metadata) => {    
        setShow(isOpen);
    };
    const popularCities = ['Tokyo, Japan', 'Shanghai, China', 'New York, United States', 'Melbourne, Victoria, Australia', 'Toronto, Ontario, Canada']

    useEffect(() => {
        fetch("/aitravelplanner/assets/worldcities.csv")
            .then((res) => {

                if (!res.ok) {
                    throw new Error("CSV file not found");
                }
                return res.text();
            })
            .then((data) => {
                Papa.parse(data, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const filteredResults = results.data
                                            .filter(city=>city.population > 100000)
                                            .map(city=>{ 
                                                let str = city.city.trim();

                                                if(city.admin_name.trim().length>0 && 
                                                    city.admin_name.trim().toLowerCase() !== city.city.trim().toLowerCase() )
                                                    str += ', ' + city.admin_name.trim();

                                                str += ', ' + city.country.trim() ;
                                                return str;
                                            })

                    setCities(filteredResults);


                },
                });
            })
            .catch((err) => console.error("Error loading CSV:", err));

    }, []);

  
    // useEffect(() => {
    //     console.log(cities.length)
    //     if (cities.length > 0) {
    //         console.log("First 5 cities:", cities.slice(0, 5));
    //     }
    // }, [cities]);


    const handleInputChange = (e) => {
        const value = e.target.value;

        setInputValue(value);
        console.log(value);
        setFilteredCities([]);
        
        if(!show)
            setShow(true);

        if (value.length >= 3) {
            setError('');
            const matches = cities.filter((city) =>
                city.toLowerCase().includes(value.toLowerCase())
            );
            
            setFilteredCities(matches.slice(0, 10)); // limit to 10 results

        }
    };



    return(
        <>

            <Dropdown show={show} onToggle={handleToggle}>
                <Dropdown.Toggle as="div" className="p-2 border border-success rounded" className='custom-dropdown-toggle'>
                    <span className='custom-dropdown-toggle-icon-wrapper'><GeoAlt size={24}/></span>
                    <span>

                        <div style={{'fontSize': '10px'}}>Where to?</div>
                        <input
                            type="text"
                            value={inputValue}
                            placeholder="Type to search..."
                            className="form-control dest-input-box"
                            onChange={(e) => handleInputChange(e)}
                      
                        />
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        filteredCities.length > 0 ? (
                        
                            filteredCities.map(city=>{
                                return(
                                    <Dropdown.Item className='custom-dropdown-item'
                                        onClick={() => {
                                            setInputValue(city);
                                            setShow(false); 
                                            setFilteredCities([`${city}`])
                                        }}
                                    >
                                        {city}
                                    </Dropdown.Item>
                                )
                            })
                        ) : (
                            inputValue.length >= 3 ? (
                                <> No Match</>
                            ) : (
                                <>
                                <div><b>Popular Destinations </b></div>
                                {popularCities.map(city=>{
                                    return(
                                        <Dropdown.Item className='custom-dropdown-item'
                                            onClick={() => {
                                            setInputValue(city);
                                            setShow(false); 
                                            setFilteredCities([`${city}`])
                                        }}>
                                            {city}
                                        </Dropdown.Item>
                                    )
                                })}
                            
                                </>
                            )
                        )
                    }
                    
                </Dropdown.Menu>
            </Dropdown>
            

        
        </>

    )
}
export default DestinationInput