import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductService from '../../Services/Product.service'
import { toast } from 'react-toastify'
import { Badge, Button, Container, Col, Card, Row} from 'react-bootstrap'
import ShowHtml from '../../Components/ShowHtml'
import defaultProductImage from '../../assets/default-product-image.png'
import CartContext from '../../Context/cart.context'
import SingleProductCard from '../../Components/Users/SingleProductCard'
import FeedbackViewForStore from '../../Components/FeedbackViewForStore'

const UserProductView = () => {

  const {productId,categoryId}=useParams()
  const {addItemToCart}=useContext(CartContext)
  const [product,setProduct]=useState(undefined)
  const [clicked,setClicked]=useState(false)
  const [clicked1,setClicked1]=useState(false)
  const [recomendation,setRecomendation]=useState(undefined)

  useEffect(()=>{
    loadUser(productId)
    loadRecomendationProduct(categoryId)
  },[productId,categoryId])

  const loadRecomendationProduct=(categoryId)=>{
    ProductService.getAllProductsOfCategory(categoryId,0,7,'title','desc').then((res)=>{
        console.log(res)
        const setRecomendationList=res.content.filter((rs)=>{
            return rs.productId!==productId
        })
        setRecomendation({content:setRecomendationList})
      }).catch((error)=>{
          console.log(error)
          toast.error("Couldn't fetch the Products of this Category...")
      })
  }

  const loadUser=(productId)=>{
    ProductService.getProductById(productId).then((res)=>{
        setProduct(res)
        console.log(res)
    }).catch((error)=>{
      console.log(error)
      toast.error("Products couldn't fetch!!!")
    })
  }

  //Add item to Cart function
  const handleAddItem=(productId,quantity)=>{
     addItemToCart(productId,quantity)
  }

  //Recomendation view
  const recomendationView=()=>{
    return recomendation && (
        <Container fluid>
                <Row>
                    {
                        recomendation.content.map((p) => (                      
                            <Col key={p.productId} md={4} >                              
                                <SingleProductCard product={p} />
                            </Col>))
                    }
                </Row>
            </Container>
     )
  }

  //Product view After Clicking View Product
  const productView=()=>{
       return(
        <Container className='py-4'>
          <Row>
            <Col>
<Card className='mt-4 border border-0 shadow-sm'>
    <Card.Body>
        <Container className=' my-4'>
            <Row>
                <Col>
                    <img
                        style={{ width: " 500px " }}
                        src={product.productImgName} alt=""
                        onError={(event) => {
                            event.currentTarget.setAttribute('src', defaultProductImage)
                        }}/>
                </Col>
                <Col>
                    <h3>{product.title}</h3>
                    <p className='text-muted'>Sort description <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, velit?</span> </p>
                    <Badge pill bg='info'>{product.category?.title}</Badge>
                    <Badge className='ms-2' pill bg={product.stock ? 'success' : 'danger'}>{product.stock ? 'In Stock' : " Out of Stock"}</Badge>
                    <Container className='text-center'>
                        <b><span className='h1 text-muted'><s>₹{product.price}</s></span></b>
                        <b><span className='h2  ms-2'>₹{product.discountedPrice}</span></b>
                    </Container>
                    <Container className='d-grid mt-4'>
                        <Button disabled={!product.stock}  variant='primary' size={'sm'}
                         onClick={event=>{handleAddItem(product.productId,1)}}  
                        >Add to Cart</Button>
                        <Button as={Link} to='/userStore' className='mt-2' variant='info' size={'sm'}>Go to Store</Button>
                    </Container>
                </Col>
            </Row>
        </Container>
        <div>
           {
                clicked ?  <div className="mt-5">
                             <ShowHtml htmlText={product.description}/>
                             <Link type='button' onClick={(event)=>setClicked(false)}>See less</Link>
                            </div> : 
                            <Link type='button' onClick={(event)=>setClicked(true)}>See Product Details</Link>
           } 
        </div>
           {
                clicked1 ? <div className="mt-3">
                           <FeedbackViewForStore productId={productId}/>
                           <Link type='button' onClick={(event)=>setClicked1(false)}>See less</Link>
                           </div> : 
                           <Link type='button' onClick={(event)=>setClicked1(true)}>See Product Reviews</Link>
           }

    </Card.Body>

</Card>

</Col>
    {recomendation && recomendationView()}
               </Row>     

        </Container>
       )
  }

  return (
    <div>
      {product && productView()}
    </div>
  )
}

export default UserProductView