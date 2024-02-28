import { Fragment, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { usePrivateAxios } from '../../hooks/usePrivateAxios'
import { addNewComment, editSingleTicket, getAllTicketBasedOnProject, getSingleTicket } from '../../actions/ticketAction';
import Loader from '../../pages/Loader'
import ReactQuill from 'react-quill';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'react-quill/dist/quill.snow.css';
import Comments from './Comments';

function EditCard({ setShow, show, ticketId, setTicketId}) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const { userDetails = {} } = useSelector(state => state.authState) 
    const { ticket = {}, singleTicketLoading : loading, listsObj = {}, currProject } = useSelector(state => state.listState)
    const dispatch = useDispatch()
    const privateAxios = usePrivateAxios()
    const [showFormat, setShowFormat] = useState(false)
    const [commFormat, setCommFormat] = useState(false)
    const [commEdit, setCommEdit] = useState(false)
    const [currId, setCurrId] = useState('')
    const [editHead, setEditHead] = useState(false)
    const [delMouseOvered, setDelMouseOvered] = useState(false)
    const [okMouseOvered, setOkMouseOvered] = useState(false)

    useEffect(() => {
      if(ticketId !== null){
        dispatch(getSingleTicket(privateAxios, ticketId))
      }  
    },[dispatch, privateAxios, ticketId])

    useEffect(() => {
      if(ticket.ticketId){
        setTitle(ticket.ticketTitle)
        setDescription(ticket.ticketDescription)
        setStatus(ticket.ticketStatus.toUpperCase())
        setComments(ticket.Comments ? ticket.Comments : [])
      }
    },[ticket, ticketId])

    const handleCloseBtn = () => {
      setShow(false)
      setTicketId(null)
      setShowFormat(false)
      dispatch(getAllTicketBasedOnProject(privateAxios, currProject))
    }

    const handleDescClick = () => {

      const ticketData = {
        ticketId : ticketId,
        updateValue : description,
        updateKey : "ticketDescription"
      }
      dispatch(editSingleTicket(ticketData, privateAxios, ticketId))
      setShowFormat(false)
    }

    const handleCommEdiClick = (currId) => {
      setCurrId(currId)
      setCommEdit(prev => !prev)
    }

    const handleNewCommClick = () => {
      const commentData = {
        ticketId : ticketId,
        userName : userDetails.name,
        commentText : newComment
      }

      dispatch(addNewComment(commentData, privateAxios, ticketId))
      setCommFormat(false)
    }

    const handleHeadClick = () => {
      const ticketData = {
        ticketId : ticketId,
        updateValue : title,
        updateKey : "ticketTitle"
      }
      dispatch(editSingleTicket(ticketData, privateAxios, ticketId))
      setEditHead(false)
    }

    const handleStatusChange = (event) => {
      const ticketData = {
        ticketId : ticketId,
        updateValue : event.target.value,
        updateKey : "ticketStatus"
      }
      dispatch(editSingleTicket(ticketData, privateAxios, ticketId))
    }

  return (
      <Modal
        show={show}
        onHide={handleCloseBtn}
        backdrop="static"
        keyboard={false}
        className='custom-modal'
        size='lg'
      >
        {
          loading ? (
            <Modal.Body>
              <Loader popup/>
            </Modal.Body>
          ) : (
            <Fragment>
              <Modal.Header closeButton>
                <Modal.Title>
                  <p className='h6 fw-normal text-muted'><i className="bi bi-bookmark-star-fill
                  text-success"></i>  {ticketId}</p>
                  {
                    editHead ? (
                      <div className='py-3 position-relative'>
                        <input 
                          type="text" 
                          className='h2 heading-input' 
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                        <span className='heading-btn'>
                          <i 
                            className={`${okMouseOvered ? 'bi bi-check-circle-fill' : 'bi bi-check-circle'}`} 
                            onMouseOver={() => setOkMouseOvered(prev => !prev)} 
                            onMouseOut={() => setOkMouseOvered(false)}
                            onClick={handleHeadClick}
                          ></i> 
                          <i 
                            className={`${delMouseOvered ? 'bi bi-x-circle-fill' : 'bi bi-x-circle'}`} onMouseOver={() => setDelMouseOvered(prev => !prev)} 
                            onMouseOut={() => setDelMouseOvered(false)}
                            onClick={() => setEditHead(false)}
                          ></i>
                          </span>
                      </div>
                    ) : (
                      <h2 className='fw-bold' onClick={() => setEditHead(true)}>{title}</h2>
                    )
                  }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className='d-flex'>
                {/* Left Section */}
                <div className='w-50 d-flex flex-column gap-4'>

                 {/* Attach File  */}
                  <div>
                    <label htmlFor="file" className='fw-bold mb-2'>Attach File</label>
                    <div>
                      <label className='file-label' htmlFor="file-sel">
                        <i className='bi bi-paperclip'></i>
                        file
                      </label>
                    <input type='file' id='file-sel' style={{display : 'none'}}/>
                    </div>   
                  </div>
                  
                  {/* Description */}

                  <div className="form-group">
                    <label htmlFor="desc" className='fw-bold mb-2'>Description</label>
                    {
                      showFormat ? (
                        <div>
                          <ReactQuill className='desc-box' value={description} onChange={setDescription}/>
                          <div className="d-flex gap-2">
                            <button className='desc-btn mt-2' onClick={handleDescClick}>Submit</button>
                            <button className='desc-cancel-btn mt-2' onClick={() => setShowFormat(false)}>Cancel</button>
                          </div>
                        </div>
                        ) : (
                        <p onClick={() => setShowFormat(prev => !prev)}  dangerouslySetInnerHTML={{ __html : description }} />
                      )
                    }
                  </div>
                  
                  {/* Comments */}

                  <div className="comm-box">
                  <label htmlFor="comments" className='fw-bold mb-2'>Comments</label>
                    <div>
                      {
                        commFormat ? (
                          <Fragment>
                            <ReactQuill value={newComment} onChange={setNewComment}/>
                            <div className="d-flex gap-2">
                              <button onClick={handleNewCommClick} className='comment-btn mt-2'>Submit</button>
                              <button className='desc-cancel-btn mt-2' onClick={() => setCommFormat(false)}>Cancel</button>
                            </div>
                          </Fragment>
                          
                        ) : (
                          <input 
                            type="text"
                            id='comments'
                            onClick={() => setCommFormat(prev => !prev)}
                            placeholder='Add comments. . .'
                            className='form-control'
                          />
                        )
                      }
                    </div>
                    <div className="mt-4">
                      {
                        comments.length > 0 && (
                          comments.map(comm => (
                            <div className="mb-2">
                              {
                                commEdit && (currId === comm.commentId) ? (
                                  <Fragment>
                                  <ReactQuill value={comm.commentText} />
                                    <div className="d-flex gap-2">
                                        <button className='comment-del-btn mt-2'>Edit</button>
                                        <button className='desc-cancel-btn mt-2' onClick={() => setCommEdit(false)}>Cancel</button>
                                    </div>
                                  </Fragment>
                                ) : (
                                  <Comments key={comm.commentId} comm={comm} commEdit={commEdit} handleCommEdiClick={handleCommEdiClick}/>
                                )
                              }
                            </div>
                          ))
                        )
                      }
                    </div>
                  </div>
                </div>
                {/* Right Section */}
                <div>
                <select value={status} onChange={handleStatusChange} className="form-select form-select-sm" id='select-projects'>
                            {
                                Object.keys(listsObj).map((status, index) => (
                                    <option className={`${status === "TO DO" ? 'to_do' : status === "IN PROGRESS" ? 'in_progress' : status === "REVIEW" ? 'review' : 'done'}`} key={index} value={status}>{status}</option>
                                ))
                            }
                        </select>
                </div>
              </Modal.Body>
            </Fragment>
          )
        }
      </Modal>
  );
}

export default EditCard;