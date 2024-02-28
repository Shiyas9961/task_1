import React, { Fragment } from 'react'
import moment from 'moment';

const Comments = ({ comm, handleCommEdiClick}) => {
  return (
        <Fragment>  
            <p className='comm-name'><i className='bi bi-person-circle'></i> {comm.userName} <span className='comm-date'>{moment(comm.createDate).fromNow()}</span></p>
            <p className='lead' dangerouslySetInnerHTML={{ __html : comm.commentText }} />
            <div className="d-flex gap-2">
                <button className='comm-btn' onClick={() => handleCommEdiClick(comm.commentId)}>Edit</button>
                <button className='comm-btn'>Delete</button>
            </div>  
        </Fragment> 
  )
}

export default Comments