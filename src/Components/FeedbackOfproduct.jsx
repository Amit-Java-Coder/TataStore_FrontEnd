import React, { useContext } from 'react'
import FeedbackService from '../Services/Feedback.service'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, FormGroup, Modal, Row } from 'react-bootstrap'
import { FaStar,FaStarHalfAlt } from "react-icons/fa"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import UserContext from '../Context/user.context'
import ReactStars from "react-rating-stars-component"
import FeedbackForm from './Users/FeedbackForm'

const FeedbackOfproduct = ({productId}) => {
    const [feedback,setFeedback]=useState([])
    const [currentUserFeedback,setCurrentUserFeedback]=useState([])
    const [otherUserFeedback,setOtherUserFeedback]=useState([])
    const {userData}=useContext(UserContext)
    const [userFeedback, setUserFeedback] = useState(undefined)
    const [showEditModal, setShowEditModal] = useState(false)
    const [toBeEditfeedback,setToBeEditFeedback]=useState({
        ratings:0,
        review:""
    })
    
useEffect(()=>{
    try{
    getAllFeedbackOfSingleProduct(productId)
    }catch(error){
    }
},[productId])

//Get feedback of Products
const getAllFeedbackOfSingleProduct=(productId)=>{
        FeedbackService.getAllFeedbackOfSingleProduct(productId).then((res)=>{
            console.log(res)
            setFeedback(res)
            
            //Get feedback of Products of OtherUsers
            const fdo=res.filter((f)=>{
                return f.user.userId!==userData.dto.userId
            })
            setOtherUserFeedback(fdo)
            console.log(fdo)

            //Get feedback of CurrentUser
            const fdu=res.filter((f)=>{
                return f.user.userId===userData.dto.userId
               })
               setCurrentUserFeedback(fdu)
               console.log(fdu)
          }).catch((error)=>{
            console.log(error)
          })
      }

//Get Total Ratings of Product
const avgRatings=()=>{

     let totalRating=0.0
     let avgTotalRatings=0.0
     feedback.map((r)=>{
        return(totalRating+=r.ratings)
     })
     avgTotalRatings=totalRating/feedback.length
     return Math.round(avgTotalRatings)
}


//Delete Reating
const handleDelete=(feedbackId)=>{
    FeedbackService.deleteFeedback(feedbackId).then((res)=>{
        toast.success("Feedback deleted...")
        const newFeedbackarray=feedback.filter((f)=>{
            return f.feedbackId!==feedbackId
        })
        setFeedback(newFeedbackarray)
    }).catch((error)=>{
        toast.error("Feedback couldn't deleted!!!")
    })
}

//ModalView Product variables
const closeFeedbackEditModalView = () => {
    setShowEditModal(false)
  }
  const openFeedbackEditModalView = (event,feedback) => {
    console.log(feedback)
    setUserFeedback(feedback)
    setShowEditModal(true)
  }

//Update Feedback ModalView
const operEditFeedbackModal=()=>{
    return userFeedback &&(
    <Modal size='lg' show={showEditModal} onHide={closeFeedbackEditModalView} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Update Product Here</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <Container className='mt-2'>
                   <Form onSubmit={updateFeedback}>
<h2><b>Write your views</b></h2>
<ReactStars  count={5.0}
            onChange={(rating)=>{
                setToBeEditFeedback({...toBeEditfeedback,ratings:rating})
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
         onChange={(event)=>setToBeEditFeedback({...toBeEditfeedback,review:event.target.value})}
         value={feedback.review}
         />
</FormGroup>
     <Container className='d-grid mt-4'>
      <Button type='submit' className='primary mt-2' size='sm'>Submit</Button> 
     </Container>               
</Form> 
</Container>

    </Modal.Body>
          <Modal.Footer>
            <Button className="bg-danger" onClick={closeFeedbackEditModalView}>
              Close
            </Button>
          </Modal.Footer>
    </Modal>
  )
}

//Update Feedback
const updateFeedback=(event)=>{
    event.preventDefault()

    if(toBeEditfeedback.ratings===0){
        toast.error("Rating required!!!")
        return
    }
    if(toBeEditfeedback.review==='' || toBeEditfeedback.review===undefined){
        toast.error("Rating required!!!")
        return
    }
    FeedbackService.editFeedback(userFeedback.feedbackId,toBeEditfeedback).then((res)=>{
        toast.success("Feedback updated...")

        const newUpdatedFeedbackArray=feedback.map((f)=>{
            if(f.feedbackId===userFeedback.feedbackId){
                return res
            }
            return f
        })
        setFeedback(newUpdatedFeedbackArray)
        setShowEditModal(false)
    }).catch((error)=>{
        toast.error("Feedback couldn't update!!!")
    })
}

//Rating Star function
const ratingStar=(rating)=>{
    return(
    Array.from({length : 5},(elem,index)=>{
        let number=index+0.5
      return(
       <span key={index}>
         {
            rating>=index+1 ?(
                <FaStar className='icon warning' color='blue'/>
            ): rating>=number?(
                <FaStarHalfAlt className='icon warning' color='blue'/>
            ):(
                <AiOutlineStar className='icon' />
            )
         }
       </span>
      )
    }))
}


const feedbackdetails=()=>{
        return currentUserFeedback &&(
            
            <Container fluid>
            
            <Row>
                <Col><b style={{ fontSize: 30 }}>Reviews</b>
                      <Badge className='m-2 '>{avgRatings()}
                            <AiFillStar className='m-1'/>
                      </Badge>
                </Col>
            </Row>
      
            <Card  className='mt-2'>
                
                {
                  currentUserFeedback &&  currentUserFeedback.map((f) => {
                    return(
                        <Card.Body key={f.feedbackId} md={4} className='mt-2' >
                            <div><h3>{ f.user.name }</h3>{ratingStar(f.ratings)}</div>
                            <div>{f.review}</div>
                         {
                            userData.dto?.userId===f.user.userId &&
                            <Button type='submit' className='p-1' onClick={(event)=>openFeedbackEditModalView(event,f)}>Update</Button>   
                          }
                          {
                            userData.dto?.userId===f.user.userId && 
                            <Button type='submit' className='p-1 m-2' onClick={(event)=>handleDelete(f.feedbackId)}>Delete</Button>     
                          } 
                        </Card.Body> )                                                                                         
                    })              
                }

                {
                  otherUserFeedback &&  otherUserFeedback.map((f) => {
                    return(
                        <Card.Body key={f.feedbackId} md={4} className='mt-2' >
                            <div><h3>{ f.user.name }</h3>{ratingStar(f.ratings)}</div>
                            <div>{f.review}</div>
                        </Card.Body> )                                                                                         
                    })              
                }
              
            </Card>
          
            </Container>
        )
}

  return (
    <>
    {!currentUserFeedback.length>0 && <FeedbackForm productId={productId}/>}

    {feedback.length>0 && <div>{feedbackdetails()}</div>}

    {operEditFeedbackModal()}
    
    </>
  )
}

export default FeedbackOfproduct