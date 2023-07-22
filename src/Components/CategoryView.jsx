import React from 'react'
import image from '../assets/Tata_Cliq.png'
import { Button, Card, Container, Row ,Col } from 'react-bootstrap'
//This is  CategoryView Component...
const CategoryView = ({category,deleteCategoryMain,viewCategoryMain,updateCat}) => {

    const imageStyle = {
        width: "100px",
        height: "100px",
        objectFit: "cover"
    }

    const deleteCategory = (categoryId) => {
        deleteCategoryMain(categoryId)
    }

  return (   
    <div className="mb-3">
    <Card className="border-bottom shadow-sm">
        <Card.Body>
            <Row className="align-items-center">
                <Col md={2} className="text-center">
                    <img src={(category.coverImg ? (category.coverImg.startsWith("http") ? category.coverImg : image) : image)} className="rounded-circle" style={imageStyle} alt="" />
                </Col>


                <Col md={8}>
                    <h5>{category.title}</h5>
                    <p>{category.description}</p>
                </Col>


                <Col md={2}>
                    <Container className="d-grid ">
<Button size="sm" variant="danger" onClick={(event) => deleteCategory(category.categoryId)}>Delete</Button>
<Button className="mt-1" size="sm" variant="primary" onClick={(event) => viewCategoryMain(category)}>View</Button>
<Button className="mt-1" size="sm" variant="success" onClick={(event)=>updateCat(category)}>Update</Button>

                    </Container>
                </Col>
            </Row>
        </Card.Body>
    </Card>
</div>
  )
}

export default CategoryView