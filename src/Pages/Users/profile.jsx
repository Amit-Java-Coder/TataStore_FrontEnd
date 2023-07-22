import React, { useContext, useEffect, useState } from 'react'
import UserProfileView from '../../Components/Users/UserProfileView'
import { Button, Card, Container, Form, Modal, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import UserContext from '../../Context/user.context'
import UserSevice from '../../Services/User.sevice'
import { useParams } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
const Profile = () => {

  const userContext=useContext(UserContext)
  const [user,setUser]=useState(null)
  const {userId}=useParams()
  const [showPassword,setShowPassword]=useState(false)

  // modals state 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);

  useEffect(()=>{
     getUserDataFromServer()
  },[userContext.userData])


  const getUserDataFromServer=()=>{
    //const userId=userContext.userData.dto.userId
    console.log(userId)
    UserSevice.getUserData(userId).then(data=>{
       console.log(data)
       setUser(data)
    }).catch((error)=>{
       console.log(error)
       setUser(null)
       toast.error("Error in loading user information from server !")
    })
  }

  
  const handleChange = (event, property) => {
   setUser({
     ...user,[property]: event.target.value
   })
 } 




  const updateUserData=()=>{
   if(user.name == '' || user.name==undefined ){
     toast.error("Name is required!!!")
     return
   }
   if( user.name.charAt(0) !== user.name.charAt(0).toUpperCase()){
    toast.error("Name shoiuld start with capital letter!!")
    return
   }
   if(user.email == '' || user.email==undefined){
    toast.error("Email is required!!!")
    return
   }  
   if(user.password == '' || user.password == undefined  ){
    toast.error("Password is required!!!")
    return
   }
   if(user.about == undefined || user.about ==''){
    toast.error("About is required!!!")
    return
   }
      UserSevice.updateUser(user).then((res)=>{
         setShow(false)
        toast.success("User is updated.")
      }).catch((error)=>{
        console.log(error)
        toast.error("User couldn't update.")
      })
  }
  
 

  //Update User details
  const updateUser=()=>{
       return(
            <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Update the user information</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Card className=" border-0 shadow-sm " style={{borderRadius: "50px"}}>
               <Card.Body>
                  <Table className="text-center " responsive hover>
                      <tbody>
                         <tr>
                            <td>Name</td>
                            <td>
                               <Form.Control  type='text'
                                              value={user.name} 
                                              placeholder='Enter new name'
                                              onChange={(event) => handleChange(event, 'name')}/>
                            </td>
                         </tr>

                         <tr>
                            <td>Email</td>
                            <td><Form.Control  type='email' 
                                               value={user.email} 
                                               placeholder='Enter new email'
                                               onChange={(event) => handleChange(event, 'email')}/>
                           </td>
                         </tr>

                         <tr>
                            <td>Gender</td>
                            <td>
                              <Form.Group>
                                            <Form.Check
                                              inline
                                              name='gender'
                                              label="Male"
                                              type={'radio'}
                                              id={`gender`}
                                              value={'Male'}
                                              checked={user.gender === 'Male'}
                                              onChange={(event) => handleChange(event, 'gender')}
                                            />

                                            <Form.Check
                                              inline
                                              name='gender'
                                              label="Female"
                                              type={'radio'}
                                              id={`gender`}
                                              value={'Female'}
                                              checked={user.gender === 'Female'}
                                              onChange={(event) => handleChange(event, 'gender')}
                                            />
                              </Form.Group>
                            </td>
                         </tr>

                         <tr>
                            <td>About</td>
                            <td><Form.Control as={'textarea'} 
                                              value={user.about} 
                                              placeholder='Write something about yourself'
                                              onChange={(event) => handleChange(event, 'about')}/>
                            </td>
                         </tr>

                         <tr>
                            <td>Password</td>
                            <td className="d-flex"><Form.Control  type={showPassword ? "text" : "password"} 
                                               placeholder='Enter new password'
                                               onChange={(event) => handleChange(event, 'password')}
                                               />
                                          {user.password && (showPassword ?  
                              <AiOutlineEyeInvisible size={18} className='mt-4'  onClick={()=>{setShowPassword(false)}}/>:
                              <AiOutlineEye size={18}  className='mt-4'  onClick={()=>{setShowPassword(true)}}/> 
                                          )} 
                            </td>
                         </tr>
                      </tbody>
                  </Table>
               </Card.Body>
            </Card>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUserData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
       )
   }


  return (
       <Container className=''>
        {(user ?  <><UserProfileView user={user} handleShowModal={handleShowModal}/> {updateUser()} </> 
                  : 
                  (<h3 className="text-center text-uppercase m-2 text-danger">User not loaded from Server!</h3>))}
 
       </Container>   
  )
}

export default Profile