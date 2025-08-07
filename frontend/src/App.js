
import './App.css';
import React, {useState} from 'react';
import Logo from "./components/navbar/Logo";
import SearchBar from "./components/searchbar/SearchBar";
import Navbar from "./components/navbar/Navbar";
import AITrip from "./components/results/AITrip";

function App() {
    const [plan, setPlan] = useState(null);
  
    if(!plan){
        return(
          <div id='App'>
            <div id="home">
                <video autoPlay muted loop playsInline id="video-wallpaper">
                    <source src="https://videos.pexels.com/video-files/8538619/8538619-uhd_2732_1440_25fps.mp4" type="video/mp4" />

                </video>
                <div className='transparent-box'>
                    <Logo/>
                    <SearchBar setPlan={setPlan} />
                </div>
            </div>
            </div>
        )
    }
    return (
        <div id='App'>
          
            <Navbar setPlan={setPlan} />/>
            <AITrip plan={plan}/>
        </div>
    )
}

export default App;
