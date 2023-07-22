import React, { useEffect, useState } from 'react'
import OrderService from '../../Services/Order.service'
import { toast } from 'react-toastify'
import { Badge, Button, Card, Col, Container, Form, ListGroup, Modal, Row, Table } from 'react-bootstrap'
import SingleOrderView from '../../Components/SingleOrderView'

const AdminOrder = () => {

  const [ordersData,setOrdersData]=useState(undefined)
  const [selectedOrder, setSelectedOrder] = useState(undefined)

  const formatDate=(time)=>{
    return new Date(time).toLocaleDateString()
  }

  //For Order modal-view
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  //For Order modal-update-view
  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = () => setUpdateShow(true);

  useEffect(()=>{
    getOrders()
  },[])

  //Fetch all Orders
  const getOrders=()=>{
       OrderService.getAllOrders(0,5,'orderedDate','desc').then((res)=>{
        console.log(res)
        setOrdersData(res)
        //toast.success("Orders details!!!")
      }).catch((error)=>{
        console.log(error)
        toast.error("Couldn't fetch Order details!!!")
      })
  }



  //View Order details function
  const openViewOrderModal=(event,order)=>{
    console.log(event)
    console.log(order)
    setSelectedOrder(order)
    handleShow(true)
  }


  //OnSubmit Updated Oreder
  const handleOrderUpdate=()=>{
   if(selectedOrder.billingAddress==="" || selectedOrder.billingAddress===undefined){
      toast.error("BillingAddress is required!!!")
      return
   }
   if(selectedOrder.billingName==="" || selectedOrder.billingName===undefined){
      toast.error("BillingName is required!!!")
      return
   }
   if(selectedOrder.billingPhone==="" || selectedOrder.billingPhone===undefined){
      toast.error("BillingPhone is required!!!")
      return
   }
   if(selectedOrder.paymentStatus==="" || selectedOrder.paymentStatus===undefined){
      toast.error("PaymentStatus is required!!!")
      return
   }
   if(selectedOrder.orderStatus==="" || selectedOrder.orderStatus===undefined){
      toast.error("OrderStatus is required!!!")
      return
   }

    OrderService.updateOrder(selectedOrder,selectedOrder.orderId).then((res)=>{
      console.log(res)
      toast.success("Order datails updated...")

      const newOrderList = ordersData.content.map(item => {
        if (item.orderId === selectedOrder.orderId) {
            return res
        }
        else return item
    })

    setOrdersData({
        ...ordersData,
        content: newOrderList
    })

    }).catch((error)=>{
      console.log(error)
      toast.error("Order details couldn't updated!!!")
    })
  }



  //view Order modal
  const viewOrderModal = () => {
        return selectedOrder && (
            <>
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
                                                {selectedOrder.items.length ? selectedOrder.items.length : ""}
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
                                                {selectedOrder.deliverDate ? formatDate(selectedOrder.deliverDate) : ''}
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

                                        <ListGroup>{
                                                selectedOrder.items.map((item) => (
                                                    <ListGroup.Item action className="mt-3" key={item.orderItemId}>
                                                        <Row>
                                                            <Col md={1} className=" d-flex align-items-center">
                                                                <img
                                                                  style={{width: '40px'}}
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
                                                    </ListGroup.Item>))}
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
            </>
        );
  }


  //Edit Order details function
  const orderUpdate=()=>{
    return selectedOrder && (
      <>
          <Modal animation={false} size={'lg'} show={updateShow} onHide={handleUpdateClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Update Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                  <Card className="border border-0 shadow-sm">
                      <Card.Body>
                          <Form onSubmit={handleOrderUpdate}>


                              <Form.Group>
                                  <Form.Label>Billing Name</Form.Label>
                                  <Form.Control type='text'
                                      value={selectedOrder.billingName}
                                      onChange={(event) => {
                                              setSelectedOrder({
                                                  ...selectedOrder,
                                                  billingName: event.target.value
                                              })}}/>
                              </Form.Group>


                              <Form.Group className="mt-3">
                                  <Form.Label>Billing Phone</Form.Label>
                                  <Form.Control type='text'
                                      value={selectedOrder.billingPhone}
                                      onChange={(event) => {
                                              setSelectedOrder({
                                                  ...selectedOrder,
                                                  billingPhone: event.target.value
                                              })}}/>
                              </Form.Group>


                              <Form.Group className="mt-3">
                                  <Form.Label>Billing Address</Form.Label>
                                  <Form.Control
                                      as={'textarea'}
                                      type='text'
                                      rows={5}
                                      value={selectedOrder.billingAddress}
                                      onChange={(event) => {
                                              setSelectedOrder({
                                                  ...selectedOrder,
                                                  billingAddress: event.target.value
                                              })}}/>
                              </Form.Group>


                              <Form.Group className="mt-3">
                                  <Form.Label>Payment Status</Form.Label>
                                  <Form.Select
                                      onChange={(event) => {
                                          setSelectedOrder({
                                              ...selectedOrder,
                                              paymentStatus: event.target.value
                                          })}}>
                                      <option defaultValue={selectedOrder.paymentStatus === 'NOTPAID'} value="NOTPAID">NOT PAID</option>
                                      <option defaultValue={selectedOrder.paymentStatus === 'PAID'} value="PAID">PAID</option>
                                  </Form.Select>
                              </Form.Group>


                              <Form.Group className="mt-3">
                                  <Form.Label>Order Status</Form.Label>
                                  <Form.Select
                                      onChange={(event) => {
                                          setSelectedOrder({
                                              ...selectedOrder,
                                              orderStatus: event.target.value
                                          })}}>
                                      <option value="PENDING">PENDING</option>
                                      <option value="DISPATCHED">DISPATCHED</option>
                                      <option value="ONWAY">ONWAY</option>
                                      <option value="DELIVERED">DELIVERED</option>
                                  </Form.Select>
                              </Form.Group>


                              <Form.Group className="mt-3">
                                  <Form.Label>Select Date</Form.Label>
                                  <Form.Control type="text"
                                      onChange={event => {
                                          setSelectedOrder({
                                              ...selectedOrder,
                                              deliveredDate: event.target.value
                                          })}}/>
                                  <p className="text-muted">Format : YYYY-MM-dd</p>
                              </Form.Group>

                              <Container className="text-center">
                                  <Button type="submit" variant="primary">
                                      Save Changes
                                  </Button>
                              </Container>
                          </Form>
                      </Card.Body>
                  </Card>
              </Modal.Body>

              <Modal.Footer>
                  <Button variant="secondary" onClick={handleUpdateClose}>
                      Close
                  </Button>
              </Modal.Footer>
          </Modal>
      </>
  )
  }


  //Edit Order Modal
  const openEditOrderModal=(event,order)=>{
    console.log(order)
    setSelectedOrder(order)
    handleUpdateShow()
  }


  //Delete Order
  const deleteSelectOrder=(event,selectedOrder)=>{
      OrderService.deleteOrder(selectedOrder.orderId).then((res)=>{
        toast.success("Order canceled...")
        if(ordersData.content){
            const newOrderList = ordersData.content.map((item) => {
                if (item.orderId !== selectedOrder.orderId){ 
                    return item
                }
            })       
            setOrdersData({
                ...ordersData,
                content: newOrderList
            })
        }else{
        setOrdersData(null)
        }
      }).catch((error)=>{
        console.log(error)
        toast.error("Order couldn't cancel!!!")
      })
  }

  const ordersView = () => {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <h3 className="my-4 mx-2">All Orders are here </h3>
                    {
                        ordersData.data.content.map(o => {
                            return (
                                <SingleOrderView
                                    openViewOrderModal={openViewOrderModal}
                                    openEditOrderModal={openEditOrderModal}
                                    deleteOrder={deleteSelectOrder}
                                    key={o.orderId}
                                    order={o}/>
                            )
                        })
                    }
            </Card.Body>
        </Card>
    )
}



  return (
    <>
        <Container>
                <Row>
                    <Col>
                        {ordersData && ordersView()}
                        {viewOrderModal()}
                        {orderUpdate()}
                    </Col>
                </Row>
        </Container>
    </>
  )
}

export default AdminOrder