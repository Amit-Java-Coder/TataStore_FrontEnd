import React from 'react'
import ProductService from '../../Services/Product.service'
import { useParams } from 'react-router-dom'
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap'
import UserCategory from '../../Components/Users/UserCategory'
import ProductInPriceRange from '../../Components/Users/ProductInPriceRange'
import SingleProductCard from '../../Components/Users/SingleProductCard'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react'

const PriceFilterView = () => {

    const [products,setProducts]=useState(undefined)
    const {price1,price2}= useParams()

    useEffect(()=>{
        loadProducts(0, 1000, 'addedDate', 'desc', price1, price2)
    },[price1,price2])

    const loadProducts=(pageNumber, pageSize, sortBy, sortDir, price1, price2)=>{
        ProductService.getAllProducts(pageNumber, pageSize, sortBy, sortDir).then((res)=>{

            const filteredProduct=res.content.filter((fp)=>{
                return(fp.discountedPrice>price1 && fp.discountedPrice<price2)              
            })
            setProducts(filteredProduct)
            console.log(filteredProduct)
        }).catch((error)=>{
            console.log(error)
            toast.error("Couldn't fetch Products!!!")
        })
    }

    //Single Product View 
    const productView=()=>{
         return products && (
            <Container fluid>
                    <Row>
                        {
                            products.map(p => (
                                <Col key={p.productId} md={4} >
                                    <SingleProductCard product={p} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
         )
    }
    


  return (
    <Container fluid className='px-3 pt-2'> 
        <Row>
            <Col md={2} className='position-static'>
                 <UserCategory/>
                <Row>
                <ProductInPriceRange productss={products}/>
                </Row>
                 
            </Col>
            <Col md={10}>

                {productView()}
            </Col>
        </Row>
    </Container>
  )
}

export default PriceFilterView