import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { GrHome } from 'react-icons/gr'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineCategory } from 'react-icons/md'
import { MdAddBox } from 'react-icons/md'
import { MdViewDay } from 'react-icons/md'
import { FaOpencart } from 'react-icons/fa'
import { FaUserSecret } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import {NavLink} from "react-router-dom"
import UserContext from '../../Context/user.context'

const SideMenu = () => {


  const {logout}=useContext(UserContext)

  return (
    <>
        <ListGroup variant="flush" className="position-static">
                <ListGroup.Item as={NavLink} to="/admin/home" action>
                    <GrHome size={20} />
                    <span className="ms-2 "> Home</span>  
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/view-products" action>
                     <MdViewDay size={20} />
                     <span className="ms-2"> View Products</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/add-product" action>
                     <MdAddBox size={20} />
                     <span className="ms-2">Add Product</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/view-categories" action>
                    <MdOutlineCategory size={20} />
                    <span className="ms-2">  View Categories</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/add-category" action>
                   <BiCategory size={20} />
                   <span className="ms-2"> Add Category</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/orders" action>
                    <FaOpencart size={20} />
                    <span className="ms-2">Orders</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/view-users" action>
                    <FaUserSecret size={20} />
                    <span className="ms-2"> Users</span>
                </ListGroup.Item>

                <ListGroup.Item  action onClick={(event)=>{
                    logout()
                }}>
                    <HiOutlineLogout size={20} />
                    <span className="ms-2">Logout</span>
                </ListGroup.Item>
        </ListGroup>
    </>
  )
}

export default SideMenu