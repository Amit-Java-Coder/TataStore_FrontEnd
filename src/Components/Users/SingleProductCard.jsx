import React from 'react'
import { Badge, Button, Card, Container } from 'react-bootstrap'
import defaultProductImage from '../../assets/default-product-image.png'
import { Link } from 'react-router-dom'

const SingleProductCard = ({product}) => {
  return (
    <Card className='m-1 shadow-sm'>
    <Card.Body>
        <Container fluid className='text-center'>
            <img className='fluid'
                src={product.productImgName}
                style={{
                    width : '300px',
                    height :'200px',
                    marginbottom : '10px',
                    objectfit : 'contain',
                    }}
                onError={event => {
                    event.currentTarget.setAttribute('src', defaultProductImage)
                }}
                alt="" />
        </Container>
        <h6>{product.title}</h6>
        <p className='text-muted'>Sort description <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, velit?</span> </p>
        <Badge pill bg='info'>{product.category?.title}</Badge>
        <Badge className='ms-2' pill bg={product.stock ? 'success' : 'danger'}>{product.stock ? 'In Stock' : " Out of Stock"}</Badge>
        <Container className='text-end'>
            <b><span className='h3 text-muted'><s>₹{product.price}</s></span></b>
            <b><span className='h4  ms-2'>₹{product.discountedPrice}</span></b>
        </Container>
        <Container className='d-grid mt-4'>
            <Button as={Link} to={`/products/${product.productId}/${product.category.categoryId}`} variant='primary' size={'sm'}>View Product</Button>
        </Container>
    </Card.Body>
</Card>
  )
}

export default SingleProductCard