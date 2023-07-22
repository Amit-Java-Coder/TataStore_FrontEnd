import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import CategoryService from '../../Services/Category.service'
import ProductService from '../../Services/Product.service'
import { Editor } from '@tinymce/tinymce-react'

const AdminAddProduct = () => {

  const [category,setCategory]=useState(undefined)
  const [selectedCategoryId,setSelectedCategoryId]=useState("none")
  const editorRef=useRef()

  const [product,setProduct]=useState({
    title:'',
    description:'',
    price:0,
    discountedPrice:0,
    quantity:0, 
    addedDate:'',
    stock:true,
    live:false,
    productImgName:undefined
  })

    useEffect(()=>{
       CategoryService.viewCategory().then(res=>{
        setCategory(res)
       }).catch((error)=>{
        console.log(error)
        toast.error("Couldnot set category of product...")
       })
  },[])


  const clearForm = () => {
    editorRef.current.setContent('')
    setProduct({
      title:'',
      description:'',
      price:0,
      discountedPrice:0,
      quantity:0, 
      addedDate:'',
      stock:true,
      live:false,
      productImgName:undefined,
    })
}

  
  const addProduct=(event)=>{
     event.preventDefault()
     if(product.title===undefined || product.title===''){
       toast.error("Title is required!!!")
     }
     if (product.description === undefined || product.description=== '') {
      toast.error("Description is required !!")
      return
     }
     if (product.price <= 0) {
      toast.error("Invalid Price !!")
      return
     }
     if (product.discountedPrice <= 0 || product.discountedPrice >= product.price) {
      toast.error("Invalid discounted price !!")
      return
     }
     if ( selectedCategoryId=== "none") {
      toast.error("Category needs to be selected!!!")
      return
    }

     //CreateProductWithoutCategory function will be called
     if(selectedCategoryId!=="none"){

      ProductService.createProductInCategory(product,selectedCategoryId).then((res)=>{
        console.log(res)
    
          setProduct({
            title:'',
            description:'',
            price:0,
            discountedPrice:0,
            quantity:0, 
            addedDate:'',
            stock:true,
            live:false,
            productImgName:undefined,
          })
        toast.success("Product is created...")
     }).catch((error)=>{
        console.log(error)
        toast.error("Product could not create!!!")
     })
  }
  }
   

  const formView=()=>{
        return(
          <>
             <Card  className=" shadow-sm mt-2">
                 <Card.Body>
                       <h3>Add Product Here</h3>

                       <Form onSubmit={addProduct}>
                          <FormGroup className='mt-2'>
                              <Form.Label>Product title</Form.Label>
                              <FormControl type='text' 
                                        placeholder='Enter here'
                                        onChange={(event) => setProduct({...product,title: event.target.value})}
                                        value={product.title}/>
                          </FormGroup>


                          {/**<FormGroup className='mt-2'>
                              <Form.Label>Description</Form.Label>
                              <FormControl as={'textarea'} rows={6} 
                                        placeholder='Write about product'
                                        onChange={(event)=>setProduct({...product,description: event.target.value})}
                                        value={product.description}/>
                          </FormGroup>**/}

                           
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

                                onEditorChange={()=> setProduct({
                                             ...product,description:editorRef.current.getContent()
                                })}
                          />
                          

                          <Row>
                            <Col>
                              <FormGroup className='mt-2'>
                                 <Form.Label>Price</Form.Label>
                                 <FormControl type='number' 
                                            placeholder='Enter here'
                                            onChange={(event) => setProduct({...product,price: event.target.value})}
                                            value={product.price}/>
                              </FormGroup>
                            </Col>
                            
                            <Col>
                            <FormGroup className='mt-2'>
                                 <Form.Label>Discounted Price</Form.Label>
                                 <FormControl type='number' 
                                              placeholder='Enter here'
                                              onChange={(event) =>{ 
                                                if(event.target.value>product.price){
                                                  toast.error("Discounted price cant be more than actual price!")
                                                  return
                                                }
                                              setProduct({...product,discountedPrice: event.target.value})}}
                                              value={product.discountedPrice}/>
                              </FormGroup>
                            </Col>
                          </Row>


                          <FormGroup className='mt-2'>
                              <Form.Label>Quantity</Form.Label>
                              <FormControl type='number' 
                                          placeholder='Enter here'
                                          onChange={(event) => setProduct({...product,quantity: event.target.value})}
                                          value={product.quantity}/>
                          </FormGroup>

                          
                          <Row className='mt-2 px-2'> 
                            <Col>
                              <Form.Check
                                  label={'Live'}
                                  type='switch'
                                  checked={product.live}
                                  onChange={() => {
                                    setProduct({...product,live:!product.live})
                                }}/>
                            </Col>

                            <Col>
                              <Form.Check
                                  label={'Stock'}
                                  type='switch'
                                  checked={product.stock}
                                    onChange={() => {
                                      setProduct({...product,stock: !product.stock})}}/>
                            </Col>
                          </Row>


                          <FormGroup className='mt-2'>
                              <Form.Label>Select image</Form.Label>                               
                              <FormControl type='text' 
                                           placeholder='Enter here'
                                    onChange={(event)=>setProduct({...product,productImgName:event.target.value})}/>
                          </FormGroup>


                          <Form.Group className='mt-3'>
                               <Form.Label>Select Category</Form.Label>
                <Form.Select onChange={(event)=>setSelectedCategoryId(event.target.value)}>
                                  <option value="none">None</option>
                                  {
                                    (category)?<>
                                    
{
 category.content.map(cat=><option key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>)
}

                                               </>:''
                                  }
                </Form.Select>
                                </Form.Group>



                          <Container className="text-center mt-2">
                                <Button type="submit" variant="primary" size="sm">Add Product</Button>
                                <Button className="ms-1" variant="danger" size="sm" onClick={clearForm} >Clear</Button>
                          </Container>

                       </Form>
                 </Card.Body>
             </Card>
          </>
        )
  }

  return (
    <div>
         {
           formView()
         }
    </div>
  )
}

export default AdminAddProduct