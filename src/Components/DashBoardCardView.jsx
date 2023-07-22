import React from 'react'
import { Card } from 'react-bootstrap'

const DashBoardCardView = ({text1,text,icon}) => {
  return (
    <>
      <Card className="shadow-sm">
                                            
         <Card.Body className="text-center">
            {icon}
            <h6 className="mt-3"> {text1} + </h6>
            <h6 className="text-muted mt-3">{text}</h6>
        </Card.Body>

      </Card>
    </>
  )
}

export default DashBoardCardView