import React, { useContext, useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import defaultProductImage from '../../assets/default-product-image.png'
import CartContext from '../../Context/cart.context'

const SingleCartItemView = ({item}) => {

  const {cart,setCart,addItemToCart,removeItemFormCart,loadUserCart}=useContext(CartContext)
  


  return (
    <Card className='shadow-sm mb-3 ' >
    <Card.Body>
        <Row>
            <Col md={1} className="d-flex align-items-center justify-content-center">
                <img
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain'
                    }}
                    onError={event => {
                        event.currentTarget.setAttribute('src', defaultProductImage)
                    }}
                    src={item.product.productImgName} alt="" />

            </Col>
            <Col md={9}>
                <h5>{item.product.title}</h5>
                <p className='text-muted'><span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur, dolor.</span></p>
                <Row>
                    <Col>
                        <p > <b>{item.quantity}</b> <span className='text-muted'>Quantity</span></p>
                    </Col>
                    <Col>
                        <p > <span className='text-muted'>Price </span> <b> ₹{item.product.discountedPrice}</b> </p>
                    </Col>
                    <Col>
                        <p > <span className='text-muted'>Total Price </span> <b> ₹{item.totalPrice}</b> </p>
                    </Col>
                </Row>
            </Col>
            <Col md={2} className="d-flex align-items-center justify-content-center">
                <div className='w-100' >
                    <div className='d-grid'>
                        <Button  variant='danger' className='' size="sm"
                                onClick={(event)=>{removeItemFormCart(item.cartItemId)}}>Remove</Button>
                    </div>
                    <div className='mt-2'>
                        <Row>
                            <Col className='d-grid'>
                                <Button  className='' variant='info' size="sm"
                                         onClick={event => {
                                           if(item.quantity>1){
                                            addItemToCart(item.product.productId,2)
                                           }else{
                                            removeItemFormCart(item.cartItemId)
                                           }
                                    }}>-</Button>
                            </Col>
                            <Col className='d-grid'>
                                <Button className='' variant='success' size="sm"
                                           onClick={event => {
                                           addItemToCart(item.product.productId,1)
                                           }}>+</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    </Card.Body>
</Card>
  )
}

export default SingleCartItemView