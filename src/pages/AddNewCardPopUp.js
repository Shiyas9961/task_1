import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addNewCard } from '../slices/listSilce';

export default function AddNewCardPopUp(props) {

    const [ text, setText ] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
      e.preventDefault()
      const payload = {
        id : props.id,
        text
      }
      dispatch(addNewCard(payload))
      setText('')
      props.onHide()
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tasks
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="text">Type Your Task</label>
                <input 
                    value={text} 
                    type="text" id='text' 
                    className='form-control my-3'
                    onChange={(e) => setText(e.target.value)} 
                />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}