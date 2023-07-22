import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAdminUserLoggedIn } from '../../Auth/helper.auth'
import UserContext from '../../Context/user.context'
import { Col, Container, Row } from 'react-bootstrap'
import SideMenu from '../../Components/Admin/SideMenu'
import UseJwtTokenExpiration from '../../Hooks/useJwtTokenExpiration'


const AdminDashboard = () => {   
    
  UseJwtTokenExpiration()
  const userContext=useContext(UserContext)

      const loggedInAdminView=()=>{
            return(
                    <Container fluid >
                        <Row>
                              <Col md={{span:2}}>
                                  <SideMenu></SideMenu>
                              </Col>


                              <Col>
                                  <Outlet/>
                              </Col>
                        </Row>
                    </Container>            
                  )
      }

  return (
        (isAdminUserLoggedIn()) ? loggedInAdminView() :  <Navigate to='/login'/>
  )
}

export default AdminDashboard