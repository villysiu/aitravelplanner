import './home.css'
import Logo from "../navbar/Logo";
import SearchBar from "../navbar/SearchBar";
// import world from
const Home = () => {
    return(
        <div id="home">
            {/*<div id="home-wallpaper"></div>*/}

            <video autoPlay muted loop playsInline id="video-wallpaper">
                <source src="https://videos.pexels.com/video-files/8538619/8538619-uhd_2732_1440_25fps.mp4" type="video/mp4" />

            </video>
            <div className='transparent-box'>
                <Logo/>
                <SearchBar/>
            </div>
        </div>
    )
}
export default Home