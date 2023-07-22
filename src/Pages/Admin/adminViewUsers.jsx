import React, { useEffect, useState } from 'react'
import UserSevice from '../../Services/User.sevice'
import { toast } from 'react-toastify'
import { Card, Col, Container, Row } from 'react-bootstrap'
import SingleUserView from '../../Components/Users/SingleUserView'

const AdminViewUsers = () => {

  const [userData,setUserdata]=useState(undefined)
  useEffect(()=>{
    getAllUsers(0,5,'name','asc')
  },[])

  //Get all user function
  const getAllUsers=(pageNumber,pageSize,sortBy,sortDir)=>{
     UserSevice.getAllUsers(pageNumber,pageSize,sortBy,sortDir).then((res)=>{
          console.log(res)
          setUserdata(res)
          //toast.success("Successfully upload users...")
     }).catch((error)=>{
        console.log(error)
        toast.error("Couldn't uplaod Users!!!")
     })
  }

  //User view
  const userView=()=>{
    return(
      <Container>
            <Row>
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h3>User List</h3>

                                    {
                                        userData.content.map(user => (
                                            <SingleUserView key={user.userId} user={user} />
                                        ))
                                    }
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
      </Container>
    )
  }

  return (
    <>
      {userData && userView()}
    </>
  )
}

export default AdminViewUsers