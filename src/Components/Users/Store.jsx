import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import ProductService from '../../Services/Product.service'
import { toast } from 'react-toastify'
import SingleProductCard from './SingleProductCard'
import { Link } from 'react-router-dom'
import UserCategory from './UserCategory'
import { AiOutlineSearch } from 'react-icons/ai'
import ProductInPriceRange from './ProductInPriceRange'

const Store = () => {

    const [products,setProducts]=useState(undefined)
    const [searchQuery, setSearchQuery] = useState('')
    const [previousProducts, setPreviousProducts] = useState(undefined)

    useEffect(()=>{
        loadProducts(0,1000,'addedDate','desc')
    },[])

    const loadProducts=(pageNumber, pageSize, sortBy, sortDir)=>{
        ProductService.getAllLiveProducts(pageNumber, pageSize, sortBy, sortDir).then((res)=>{
            setProducts(res)
            console.log(res)
        }).catch((error)=>{
            console.log(error)
            toast.error("Couldn't fetch Products!!!")
        })
    }


    //Search Product
    const searchProducts=()=>{
    if(searchQuery==="" || searchQuery===undefined){
      return
    }
    else{
      ProductService.searchProducts(searchQuery).then((res)=>{
        if(res.content.length<=0){
          toast.info("No result found!!!")
        } else{
          setPreviousProducts(products)
          setProducts(res)
        }
      }).catch((error)=>{
        console.log(error)
        toast.error("Error in searching Products!!!")
      })
    }
}

    //Single Product View 
    const productView=()=>{
         return products && (
            <Container fluid>
                    <Row>
                        {
                            products.content.map(p => (
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
                        {/*<Breadcrumb className='mx-5'>
                            <Breadcrumb.Item>All Products</Breadcrumb.Item>
                         </Breadcrumb>*/}
            <Col md={2} className='position-static'>
                 <UserCategory/>
                <Row>
                <ProductInPriceRange products={products}/>
                </Row>
                 
            </Col>
            <Col md={9}>
                
                  <InputGroup className='px-3'>                     
                      <Form.Control type='text'
                                    placeholder="Enter product name"
                                    onChange={(event)=>{
                                      if (event.target.value === '') {
                                        if (previousProducts) {
                                            setProducts(previousProducts)
                                        }
                                      }
                                    setSearchQuery(event.target.value)}}
                                    value={searchQuery}/>
                      <Button variant="primary"
                              onClick={searchProducts}>Search</Button>
                  </InputGroup>

                {productView()}
            </Col>
        </Row>
    </Container>
  )
}

export default Store