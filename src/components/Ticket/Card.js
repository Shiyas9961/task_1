import React, { Fragment, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditCard from './EditCard';

const Card = ({ ticket, index }) => {

  const [show, setShow] = useState(false);
  const [ticketId, setTicketId] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = (ticketId) => {
    setShow(true)
    setTicketId(ticketId)
  };

  return (
      <Fragment>
        <Draggable draggableId={String(ticket?.ticketId)} index={index}>
            {
              (provided, snapshot) => (
                <div onClick={() => handleShow(ticket?.ticketId)} className={`actual-card ${snapshot.isDragging ? 'dragging' : ''} text-center`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <p  className=''>{ticket.ticketTitle}</p>
                    <span className={`fw-bold card_id ${(ticket.ticketStatus).toUpperCase() === "TO DO" ? 'to_do' : (ticket.ticketStatus).toUpperCase() === "IN PROGRESS" ? 'in_progress' : (ticket.ticketStatus).toUpperCase() === "REVIEW" ? 'review' : 'done'}`}>{ticket.ticketId}</span>
                </div>
              )  
            }   
        </Draggable>
        <EditCard handleClose={handleClose} setShow={setShow} show={show} setTicketId={setTicketId} ticketId={ticketId}/>
      </Fragment>
  )
}

export default Card