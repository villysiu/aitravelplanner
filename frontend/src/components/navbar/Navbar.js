import './navbar.css'
import SearchBar from "../searchbar/SearchBar";
import Logo from "./Logo";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Navbar = () =>{
    return (
        <>
            <div className="navbar-background">
            <Row id="navbar">
                <Col xs={12} md={4} className="logo-col">
                    <Link to={"/"} className='link-logo'> <Logo /></Link>
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