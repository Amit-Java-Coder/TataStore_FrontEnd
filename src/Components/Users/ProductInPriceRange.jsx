import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ProductService from '../../Services/Product.service'
import { Card, Container, ListGroup } from 'react-bootstrap'
import { Input } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ProductInPriceRange = ({products}) => {

  const priceArray= products && products.content.map((p)=>p.discountedPrice) 
  const maxPrice=(Math.max.apply(Math,priceArray))
  
  console.log(maxPrice)
  const a=0
  const b=1000
  const c=10000
  const d=30000

  return (
    <Container className='mt-3 text-center'>
       <h4>Price</h4>
       <ListGroup  variant='flush'>                  
              <ListGroup.Item as={Link} to={`/product/${a}/${b}`}>
                  ₹0-1000
              </ListGroup.Item>  
              <ListGroup.Item as={Link} to={`/product/${b}/${c}`}>
                  ₹1000-10,000
              </ListGroup.Item> 
              <ListGroup.Item as={Link} to={`/product/${c}/${d}`}>
                  Above ₹10,000
              </ListGroup.Item> 
      </ListGroup>
    </Container>
  )
}
export default ProductInPriceRange