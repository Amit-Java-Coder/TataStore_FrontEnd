import React from 'react'
import { useEffect } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SingleOrderView = ({order,openViewOrderModal,openEditOrderModal,deleteOrder}) => {

    const formatDate=(time)=>{
        return new Date(time).toLocaleString()
    }

  return (
    <Card className="border border-o shadow-sm mb-5" >
    <Card.Body>
        <Row>
            <Col>
                <b>Order Id: </b>{order.orderId}
            </Col>
            <Col>
            <b>Ordered By: </b><Link className="text-muted" to={`/users/profile/${order.user.userId}`}>
                {order.user.name}</Link>
            </Col>


        </Row>
        <Row className="mt-3">
            <Col>
                <Table bordered striped className={order.paymentStatus === 'PAID' ? 'table-success' : 'table-danger'}>
                    <tbody>
                        <tr>
                            <td>
                                Billing Name
                            </td>
                            <td className="fw-bold">
                                {order.billingName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Billing Phone
                            </td>
                            <td className="fw-bold">
                                {order.billingPhone}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Items
                            </td>
                            <td className="fw-bold">
                                {order.items.length? order.items.length : "" }
                            </td>
                        </tr>

                        <tr className={order.paymentStatus === 'NOTPAID' ? 'table-danger' : 'table-success'}>
                            <td>
                                Payment Status
                            </td>
                            <td className="fw-bold">
                                {order.paymentStatus}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Order Status
                            </td>
                            <td className="fw-bold">
                                {order.orderStatus}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Ordered Date
                            </td>
                            <td className="fw-bold">
                                {formatDate(order.orderedDate)}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    

        <Container className="text-end">
            {openEditOrderModal && 
            <Button onClick={(event) => openEditOrderModal(event, order)} variant="primary" size='sm' className="me-2">
                Update
            </Button>} 
   

            <Button onClick={(event)=>openViewOrderModal(event,order)}size="sm" variant="info" className="me-2">
                 Order Details
            </Button>


            <Button onClick={(event)=>deleteOrder(event,order)}size="sm" variant="danger" className="me-2">
                 Cancel
            </Button>


            {(!openEditOrderModal && order.paymentStatus === 'NOTPAID') && 
            <Button onClick={(event) => {}}variant="success" size='sm' className="me-2">
                Pay to Complete Order
            </Button>}
        </Container>


    </Card.Body>
</Card >
  )
}

export default SingleOrderView