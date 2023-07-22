import React, { useContext } from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap'
import UserContext from '../../Context/user.context'

const UserProfileView = ({user=null, handleShowModal}) => {
//Here instead of storing our context in a object we destructured it...
const {userData,isLogin}=useContext(UserContext)


  return (
    <>
    {
        (user && (
        <Card className="m-3 border-0 shadow">
        <Card.Body>
        
            <h1 className="text-center text-uppercase fw-bold text-success">  {user.name} </h1>
            <div className="mt-3">

            <Card className=" border-0 shadow-sm " style={{borderRadius: "50px"}}>
               <Card.Body>
                  <Table className="text-center " responsive hover>
                      <tbody>
                         <tr>
                            <td>Name</td>
                            <td>{user.name}</td>
                         </tr>

                         <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                         </tr>

                         <tr>
                            <td>Gender</td>
                            <td>{user.gender}</td>
                         </tr>

                         <tr>
                            <td>About</td>
                            <td>{user.about}</td>
                         </tr>

                         <tr>
                            <td>Roles</td>
                            <td>{user.roles.map(role => <div key={role.roleId}>{role.roleName}</div>)}</td>
                         </tr>
                      </tbody>
                  </Table>
               </Card.Body>
            </Card>
            </div>
            
            {
               //These buttons of update user and orders of user will only be accessible to particular user who logged in...Admin or any other user can't update the user details...To achive this we put the condition...
               (isLogin && userData.dto.userId===user.userId) ? (
                              <Container className="text-center mt-3">
                                    <Button variant="success" size="lg" onClick={handleShowModal} >Update</Button>
                                    <Button className="ms-2" variant="warning" size="lg">Orders</Button>
                              </Container>
                           ) : 
                           ('')
            }



        </Card.Body>
        </Card>
        ))
    }

    </>
  )
}

export default UserProfileView