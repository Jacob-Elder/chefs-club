import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import ccLogo from "../../assets/images/logo_white.png"
import "./NavBar.css"

const NavBar = ({currentUser}) => {

    console.log("current user prop in navbar", currentUser)


    if (currentUser) {
        return (
            <Navbar collapseOnSelect className="navbar" key={currentUser}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#" as="span">
                            <Link className='link' to="/"><img className="logo" src={ccLogo} alt="Chef's Club" /></Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    return (
        <Navbar collapseOnSelect className="navbar" key={currentUser}>
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