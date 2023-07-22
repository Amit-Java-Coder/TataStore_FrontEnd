import React, { useState } from 'react'
import Base from '../Components/Base'
import { Button, Card, Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import UserSevice from '../Services/User.sevice'


const Signup = () => {

            const [data,setData]=useState({
              name: '',
              email: '',
              password: '',
              showPassword: false,
              confirmPassword: '',
              showConfirmPassword: false,
              about: '',
              gender: ''
            })
       
          const handleClickShowPassword = () => {
              setData({ ...data, showPassword: !data.showPassword })
          }
       
          const handleClickShowPassword1 = () => {
            setData({ ...data, showConfirmPassword: !data.showConfirmPassword })
          }

const [errorData, setErrorData] = useState({
    isError: false,
    Data: null
})

const submitForm=(e)=>{
 
    e.preventDefault()
    console.log(data)

    //Validation of User Data
    if(data.name===undefined ||  data.name===''){
      toast.error("Name is required")
      return
    }

    if( data.name.charAt(0)!== data.name.charAt(0).toUpperCase()){
      toast.error("Name shoiuld start with capital letter!!")
      return
    }

    if(data.email===undefined ||  data.email===''){
      toast.error("Email is required")
      return
    }

    if (data.password === undefined || data.password === '') {
      toast.error("Password is required !!")
      return
    }

    if (data.confirmPassword === undefined || data.confirmPassword === '') {
      toast.error("Confirm Password is required !!")
      return
    }

    if (data.about === undefined || data.about ==='') {
      toast.error("Write Something about yourelf !!")
      return
    }

    //After validation we are calling function that will register the user in server which is created using Axios..
    UserSevice.registerUser(data).then((res)=>{
      console.log(res)
      toast.success("User is registered.")

      setData({
        name: '',
        email: '',
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
        about: '',
        gender: ''
      })
    }).catch((error)=>{
      console.log(error)
      setErrorData({
          isError: true,
          Data:error
      })
      toast.error("User couldn't register.")
    })
  }




const handleChange = (event, property) => {
    setData({
      ...data,[property]: event.target.value
    })
}

const clearData = () => {
  setData({
      name: '',
      email: '',
      password: '',
      showPassword: false,
      confirmPassword: '',
      showConfirmPassword: false,
      about: '',
      gender: ''
  })
  
  setErrorData({
    errorData: null,
    isError: false
  })


 
}
  const signUpForm=()=>{
         return(
             <Container>
                 <Row>
                  <Col sm={{span: 8, offset: 2 }} className='bg-secondary' style={{position: 'relative', top: -60}}>
                       
                        <Card>
                              <Card.Body>
                                    <h3 className='text-center'>SignUp Here</h3>
                                    <Form onSubmit={submitForm}>
                                        <Form.Group className="mb-3" controlId="formName">
                                          <Form.Label>Enter Name</Form.Label>
                                          <Form.Control type="text"
                                                        placeholder="Enter Name" 
                                                        value={data.name}
                                                        onChange={(event) => handleChange(event, 'name')}
                                                        isInvalid={errorData.Data?.response?.data?.name}/>

              <FormControl.Feedback type="Invalid">{errorData.Data?.response?.data?.name}</FormControl.Feedback>

                                          <Form.Text className="text-muted">
                                          </Form.Text>
                                        </Form.Group>


                                        <Form.Group className="mb-3" controlId="formEmail">
                                          <Form.Label>Enter Email</Form.Label>
                                          <Form.Control type="email" 
                                                        placeholder="Enter Email"
                                                        value={data.email} 
                                                        onChange={(event) => handleChange(event, 'email')}
                                                        isInvalid={errorData.Data?.response?.data?.email}/>
                                                        
              <FormControl.Feedback type="Invalid">{errorData.Data?.response?.data?.email}</FormControl.Feedback>
                                          
                                          <Form.Text className="text-muted">
                                          </Form.Text>
                                        </Form.Group>

                                        <Form.Label>Password</Form.Label>
                                        <Form.Group className="mb-3 d-flex" controlId="formPassword" >   
                                          <Form.Control type={data.showPassword ? "text" : "password"} 
                                                        placeholder="Enter Password" 
                                                        value={data.password}
                                                        onChange={(event) => handleChange(event, 'password')}
                                                        isInvalid={errorData.Data?.response?.data?.password}                                                                                                                                                                                                
                                                      />
                                          {
                                           data.showPassword ?  
                                          <AiOutlineEyeInvisible size={16}  onClick={handleClickShowPassword}/>:
                                          <AiOutlineEye size={16}  onClick={handleClickShowPassword}/>
                                          }            
                                        

              <FormControl.Feedback type="Invalid">{errorData.Data?.response?.data?.password}</FormControl.Feedback>

                                          <Form.Text className="text-muted">
                                          </Form.Text>
                                        </Form.Group>

                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Group className="mb-3 d-flex" controlId="formConfiPassword">           
                                          <Form.Control type={data.showConfirmPassword ? "text" : "password"} 
                                                        placeholder="Confirm Password" 
                                                        value={data.confirmPassword}
                                                        onChange={(event) => handleChange(event,'confirmPassword')}/>
                                                         {data.showConfirmPassword ?  
                                          <AiOutlineEyeInvisible size={16}  onClick={handleClickShowPassword1}/>:
                                          <AiOutlineEye size={16}  onClick={handleClickShowPassword1}/> 
                                          } 
                                          <Form.Text className="text-muted">
                                          </Form.Text>
                                        </Form.Group>


                                             <Form.Label>Select Gender</Form.Label>
                                        <Form.Group>
                                            <Form.Check
                                              inline
                                              name='gender'
                                              label="Male"
                                              type={'radio'}
                                              id={`gender`}
                                              value={'Male'}
                                              checked={data.gender === 'Male'}
                                              onChange={(event) => handleChange(event, 'gender')}
                                            />

                                            <Form.Check
                                              inline
                                              name='gender'
                                              label="Female"
                                              type={'radio'}
                                              id={`gender`}
                                              value={'Female'}
                                              checked={data.gender === 'Female'}
                                              onChange={(event) => handleChange(event, 'gender')}
                                            />
                                        </Form.Group>


                                        <Form.Group className='mb-2'>
                                             <Form.Label>Write Something about yourself</Form.Label>
                                             <Form.Control as={'textarea'}
                                                           onChange={(event) => handleChange(event, 'about')}
                                                           value={data.about}/>
                                        <FormControl.Feedback type="Invalid">{errorData.Data?.response?.data?.about}</FormControl.Feedback>

                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                        </Form.Group>

                                   <Container>
                                         <p className="text-center">Already registered !   <a href="/login">Login </a></p>
                                   </Container>

                                   <Container className="text-center">
                  <Button type="submit" className="text-uppercase" variant="success">REGISTER</Button>
                  <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>RESET</Button>

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
    <Base
        title="Tata Store/SignUp"
        description='Sign up here'
    >
       {signUpForm()}
    </Base>
  )
}

export default Signup