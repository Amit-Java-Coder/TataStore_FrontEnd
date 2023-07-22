import React, { useContext, useState } from 'react'
import Base from '../Components/Base'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserSevice from '../Services/User.sevice'
import UserContext from '../Context/user.context'

const  Login = () => {

        const navigate=useNavigate()

        const userContext = useContext(UserContext)

        const [data,setdata]=useState({
               email:'',
               password:''
        })

        const[error,setError]=useState({
               errorData:null,
               isError:false
        })

        const handleChange=(e,property)=>{
               setdata({...data,[property]:e.target.value})
        }

        const submitForm=(e)=>{
                e.preventDefault()
                console.log(data)

               //validation of log in data
            if (data.email === undefined || data.email === '') {
                 toast.error("Email required !!")
                 return
                }

            if (data.password === undefined || data.password === '') {
                 toast.error("Password required !!")
                 return
               }

            if(data.email !== undefined && data.email !== ''  && data.password !== undefined && data.password !== ''){
                    UserSevice.loginUser(data).then((res)=>{
                         console.log(res)
                         toast.success("Logged in successfully.")    


                    //If the User is normal then we take him to the normal User dashboard
                    userContext.login(res)
                    navigate("/users/home")
                    
                    //If the User is admin then we take him to the admin dashboard


                    }).catch((error)=>{
                        setError({
                           errorData:error,
                           isError:true
                        })
                        toast.error("Invalid Username or Password.")
                    })
               }
               else{
                 toast.error("Enter valid Username and Password")
               }
        }

  const loginForm=()=>{
    return (
          <Container>
                 <Row>
                     <Col md={{span:6,offset:3}}>
                         <Card className="my-3 border-0 shadow" style={{position: "relative",top: -60}}>
                            <Card.Body>

                                <h3 className="text-center mb-3">Login Here</h3>

                                <Form onSubmit={submitForm}>

                                     <Form.Group className="mb-3">
                                     <Form.Control
                                          type="email"
                                          placeholder="Enter email"
                                          onChange={(event) => handleChange(event, 'email')}
                                          value={data.email}
                                      />
                                     </Form.Group>


                                     <Form.Group className="mb-3">
                                     <Form.Control
                                          type="password"
                                          placeholder="Enter password"
                                          onChange={(event) => handleChange(event, 'password')}
                                          value={data.password}
                                      />
                                     </Form.Group>

                                    
                                    <Container className="text-center">
                                        <p>If not registered !  <NavLink to="/signup" >Click here</NavLink></p>
                                    </Container>


                                    <Container className="text-center">
                                        <Button type="submit" className="" variant="success">Login</Button>
                                        <Button type="" className="ms-2" variant="danger">Reset</Button>
                                    </Container>


                                </Form>

                            </Card.Body>
                         </Card>
                     </Col>
                 </Row>
          </Container>
  )
}

                     
  return (
    <Base title="Tata Store/Login">
          {loginForm()}
    </Base>
  )
}

export default Login