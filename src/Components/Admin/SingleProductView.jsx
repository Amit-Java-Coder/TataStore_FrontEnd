import React from 'react'
import { Button } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { GrFormView } from 'react-icons/gr'
import { BsFillPencilFill } from 'react-icons/bs'


const SingleProductView = ({product,index,deletePrdct,openProductModalView,openEditProductModalView}) => {


  const formatDate=(time)=>{
    return new Date(time).toLocaleDateString()
  }

  const getBackgroundForProduct = () => {

    if (product.live && product.stock) {
        return "table-success"
    } else if (!product.live) {
        return "table-danger"
    } else if (!product.stock) {
        return "table-warning"
    } else {

    }  
}

  return (
        <tr className={getBackgroundForProduct()}>
            <td className='px-2 small'>{index+1}</td>
            <td className='px-2 small'>{product.title}</td>
            <td className='px-2 small'>{product.quantity}</td>
            <td className='px-2 small'>{product.price}</td>
            <td className='px-2 small'>{product.discountedPrice}</td>
            <td className='px-2 small'>{product.live ? 'True' : 'False'}</td>
            <td className='px-2 small'>{product.stock ? 'True' : 'False'}</td>
            <td className='px-2 small'>{product.category ? product.category.title : ''}</td>
            <td className='px-2 small'>{formatDate(product.addedDate)}</td>
            <td className='px-2 small'>
                <Button className='bg-danger' size="sm" onClick={(event)=>deletePrdct(product.productId)}><MdDelete/></Button>
                <Button  size="sm" className='ms-2 bg-secondary' onClick={(event)=>openProductModalView(product)}><GrFormView/></Button>
                <Button  size="sm" className='ms-2 bg-primary' onClick={(event)=>openEditProductModalView(event,product)}><BsFillPencilFill/></Button>
            </td>
        </tr>
  )
}

export default SingleProductView