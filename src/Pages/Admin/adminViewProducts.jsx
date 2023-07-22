import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Container, Form, FormGroup,InputGroup,Pagination, Row, Table } from 'react-bootstrap'
import ProductService from '../../Services/Product.service'
import SingleProductView from '../../Components/Admin/SingleProductView'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'

import Swal from 'sweetalert2'
import CategoryService from '../../Services/Category.service';
import ShowHtml from '../../Components/ShowHtml';
import { Editor } from '@tinymce/tinymce-react';

const AdminViewProducts = () => {

useEffect(()=>{
    getProducts(0,10,'addedDate','asc')
 },[])


 useEffect(()=>{
  CategoryService.viewCategory().then(res=>{
   setCategories(res)
  }).catch((error)=>{
   console.log(error)
   toast.error("Couldnot set category of product...")
  })
},[])

const [previousProducts, setPreviousProducts] = useState(undefined)
const [products,setProducts]=useState(undefined)
const [currentProduct, setCurrentProduct] = useState(undefined)
const [categories, setCategories] = useState(undefined)
const [categoryChangeId,setCategoryChangeId]=useState("none")
const [searchQuery, setSearchQuery] = useState('')
const editorRef = useRef()


const [show, setShow] = useState(false);

//ModalView Product variables
const closeProductModalView = () => {
  setShow(false)
}
const openProductModalView = (product) => {
  console.log(product)
  setCurrentProduct(product)
  setShow(true)
}

//Update product variables
const [showEditModal, setShowEditModal] = useState(false)
const closeProductEditModalView=()=>{
  setShowEditModal(false)
}
const openEditProductModalView=(event,product)=>{
  setCurrentProduct(product)
  setShowEditModal(true)
}

  //Get all Products
  const getProducts=( pageNumber = 0,pageSize = 10,sortBy = "addedDate",sortDir = "asc")=>{
         ProductService.getAllProducts(pageNumber, pageSize, sortBy, sortDir).then(data=>{
             console.log(data)
             setProducts({
               ...data
             })
         }).catch(error => {
          console.log(error)
          toast.error("error in loading products")
      })
  }


  //Delete Products
  const deletePrdct=(productId)=>{
        
    //Before deleteing the category SweetAlert will ask for the confirmation...
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

      ProductService.deleteProduct(productId).then((res)=>{

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          const newProductArray = products.content.filter((p)=>{
            return p.productId !== productId
          })
          setProducts({...products,content:newProductArray})
          toast.success("Product deleted...")

        }).catch((error)=>{
          console.log(error)
          toast.error("Error in deleting Product")
        })
       
      }
    })
  }


  //Update Product
  const handleUpdateProduct=(event)=>{
    event.preventDefault()
    console.log(currentProduct)

    if (currentProduct.title === '') {
      toast.error("Title is required!!!")
      return
    }
    if (currentProduct.quantity === '') {
      toast.error("Quantity is required!!!")
      return
    }
    if (currentProduct.price === '') {
      toast.error("Price is required!!!")
      return
    }
    if (currentProduct.discountedPrice=== '' || currentProduct.price<currentProduct.discountedPrice) {
      toast.error("Enter a reasonable discounted Price!!!")
      return 
    }
    if ( categoryChangeId=== "none") {
      toast.error("Category needs to be selected!!!")
      return
    }
   
      ProductService.updateProduct(currentProduct,currentProduct.productId,categoryChangeId).then((res)=>{
      console.log(res)

         const newProductArray = products.content.map((p )=> {
          if (p.productId === currentProduct.productId){
              return res
          }
          return p
      })
  
      setProducts({
          ...products,
          content: newProductArray
      })

    toast.success("Details updated...")

      }).catch((error)=>{
        toast.error("Product couldn't update!!!")
        console.log(error)
      })

  }


  //Open EditModalProduct
  const openEditProductModal=()=>{
    return currentProduct &&(
      <>
        <Modal size='lg' show={showEditModal} onHide={closeProductEditModalView} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product Here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleUpdateProduct}>

<FormGroup className="mt-3">
    <Form.Label>Product title</Form.Label>

    <Form.Control
        type="text"
        placeholder="Enter here"
        value={currentProduct.title}
        onChange={event => setCurrentProduct({
            ...currentProduct,
            title: event.target.value
        })}/>
</FormGroup>


<Editor
                                apiKey=""
                                onInit={(evt, editor) => editorRef.current = editor}
                                init={{
                                    height: 380,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}

                                onEditorChange={()=> setCurrentProduct({
                                             ...currentProduct,description:editorRef.current.getContent()
                                })}
                                value={currentProduct.description}
/>


<Row>
    <Col>
        <FormGroup className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number"
                placeholder="Enter here"
                value={currentProduct.price}
                onChange={event => setCurrentProduct({
                    ...currentProduct,
                    price: event.target.value
                })}/>
        </FormGroup>
    </Col>

    <Col>
        <FormGroup className="mt-3">
            <Form.Label>Discounted Price</Form.Label>
            <Form.Control

                type="number"

                placeholder="Enter here"

                value={currentProduct.discountedPrice}
                onChange={event => setCurrentProduct({
                    ...currentProduct,
                    discountedPrice: event.target.value
                })}/>
        </FormGroup>

    </Col>
</Row>

<Form.Group className="mt-3" >
    <Form.Label>Product Quantity</Form.Label>
    <Form.Control
        type="number"
        placeholder="Enter here"
        value={currentProduct.quantity}
        onChange={event => setCurrentProduct({
            ...currentProduct,
            quantity: event.target.value
        })}/>       
</Form.Group>

<Row className="mt-3 px-1">
    <Col>
        <Form.Check

            type="switch"
            label={"Live"}
            checked={currentProduct.live}
            onChange={event => setCurrentProduct({
                ...currentProduct,
                live: !currentProduct.live
            })}/>
    </Col>
    <Col>

        <Form.Check
            type="switch"
            label={"Stock"}
            checked={currentProduct.stock}
            onChange={event => setCurrentProduct({
                ...currentProduct,
                stock: !currentProduct.stock
            })}/>
    </Col>
</Row>



<Form.Group className='mt-3'>
                               <Form.Label>Select Category</Form.Label>
                <Form.Select onChange={(event)=> setCategoryChangeId(event.target.value)}>
                                <option value="none">None</option>
                                  {                                                                 
                                  categories && categories.content.map(cat=>{
                                    return (
                                  <option defaultValue={cat.categoryId} key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>
                                    )
                                  })
                                    
                                  }
                </Form.Select>
</Form.Group>


<Form.Group className="my-5">
    <Form.Label>Set Product Image</Form.Label>
        <Form.Control type='text' onChange={(event) =>
          setCurrentProduct({...currentProduct,productImgName:event.target.value})}
          value={currentProduct.productImgName ? currentProduct.productImgName :""}/>
</Form.Group>


<Container className="text-center mt-3">
    <Button type="submit" variant="primary" size="sm">Save Details</Button>
</Container>

</Form>

          </Modal.Body>
          <Modal.Footer>
            <Button className="bg-danger" onClick={closeProductEditModalView}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }


  //Search Product
  const serachProducts=()=>{
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

  
  //Product View function
  const productsView=()=>{
          return(
            <Card className="shadow-sm">
            <Card.Body>

                <Form.Group className="mb-2 info">
                    <Form.Label>Search Product</Form.Label>

                  <InputGroup>
                      <Form.Control type='text'
                                    onChange={(event)=>{
                                      if (event.target.value === '') {
                                        if (previousProducts) {
                                            setProducts(previousProducts)
                                        }
                                      }
                                    setSearchQuery(event.target.value)}}
                                    value={searchQuery}/>
                      <Button variant="primary"
                              onClick={serachProducts}>Search</Button>
                  </InputGroup>
                </Form.Group>


                <Table striped bordered responsive className="text-center">
                  <thead>
                    <tr>
                      <th className='px-2 small'>SN</th>  
                      <th className='px-2 small'>Title</th>
                      <th className='px-2 small'>Quantity</th>
                      <th className='px-2 small'>Price</th>
                      <th className='px-2 small'>Didcounted</th>
                      <th className='px-2 small'>Live</th>
                      <th className='px-2 small'>Stock</th>
                      <th className='px-2 small'>Category</th>
                      <th className='px-2 small'>Date</th>
                      <th className='px-2 small'>Action</th>
                    </tr>
                  </thead>
                    <tbody>
                       {
                        products.content.map((product,index)=>(
                          <SingleProductView key={index} 
                                             index={index} 
                                             product={product} 
                                             deletePrdct={deletePrdct}
                                             openProductModalView={openProductModalView}
                                             openEditProductModalView={openEditProductModalView}/>
                        ))
                       }
                    </tbody>
                </Table>

            
               <Container className=" d-flex justify-content-end">
                  <Pagination size="md">

                  <Pagination.First placeholder='First' onClick={(event)=>{
                    return getProducts(0,10,'addedDate','asc')
                    }}>First</Pagination.First>

                  <Pagination.Prev onClick={(event)=>{
                    if((products.pageNumber-1)>=0){
                      return getProducts(products.pageNumber-1,10,'addedDate','asc')
                    }
                  }}/>


                    {
                      [...Array(products.totalPage)].map((obj,i)=>i).map(item=>{
                        return products.pageNumber === item ?
                        <Pagination.Item active key={item}>{item+1}</Pagination.Item>
                                                            :
                        <Pagination.Item onClick={(event)=>getProducts(item,10,'addedDate','asc')} key={item}>{item+1}</Pagination.Item>                                    
                        })
                    }


                  <Pagination.Next onClick={(event)=>{
                    if(products.lastpage){
                      return}
                    getProducts(products.pageNumber+1,10,'addedDate','asc')
                    
                  }}/>

                  <Pagination.Last  onClick={(event)=>{
                    return getProducts(products.totalPage-1,10,'addedDate','asc')
                  }}>Last</Pagination.Last>

                  </Pagination>
                 
               </Container>
               

            </Card.Body>
    </Card>
          )
  }

  //Modal View of Product
  const modalViewOfProduct=()=>{
        return  currentProduct && (
        <>
          <Modal size='lg' show={show} onHide={closeProductModalView}>
            <Modal.Header closeButton>
              <Modal.Title>{currentProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Card className="shadow-sm">

                  <Card.Body>
                       <Container className="text-center py-3">
                       <img style={{height: '300px'}} src={currentProduct.productImgName} alt="" />
                       </Container>


                       <Table striped bordered responsive className="text-center">
                                    <thead>
                                        <tr>
                                            <th>Info</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>Product Id</td>
                                            <td className="fw-bold">{currentProduct.productId}</td>
                                        </tr>

                                        <tr>
                                            <td>Quantity</td>
                                            <td className="fw-bold">{currentProduct.quantity}</td>
                                        </tr>

                                        <tr>
                                            <td>Price</td>
                                            <td className="fw-bold"> {currentProduct.price} ₹ </td>
                                        </tr>

                                        <tr>
                                            <td>Discounted Price</td>
                                            <td className="fw-bold">  {currentProduct.discountedPrice} ₹</td>
                                        </tr>

                                        <tr className={currentProduct.live ? '' : 'table-danger'}>
                                            <td>Live</td>
                                            <td className="fw-bold">{currentProduct.live ? 'True' : 'False'}</td>
                                        </tr>


                                        <tr className={currentProduct.stock ? '' : 'table-danger'}>
                                            <td>Stock</td>
                                            <td className="fw-bold">{currentProduct.stock ? 'In Stock' : 'Not in Stock'}</td>
                                        </tr>


                                        <tr>
                                            <td>Category</td>
                                            <td className="fw-bold">{currentProduct.category?.title}</td>
                                        </tr>
                                    </tbody>
                                </Table>


                  
                               
                                <div className="p-3 border border-1" >

                                    <ShowHtml htmlText={currentProduct.description} />

                                </div>
                  </Card.Body>

            </Card>

            </Modal.Body>
            <Modal.Footer>
              <Button className="bg-dark.bg-gradient" onClick={closeProductModalView}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        )
  }

 

  return (
    <>
       <Container fluid>
            <Row>
                <Col>
                    {
                      products ? productsView() : ''
                    }
                </Col>
            </Row>
        </Container> 

       {
        modalViewOfProduct()
       }
       {
        openEditProductModal()
       }
    </>
  )
}

export default AdminViewProducts