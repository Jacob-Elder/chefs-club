import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import ccLogo from "../../assets/images/logo_white.png"
import "./NavBar.css"
import { useApolloClient } from '@apollo/client'

const NavBar = ({currentUser, setToken, setMe}) => {

    const client = useApolloClient()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        client.resetStore()
        setToken(null)
        setMe(null)
        navigate("/")
    }


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
                        <NavDropdown title={`${currentUser.username}`} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => navigate("/myprofile")}>My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Make Post</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
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