import React, { useState } from 'react'
import Base from '../Components/Base'
import { Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import ProductService from '../Services/Product.service'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Index = () => {

  const [products, setProducts] = useState([])
  useEffect(()=>{
     loadAllProducts(0,1000,'addedDate','desc')
  },[])

  const loadAllProducts=(pageNumber, pageSize, sortBy, sortDir)=>{
     ProductService.getAllProducts(pageNumber, pageSize, sortBy, sortDir).then((res)=>{
        setProducts(res) 
     }).catch((error)=>{
      console.log(error)
     })
  }



    return (
      <Base description='Welcome to Amazon,we provide best products in reasonable price' 
            title='Shop what you need'
            buttonEnabled={true}
            buttonText='Start Shopping'
            buttonType='primary'
            buttonLink="/userStore">
      <Container>
    <Row>
    
  
    {products.content?.map(product=>{
      return (
        <Col key={product.productId}>
             <Card className='m-1 shadow-sm'>
             <Card.Body>
                 <Container fluid className='text-center'>
                     <img className='fluid'
                         src={product.productImgName}
                         style={{
                             width : '300px',
                             height :'200px',
                             marginbottom : '10px',
                             objectfit : 'contain',
                             }}
                         alt="" />
                 </Container>
                 <h6>{product.title}</h6>
                 <p className='text-muted'>Sort description <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, velit?</span> </p>
                 <Badge pill bg='info'>{product.category?.title}</Badge>
                 <Badge className='ms-2' pill bg={product.stock ? 'success' : 'danger'}>{product.stock ? 'In Stock' : " Out of Stock"}</Badge>
                 <Container className='text-end'>
                     <b><span className='h3 text-muted'><s>₹{product.price}</s></span></b>
                     <b><span className='h4  ms-2'>₹{product.discountedPrice}</span></b>
                 </Container>
                 <Container className='d-grid mt-4'>
                 <Button as={Link} to={`/homeview/${product.productId}`} variant='primary' size={'sm'}>View Product</Button>
                 </Container>
             </Card.Body>
         </Card>
         </Col>
      )
    })
  }
    </Row>
  </Container>
  
  
  
  <Container>
        <Card>
          <Card.Body>
            <div className="text-center">
              <h3>Contact us</h3>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      </Base>
    )
 
}

export default Index