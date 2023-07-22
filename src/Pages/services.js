import React from 'react'
import Base from '../Components/Base'
import { Card, Container } from 'react-bootstrap'
import { MdLocalFireDepartment } from 'react-icons/md'

const Services = () => {
  return (
    <Base title='Services We Provide'
          description='In this page we will discuss the services we provide.'
          buttonEnabled={true}
          buttonText='Home'
          buttonLink='/'
          buttonType='primary'>
          <div>
              <Container fluid>
                   <Card>
                     <Card.Body className='text-center'>
                     "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nisi assumenda asperiores repudiandae accusamus itaque ratione veritatis, inventore sunt laboriosam.
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nisi assumenda asperiores repudiandae accusamus itaque ratione veritatis, inventore sunt laboriosam."
          
                     </Card.Body>
                   </Card>
              </Container>
          </div>
    </Base>
  )
}

export default Services