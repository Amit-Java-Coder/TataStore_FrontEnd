import React from 'react'
import { useEffect } from 'react'
import FeedbackService from '../Services/Feedback.service'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { useState } from 'react'

const FeedbackViewForStore = ({productId}) => {

    const [feedback,setFeedback]=useState([])

    useEffect(()=>{
        try{
        getAllFeedbackOfSingleProduct(productId)
        }catch(error){
            //console.log(error)
        }
    },[productId])
    
    //Get feedback of Products
    const getAllFeedbackOfSingleProduct=(productId)=>{
            FeedbackService.getAllFeedbackOfSingleProduct(productId).then((res)=>{
                console.log(res)
                setFeedback(res)
              }).catch((error)=>{
                //console.log(error)
                //toast.error("Feedback couldn't achieve!!!")
              })
          }

//Get Total Ratings of Product
const avgRatings=()=>{
    let totalRating=0.0
    let avgTotalRatings=0.0
    feedback.map((r)=>{
        return totalRating+=r.ratings
    })
    avgTotalRatings=totalRating/feedback.length
    return Math.round(avgTotalRatings)
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
        return feedback  &&(
            
            <Container fluid>
            
            <Row>
                <Col>
                      <span style={{ fontSize: 30 }} className='mt-2'>Reviews</span>
                      <Badge className='m-2'>
                           <span style={{ fontSize: 15 }}>{avgRatings()}</span> 
                            <AiFillStar className='m-1' style={{ fontSize: 15 }}/>
                      </Badge>
                </Col>
            </Row>
            <Card  className='mt-1'>
                {
                    feedback.map(f => (
                        <Card.Body key={f.feedbackId} md={4} className='mt-1' >
                            <div><h4>{ f.user.name }</h4>{ratingStar(f.ratings) }</div>
                            <div>{f.review}</div>
                        </Card.Body>                                                                      
                    ))       
                }              
            </Card>
          
            </Container>
        )
}
  return (
    feedback.length>0 ? (
        <div>
            {   
                feedbackdetails()        
            }
        </div>
        ) : <h5>No Reviews</h5>
  )
}

export default FeedbackViewForStore