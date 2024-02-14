import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Card = ({ card, index }) => {

  return (
        <Draggable draggableId={String(card.id)} index={index}>
            {
              (provided, snapshot) => (
                <div className={`actual-card ${snapshot.isDragging ? 'dragging' : ''}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <p  className=''>{card.text}</p>
                    </div>
              )  
            }   
        </Draggable>
  )
}

export default Card