import './navbar.css'
import SearchBar from "../searchbar/SearchBar";
import Logo from "./Logo";
import {Col, Row} from "react-bootstrap";

const Navbar = ({setPlan}) =>{
    return (
        <>
            <div className="navbar-background">
            <Row id="navbar">
                <Col xs={12} md={4} className="logo-col">
                    <div className='link-logo'  onClick={()=>setPlan(null)}>
                        <Logo setPlan={setPlan} />
                    </div>
                </Col>
                <Col xs={12} md={8} className="search-col">
                    <SearchBar />
                </Col>
            </Row>
            </div>
        </>
    )
}
export default Navbar