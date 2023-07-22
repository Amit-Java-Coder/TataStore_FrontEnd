import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { FaUserSecret } from 'react-icons/fa'
import { MdOutlineCategory, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { BsBorderStyle } from 'react-icons/bs'
import DashBoardCardView from '../../Components/DashBoardCardView'
import { Link } from 'react-router-dom'
import ProductService from '../../Services/Product.service'
import { toast } from 'react-toastify'
import CategoryService from '../../Services/Category.service'
import UserSevice from '../../Services/User.sevice'
import OrderService from '../../Services/Order.service'

const AdminHome = () => {

 let [totalProducts,setTotalPoducts]=useState(0)
 let [totalCategories,setTotalCategories]=useState(0)
 let [totalUsers,setTotalUsers]=useState(0)
 let [totalOrders,setTotalOrders]=useState(0)
 useEffect(()=>{
     ProductService.getAllProducts(0,1000,'addedDate','desc').then((res)=>{
       setTotalPoducts=res.content.length
     }).catch((error)=>{
        console.log(error)
     })

     CategoryService.viewCategory().then((res)=>{
        setTotalCategories=res.length
     }).catch((error)=>{
        console.log(error)
     })

     UserSevice.getAllUsers(0,10,"name","asc").then((res)=>{
        setTotalUsers=res.length
     }).catch((error)=>{
        console.log(error)
     })

     OrderService.getAllOrders(0,10,"orderedDate","desc").then((res)=>{
        setTotalOrders=res.length
     }).catch((error)=>{
        console.log(error)
     })
 },[])

const homeView=()=>{
    return (
        <Container>
        <Row>
            <Col md={{span: 6,offset: 3}}>
                <Card className="shadow-sm">
                    <Card.Body className="text-center">
                        <h3 className="text-center">Welcome to admin Dashboard</h3>
                        <p className="text-muted">Customize dashboard for admin , to add categories, to add  products, to view categories, to view products, manage orders, manager users and much more.</p>
                        <p>Start managing products</p>
                        <Container className="d-grid gap-3">
                            <Button as={Link} to={'/admin/view-categories'} className="" variant="outline-secondary">Start Managing Categories</Button>
                            <Button as={Link} to={'/admin/view-products'} className="" variant="outline-secondary">Start Managing Products</Button>
                            <Button as={Link} to={'/admin/view-users'} className="" variant="outline-secondary">Start Managing Users</Button>
                            <Button as={Link} to={'/admin/orders'} className="" variant="outline-secondary">Start Managing Orders</Button>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    
        <Row className="mt-5">
            <Col md={6}>
                <DashBoardCardView
                    icon={<MdOutlineProductionQuantityLimits size={50} />}
                    text={'Number of Products'}
                    text1={ totalProducts && totalProducts }/>
            </Col>
    
            <Col md={6}>
                <DashBoardCardView
                    icon={<MdOutlineCategory size={50} />}
                    text={'Number of Categories'}
                    text1={0}/>
            </Col>
    
            <Col md={6} className="mt-3">
                <DashBoardCardView
                    icon={<BsBorderStyle size={50} />}
                    text={'Number of Orders'}
                    text1={4545}/>
            </Col>
    
            <Col md={6} className="mt-3">
                <DashBoardCardView
                    icon={<FaUserSecret size={50} />}
                    text={'Number of Users'}
                    text1={100}/>
            </Col>
        </Row>
    </Container>
      )
}
   return(
        <>
           {homeView()}
        </>
   )
  
}

export default AdminHome