import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import ccLogo from "../../assets/images/logo_white.png"
import "./NavBar.css"

const NavBar = () => {

    return (
        <Navbar collapseOnSelect className="navbar">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#" as="span">
                        <Link className='link' to="/"><img className="logo" src={ccLogo} alt="Chef's Club" /></Link>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#" as="span">
                        <Link className='link' to="/login">Login</Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default NavBar