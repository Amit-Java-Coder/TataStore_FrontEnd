import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../Context/cart.context'
import UserContext from '../Context/user.context'
import CartSevice from '../Services/Cart.sevice'
import { toast } from 'react-toastify'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import SingleCartItemView from '../Components/Users/SingleCartItemView'
import { Link } from 'react-router-dom'
import OrderService from '../Services/Order.service'

const Cart = () => {
  
  const {cart,setCart}=useContext(CartContext)
  const {userData,isLogin}=useContext(UserContext)
  const [orderPlacedClicked, setOrderPlacedClicked] = useState(false);

  const getTotalCartAmount = () => {
    let amount = 0;
    cart.items.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  }

  const [orderDetails, setOrderDetails] = useState({
    billingAddress: "",
    billingName: "",
    billingPhone: "",
    cartId: "",
    orderStatus: "",
    paymentStatus: "",
    userId: "",
  })

  //Order Product function
  const handleOrderCreation = () => {
      if (orderDetails.billingName === "") {
        toast.info("Billing name required", {
          position: "bottom-right",
        })
        return
      }
      if (orderDetails.billingPhone === "") {
        toast.info("Billing Phone required", {
          position: "bottom-right",
        })
        return
      }
      if (orderDetails.billingAddress === "") {
        toast.info("Billing Address required", {
          position: "bottom-right",})
        return
      }
  
      //set required other details
      orderDetails.cartId = cart.cartId;
      orderDetails.orderStatus = "PENDING";
      orderDetails.paymentStatus = "NOTPAID";
      orderDetails.userId = userData.dto.userId;
      console.log(orderDetails);
   
      OrderService.createOrder(orderDetails).then((res)=>{
        console.log(res)
        setCart({...cart,items: [],})
        toast.success("Order Placed...")
      }).catch((error)=>{
        console.log(error)
        toast.error("Something went wrong!!!")
      })
  }

  //Cart list view
  const cartView=()=>{
        return(
           <>
        <Card className="mt-3 shadow-sm">
          <Card.Body>
            <Row className="px-5">
              <Col>
                <h3>Cart</h3>
              </Col>
              <Col className="text-end">
                <h3>{cart.items.length} Items</h3>
              </Col>
            </Row>
            <Row className="px-5 mt-3">
              <Col>
                {cart.items.map((item) => (
                  <SingleCartItemView key={item.cartItemId} item={item} />
                ))}
              </Col>
            </Row>
            <Container className="px-5">
              <h3 className="text-end px-5">
                Total Amount : ₹ {getTotalCartAmount()}
              </h3>
            </Container>
            <Container className="text-center">
                <Button size="sm" onClick={(event)=>setOrderPlacedClicked(true)}>
                  Place Order
                </Button>
            </Container>
          </Card.Body>
        </Card>
           </> 
        )
  }

  //Order form view
  const orderFormView=()=>{
    return (
      <Form>
        <Form.Group className="mt-3">
          <Form.Label>Billing Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter here"
            value={orderDetails.billingName}
            onChange={(event) => {
              setOrderDetails({
                ...orderDetails,
                billingName: event.target.value,
              });
            }}
          />
        </Form.Group>
    

        <Form.Group className="mt-3">
          <Form.Label>Billing Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter here"
            value={orderDetails.billingPhone}
            onChange={(event) => {
              setOrderDetails({
                ...orderDetails,
                billingPhone: event.target.value,
              });
            }}
          />
        </Form.Group>
    

        <Form.Group className="mt-3">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control
            rows={6}
            as={"textarea"}
            placeholder="Enter here"
            value={orderDetails.billingAddress}
            onChange={(event) => {
              setOrderDetails({
                ...orderDetails,
                billingAddress: event.target.value,
              });
            }}
          />
        </Form.Group>

        <Container className="mt-3 text-center">
          <Button variant="success"  size="sm"
          onClick={(event) => {handleOrderCreation()}}>
            Create Order & Proceed to Pay
          </Button>
        </Container>
      </Form>
    )
  }

  return (
        <Container  fluid={orderPlacedClicked} className="px-5">
          <Row>
              <Col md={orderPlacedClicked ? 7 : 12}>{ cart &&(cart.items.length>0 ? cartView() : 

                (<Alert   variant="danger"className="mt-3 shadow-sm border border-0 text-center">
                  <h4>No items in the Cart.</h4>
                  <Button as={Link} to="/userStore" variant="">
                     <h5 className='text-decoration-underline'> Click here to add some Products...</h5>
                  </Button>
                </Alert>))}

                {isLogin && !cart &&(<Alert   variant="danger"className="mt-3 shadow-sm border border-0 text-center">
                  <h4>No items in the Cart.</h4>
                  <Button as={Link} to="/userStore" variant="">
                     <h5 className='text-decoration-underline'> Click here to add some Products...</h5>
                  </Button>
                </Alert>)}

                {!isLogin && (
                   <Alert variant="info" className="mt-3 shadow-sm border border-0 text-center">
                     <h3>You are not logged </h3>
                     <p>In order to get acces to your Cart do login first</p>
                   <Button as={Link} to="/login" variant="success">Login</Button>
                 </Alert>
                )}
              </Col>

              {
                orderPlacedClicked && 
                <Col>
                  <Card className="mt-3 shoadow-sm bg-dark text-white">
                    <Card.Body>
                      <h4>Fill the form to complete order</h4>
                      {orderFormView()}
                    </Card.Body>
                  </Card>
                </Col>
              }

          </Row>
        </Container>
  )
}

export default Cart