import React, { useEffect, useState } from 'react'
import CategoryService from '../../Services/Category.service'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultCategoryImage from '../../assets/default-product-image.png'
import defaultCategoryCoverImage from '../../assets/images.png'

const UserCategory = () => {

  const [categories,setCategories]=useState(undefined)

  useEffect(()=>{
    CategoryService.viewCategory().then((res)=>{
        setCategories(res)
        console.log(res)
    }).catch((error)=>{
        console.log(error)
    })
  },[])

  const categoryView=()=>{
    return categories && (
        <>
           <ListGroup variant='flush' className='stick-top'>
                <ListGroup.Item  as={Link} to={`/userStore`}>
                <img
                    
                            src={defaultCategoryCoverImage} alt="" style={{
                                width: "40px",
                                height: '40px',
                                objectFit: 'contain'
                            }}
                            onError={event => {
                                event.currentTarget.setAttribute('src', defaultCategoryCoverImage)
                            }}

                        />
                <span className="ms-2 "> All Products</span>
                </ListGroup.Item>
                {categories.content.map((cat) => 
                (
                <ListGroup.Item as={Link} to={`/category/${cat.categoryId}/${cat.title}`} key={cat.categoryId}>
                            <img
                                className=' rounded-circle'
                                src={cat.coverImg} alt="" style={{
                                    width: "40px",
                                    height: '40px',
                                    objectFit: 'contain'
                                }}
                                onError={event => {
                                    event.currentTarget.setAttribute('src', defaultCategoryImage)
                                }}

                            />
                    <span className="ms-2 ">{cat.title}</span>
                </ListGroup.Item>
                ))}
           </ListGroup>
        </>
    )
  }

  return categories && categoryView() 

}

export default UserCategory