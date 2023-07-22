import React from 'react'
import FeedbackService from '../../Services/Feedback.service'
import { Button, Container, Form, FormGroup } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component"
import { toast } from 'react-toastify'
import { useContext } from 'react'
import UserContext from '../../Context/user.context'
import { useState } from 'react'
const FeedbackForm = ({productId}) => {

    const {isLogin,userData}=useContext(UserContext)
    const [feedback,setFeedback]=useState({
        ratings:0,
        review:""
    })

      //Add Feedback
      const addFeedbackk=(event)=>{
        event.preventDefault()
            if(feedback.ratings===0){
              toast.error("Rating required!!!")
              return
            }
            if(feedback.review==='' || feedback.review===undefined){
              toast.error("Rating required!!!")
              return
            }
            
            FeedbackService.addFeedback(userData.dto.userId,productId,feedback).then((res)=>{
               console.log(res)
  
               toast.success("Feedback added...")
            }).catch((error)=>{
              console.log(error)
              toast.error("Feedback couldn't add...")
            })
        }
  
  return (

<Container className='mt-2'>
                   <Form onSubmit={addFeedbackk}>
<h2><b>Write your views</b></h2>
<ReactStars  count={5.0}
            onChange={(rating)=>{
              setFeedback({...feedback,ratings:rating})
            }}
            size={44}
            isHalf={true}
            color={'#42a5f5'} 
            />
<FormGroup>
    <Form.Control
         as="textarea"
         placeholder="Leave a comment here"
         style={{ height: '110px' }}
         onChange={(event)=>setFeedback({...feedback,review:event.target.value})}
         value={feedback.review}
         />
</FormGroup>
     <Container className='d-grid mt-2 mb-2'>
      <Button type='submit' className='primary mt-2' size='sm'>Submit</Button> 
     </Container>               
</Form> 
</Container>
  )
}

export default FeedbackForm