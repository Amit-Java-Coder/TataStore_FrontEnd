import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductService from '../../Services/Product.service'
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap'
import SingleProductCard from '../../Components/Users/SingleProductCard'
import UserCategory from '../../Components/Users/UserCategory'
import { toast } from 'react-toastify'

const UserCategoryView = () => {

  const [products,setProducts]=useState(null)
  const {categoryId,categoryTitle}=useParams()

  useEffect(()=>{
    ProductService.getAllProductsOfCategory(categoryId,0,1000,'title','desc').then((res)=>{
        console.log(res)
        setProducts(res)
      }).catch((error)=>{
          console.log(error)
          toast.error("Couldn't fetch the Products of this Category...")
      })
  },[categoryId])


  const productsView=()=>{
    return products && (
      <Container fluid>
              <Row>
                  {
                      products.content.map((p) => (
                          <Col key={p.productId} md={4} >
                              <SingleProductCard product={p} />
                          </Col>))
                  }
              </Row>
          </Container>
   )
  }

  return (
      products && (
        <>
            <Container fluid className='px-5 pt-5'>
                <Row>
                    <Container >
                        <Breadcrumb className='mx-5'>
                            <Breadcrumb.Item >Store</Breadcrumb.Item>
                            <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Container>
                    <Col md={2}>
                        <UserCategory/>
                    </Col>
                    <Col md={10}>
                    {products.content.length > 0 ? productsView() : <h3 className='mt-5 text-center'>No items in this category</h3>}
                    </Col>
                </Row>
            </Container>
        </>
    )
  )
}

export default UserCategoryView