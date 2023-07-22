import React, { useState } from 'react'
import { Button, Card, Container, Form, FormGroup } from 'react-bootstrap'
import { toast } from "react-toastify"
import CategoryService from '../../Services/Category.service'

const AdminAddCategories = () => {

  
  const [category, setCategory] = useState({
    title: '',
    description: '',
    coverImg: ''
  })

  const handleChange = (event, property) => {
    event.preventDefault()
    setCategory({
        ...category,
        [property]: event.target.value
    })
  }

  const handleFormSubmit=(event)=>{
    event.preventDefault()
    console.log(category);
    if (category.title === undefined || category.title === '') {
        toast.error("Category title required !!")
        return
    }

    if (category.description === undefined || category.description === '') {
        toast.error("Category Description required !!")
        return
    }

    CategoryService.addCategory(category)
    .then((data) => {
      toast.success("Category Added !")
      console.log(data)
      setCategory({
          title: '',
          description: '',
          coverImg: ''
      })
  })
  .catch(error => {
      console.log(error)
      toast.error("Error in adding category !! ")
  })
  }



  const clearForm = (event) => {
    event.preventDefault()
    setCategory({
        title: '',
        description: '',
        coverImg: ''
    })
  }

  return (
    <>
        <Container fluid>
           <Card className=" shadow-sm mt-2">
             <Card.Body>
             <h5> Add Category Here</h5>

              <Form onSubmit={handleFormSubmit}>
                   <FormGroup className='mt-3'>
                       <Form.Label> Category Title</Form.Label>
                       <Form.Control type="text"
                                    placeholder="Enter title here"
                                    onChange={(event) => handleChange(event, 'title')}
                                    value={category.title}/>
                   </FormGroup>


                   <FormGroup className="mt-3">
                                <Form.Label> Category Description</Form.Label>
                                <Form.Control
                                    onChange={(event) => handleChange(event, 'description')}
                                    value={category.description}
                                    rows={6} as={'textarea'} placeholder={'Enter here'} />
                    </FormGroup>


                    <FormGroup className="mt-3">
                                <Form.Label>Category Cover Image Url</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter here"
                                    onChange={(event) => handleChange(event, 'coverImg')}
                                    value={category.coverImg}
                                />
                    </FormGroup>


                    <Container className="text-center mt-2">
                        <Button type="submit" variant="primary" size="sm">Add</Button>
                        <Button variant="danger" onClick={clearForm} className="ms-2" size="sm">Clear</Button>
                    </Container>

              </Form>
            </Card.Body>
           </Card>
        </Container>
    </>
  )
}

export default AdminAddCategories