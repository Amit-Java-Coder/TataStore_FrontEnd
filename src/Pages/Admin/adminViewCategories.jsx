import React, { useEffect, useState } from 'react'
import CategoryView from '../../Components/CategoryView'
import CategoryService from '../../Services/Category.service'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Button, Container, Form, FormGroup, Modal, Spinner } from 'react-bootstrap'

const AdminViewCategories = () => {

  const [selectedCategory, setSelectedCategory] = useState(null)

  //For view
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //For update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [categories,setCategories]=useState({content:[]})

  useEffect(()=>{
        CategoryService.viewCategory().then((res)=>{
                  console.log(res)
                  setCategories(res)
        }).catch((error)=>{
          console.log(error)
          toast.error("Error in loading Categories!!!")
        })
  },[])



      //Delete Function
      const deleteCategoryMain=(categoryId)=>{
        
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

          //After confirmation delete function will be called...
          CategoryService.deleteCategory(categoryId).then(()=>{

              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }).catch((error)=>{
              console.log(error)
              toast.error("Error in deleting Category")
            })


            //After deletion the new category list will be stored in following array... 
            const newCategoryArray= categories.content.filter((c)=>{
                   return c.categoryId !== categoryId
            })
            //Then new Category list will be rendered...
            setCategories({...categories,content:newCategoryArray})

          }
        })
      }

      
      //Single Category View Function
      const viewCategoryMain=(category)=>{
            setSelectedCategory(category)
            console.log(category)
            handleShow()
      }


      //Update Function
      const handleUpdate = (category) => {
        setSelectedCategory(category)
        handleShowUpdate()
      }

      const updateCategoryMain=(event)=>{
        event.preventDefault()

        if (selectedCategory.title === undefined || selectedCategory.title === '') {
          toast.error("Title is required !!")
          return
        }

        if (selectedCategory.description === undefined || selectedCategory.description === '') {
          toast.error("Description is required !!")
          return
        }

        CategoryService.updateCategory(selectedCategory).then((res)=>{

          console.log(res)
          toast.success("Category Updated.")
          const newCategories = categories.content.map(cat=>{
            if(cat.categoryId=== selectedCategory.categoryId){
              cat.title=res.title
              cat.description=res.description
              cat.coverImg=res.coverImg
            }
            return cat
          })
          setCategories({
            ...categories,content:newCategories
          })
        }).catch((error)=>{
          toast.error("Error in updating!")
        })
      }

      //Modal  View  of SingleCategory
      const modalView=()=>{
      return(<> 
        <Modal animation={false} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                        <Container>
                            <img style={{
                                          width: '100%',
                                          height: '250px',
                                          objectFit: 'contain'
                                       }} src={selectedCategory.coverImg} alt="" />
                        </Container>

                        <div className="mt-3">
                            {selectedCategory.description}
                        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>     
      </>)
      }
  
      //Modal for UpdateCategory
      const modalUpdate=()=>{
      return(<> 
        <Modal animation={false} show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                    <Form >

                    <FormGroup className='mt-3'>
                       <Form.Label>Category Title</Form.Label>
                       <Form.Control type="text"
                                    placeholder="Enter title here"
                                    value={selectedCategory.title}
                onChange={(event) => setSelectedCategory({...selectedCategory,title: event.target.value})}/>
                   </FormGroup>


                   <FormGroup className="mt-3">
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control
                                    rows={6} as={'textarea'} placeholder={'Enter here'} 
                                    value={selectedCategory.description}
                onChange={(event) => setSelectedCategory({...selectedCategory, description: event.target.value})}/>
                    </FormGroup>


                    <FormGroup className="mt-3">
                                <Form.Label>Category Cover Image Url</Form.Label>
                                <Form.Control type="text"
                                     value={selectedCategory.coverImg}
                onChange={(event) => setSelectedCategory({...selectedCategory,coverImg: event.target.value})}/>
                    </FormGroup>

                  </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={updateCategoryMain}>Save Changes</Button>
          <Button variant="danger" onClick={handleCloseUpdate}>Close</Button>
          </Modal.Footer>
        </Modal>     
      </>)
      }

  return (<>

       {categories.content.length > 0 ? 
  (
    <>
         {
            categories.content.map((category)=>{
              return (<CategoryView category={category} 
                                    key={category.categoryId} 
                                    deleteCategoryMain={deleteCategoryMain}
                                    viewCategoryMain={viewCategoryMain}
                                    updateCat={handleUpdate}
                                    />)})
         }
    </>
  )  :  <h3 className='text-center mt-30'>There is no Category as of now...</h3>
      }

      {
        selectedCategory ? modalView() : ''
      }
      {
        selectedCategory ? modalUpdate() : ''
      }
  </>)
  
  
}

export default AdminViewCategories