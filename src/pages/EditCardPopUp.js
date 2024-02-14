import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {useSelector } from 'react-redux';

export default function EditCardPopUp(props) {
    const { lists } = useSelector( state => state.listState)
    const { listid, cardid } = props

    let cardObj = {}

    lists.forEach(list => {
        if(list.id === listid){
            cardObj = list.cards.find(card => card.id === cardid)
        }
    })
    const { text : initialText } = cardObj
    const [ text, setText ] = useState("")


    useEffect(() => {
        if(initialText){
           setText(initialText) 
        }  
    },[initialText])

    
    //const dispatch = useDispatch()

    const handleSubmit = (e) => {
      e.preventDefault()
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
          Edit Task
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