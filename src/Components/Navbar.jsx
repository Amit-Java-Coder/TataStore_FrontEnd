import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import UserContext from '../Context/user.context';
import CartContext from '../Context/cart.context';
const MyNavbar = () => {

  const userContext=useContext(UserContext)
  const {cart}=useContext(CartContext)
  const doLogout=()=>{
        userContext.logout()
  }

  return (
              <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark' sticky='top'>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
            Tata Store
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/services">Services</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/userStore">Store</Nav.Link>
            {
              (!userContext.isAdminUser) && (
                  <>
                  <Nav.Link as={NavLink} to="/cart">Cart {cart && '('+cart.items.length+')'}</Nav.Link>
                  </>
              )
            }
        
            {
               userContext.isLogin ?    <>
                          
                                              {userContext.isAdminUser &&
                                              <>
                                                 <Nav.Link as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>
                                              </>
                                              }
                                              {!userContext.isAdminUser &&
                                                <>
                                                 <Nav.Link as={NavLink} to="/users/order">Order</Nav.Link>
                                                </>
                                              }
                                              <Nav.Link as={NavLink} to={`/users/profile/${userContext.userData.dto.userId}`}>{userContext.userData.dto.name}</Nav.Link>
                                              <Nav.Link  onClick={doLogout}>Logout</Nav.Link>
                                          </> 
                                        : 
                                          <>
                                              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                              <Nav.Link as={NavLink} to="/signup">SignUp</Nav.Link>
                                          </>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
  )
}

export default MyNavbar