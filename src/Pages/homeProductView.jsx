import React from 'react'
import {  Card, Col, Container, Row } from 'react-bootstrap'
import {  useParams } from 'react-router-dom'
import defaultProductImage from "../assets/default-product-image.png"
import { useEffect } from 'react'
import ProductService from '../Services/Product.service'
import { toast } from 'react-toastify'
import { useState } from 'react'
import FeedbackOfproduct from '../Components/FeedbackOfproduct'


const HomeProductView = () => {

  const {productId}=useParams()
  const [product, setProduct] = useState(undefined)
  useEffect(()=>{   
     loadProduct(productId) 
  },[productId])
    
    //Load all Products function
    const loadProduct=(productId)=>{
        ProductService.getProductById(productId).then((res)=>{
            setProduct(res)
            console.log(res)
        }).catch((error)=>{
          console.log(error)
          toast.error("Products couldn't fetch!!!")
        })
      }
    
    //Product view function
    const handleProductView=()=>{
        return(
          <>
          <Container className='py-4'>
            <Row>
              <Col>
              <Card className='mt-4 border border-0 shadow-sm'>
        <Card.Body>
            <Container className=' my-4'>
                <Row>
                    <Col>
                        <img
                            style={{ width: " 300px " }}
                            src={product.productImgName} alt=""
                            onError={(event) => {
                                event.currentTarget.setAttribute('src', defaultProductImage)
                            }}/>
                    </Col>
                    <Col>
                        <h3>{product.title}</h3>
                        <p className='text-muted'>Sort description <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, velit?</span> </p>
                        <Container className='text-center'>
                            <b><h4>Best deal available...</h4></b>
                            <b><span className='h1 text-muted'><s>₹{product.price}</s></span></b>
                            <b><span className='h2  ms-2'>₹{product.discountedPrice}</span></b>
                        </Container>
                      
                    </Col>
                </Row>
            </Container>
    
        </Card.Body>
    
    </Card>

                  <Card className='mt-2 border border-0 shadow-sm'>
                        <FeedbackOfproduct productId={productId}/> 
                  </Card>
                                  
            
              </Col>
            </Row>
          </Container>
    
          </>)         
      }

  return (
    <>
     {product && handleProductView()}
    </>
  )
}

export default HomeProductView

