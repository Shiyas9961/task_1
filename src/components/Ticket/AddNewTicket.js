import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { AddNewTicketAction } from '../../actions/ticketAction';
import { usePrivateAxios } from '../../hooks/usePrivateAxios';
//import { useSelector } from 'react-redux';

function AddNewTicket({ show, setShow, projectId }) {

  //const { listsObj } = useSelector(state => state.listState)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const privateAxios = usePrivateAxios()
  //const [status, setStatus] = useState(document.getElementById('drop-down').value)

  const handleAddSubmit = (event) => {
    event.preventDefault()

    const tickObj = {
      projectId : projectId,
      ticketTitle : title,
      ticketDescription : description
    }
    dispatch(AddNewTicketAction(tickObj, privateAxios))
    setDescription('')
    setTitle('')
    setShow(false)
  }

  return (
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            ADD NEW TICKET FOR THIS PROJECT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddSubmit} className=''>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
              <input 
                required 
                type="text" 
                className="form-control" 
                id="exampleInputEmail1"
                value={title}  
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
              <input 
                type="text" 
                className="form-control" 
                id="exampleInputPassword1" 
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            {/* <select value={status} onChange={(event) => setStatus(event.target.value)} required className="form-select form-select-sm" id='drop-down'>
              {
                Object.keys(listsObj).map((status, index) => (
                  <option key={index} value={status}>{status}</option>
                ))
              }
            </select> */}
            <button type="submit" className="btn btn-primary mt-3">Add Ticket</button>
          </form>
        </Modal.Body>
      </Modal>
  );
}

export default AddNewTicket;