import React, { useContext, useEffect, useState } from 'react'
import OrderService from '../../Services/Order.service'
import { toast } from 'react-toastify'
import UserContext from '../../Context/user.context'
import { Alert, Badge, Button, Card, Col, ListGroup, Modal, Row, Table } from 'react-bootstrap'
import SingleOrderView from '../../Components/SingleOrderView'

const Order = () => {

  const formatDate=(time)=>{
    return new Date(time).toLocaleDateString()
  }

  const {userData,isLogin}=useContext(UserContext)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders,setOrders]=useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    //View Order Modal function
    const openViewOrderModal = (event, order) => {
        console.log("view order button clicked ")
        console.log(event)
        console.log(order)
        setSelectedOrder(order)
        handleShow(true)
    }

   //Cancel Order
   const deleteSelectOrder=(event,selectedOrder)=>{
    OrderService.deleteOrder(selectedOrder.orderId).then((res)=>{
      toast.success("Order canceled...")
    }).catch((error)=>{
      console.log(error)
      toast.error("Order couldn't cancel!!!")
    })
}

useEffect(()=>{
    if(isLogin){
    loadOrderOfUsers()
    }
  },[isLogin])   

  //Get all User function
  const loadOrderOfUsers=()=>{
        OrderService.getOrderOfUser(userData.dto.userId).then((res)=>{
           console.log(res)
           setOrders(res)
        }).catch((error)=>{
           console.log(error)
           toast.error("Couldn't fetch order!!!")
        })
  }

  //OrderView function
  const orderView=()=>{
       return(
        <Card className="shadow-sm mt-2">
          <Card.Body>
            <h3 className="my-4 mx-2">Your Previous Orders</h3>
            {
                orders.map(o => {
                    return (
                        <SingleOrderView key={o.orderId} 
                                         order={o} 
                                         openViewOrderModal={openViewOrderModal}
                                         deleteOrder={deleteSelectOrder}/>
                    )
                })
            }
            {
                orders.length <= 0 && <Alert className="border border-0 text-center" variant="dark" >
                    <h3>No Items in Your order</h3>
                </Alert>
            }
        </Card.Body>
      </Card>
       )
  }


  //view order modal
  const viewOrderModal = () => {
        return selectedOrder && (
                <Modal size="lg" animation={false} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>  <h3>Order details</h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <b>Order Id: </b>{selectedOrder.orderId}
                            </Col>
                            <Col>
                                <b>Billing Name: </b>{selectedOrder.billingName}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Table bordered striped>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Billing Phone
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.billingPhone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Items
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.items.length}
                                            </td>
                                        </tr>

                                        <tr className={selectedOrder.paymentStatus === 'NOTPAID' ? 'table-danger' : 'table-success'}>
                                            <td>
                                                Payment Status
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.paymentStatus}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Order Status
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.orderStatus}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Ordered Date
                                            </td>
                                            <td className="fw-bold">
                                                {formatDate(selectedOrder.orderedDate)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Billing Address
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.billingAddress}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                DeliveredDate
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.deliveredDate ? formatDate(selectedOrder.deliveredDate) : ''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Order Amount
                                            </td>
                                            <td className="fw-bold">
                                                ₹ {selectedOrder.orderAmount}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Card>
                                    <Card.Body>
                                        <h3>Order Items</h3>
                                        <ListGroup>
                                            {
                                                selectedOrder.items.map((item) => (
                                                    <ListGroup.Item action className="mt-3" key={item.orderItemId}>
                                                        <Row>
                                                            <Col md={1} className=" d-flex align-items-center">
                                                                <img
                                                                    style={{
                                                                        width: '40px'
                                                                    }}
                                                                    src={item.product.productImgName}
                                                                    alt="" />
                                                            </Col>
                                                            <Col md={11}>
                                                                <h5>{item.product.title}</h5>
                                                                <Badge pill size={'lg'}>Quantity: {item.quantity}</Badge>
                                                                <Badge bg="success" pill className="ms-2" size={'lg'}>Amount for This Item :  ₹  {item.totalPrice}</Badge>
                                                                <p className="text-muted mt-3">Product Id : {item.product.productId}</p>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                       </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        )
  }

  return (
    <>
      {orderView()}
      {viewOrderModal()}
    </>
  )
}

export default Order