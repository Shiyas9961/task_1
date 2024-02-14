import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewCard } from '../slices/listSilce'
import Card from './Card'
import { Droppable } from 'react-beautiful-dnd'

const List = ({ list, search }) => {
    const [addState, setAddState] = useState(false)
    const [text, setText] = useState('')
    const [showCard, setShowCard] = useState(list.cards)
    const dispatch = useDispatch()

    const handleAddCard = (e) => {
        e.preventDefault()
        if(text === '') {
            setAddState(false)
            return
        }
        dispatch(addNewCard({
            id : list.id,
            text
        }))
        setText('')
        setAddState(false)
    }

    useEffect(() => {
        setShowCard(list.cards)
    },[list.cards])

    useEffect(() => {
        if(search === '') {
            setShowCard(initial => initial)
        }
        const trimmedSearch = search.trim().toLowerCase()
        const searchedCards = list.cards.filter(card => card.text.toLowerCase().includes(trimmedSearch))

        setShowCard(searchedCards)
    }, [search])

  return (
                
        <div  className="col-md-3 col-sm-4 col-xs-2" >
            <div className="card cards-box" >
                <div className="card-header">
                    <i className="bi bi-list-task"></i> <span className='text-primary'>{list.title}</span>
                </div>
                <Droppable droppableId={String(list.id)}>
                    {
                        (provided, snapshot) => (
                                <div className={`list-body-sec ${snapshot.isDraggingOver ? 'dragging-list' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                                    {
                                        showCard?.map((card, index) => (
                                            <Card card={card} index={index} key={card.id}/>
                                        ))
                                    }
                                    {provided.placeholder}
                                    <div className='main-btn my-1'>
                                        {
                                            addState ? (
                                                    <form onSubmit={handleAddCard}>
                                                        <div className="form-group w-100">
                                                            <textarea 
                                                                id='text' 
                                                                type="text" 
                                                                value={text} 
                                                                className='form-control mb-1' 
                                                                onChange={e => setText(e.target.value)}
                                                            />
                                                        </div>
                                                        <button type='submit' className='btn btn-primary p-1 my-2 w-75'>CREATE</button> 
                                                    </form>   
                                            ) : (
                                            <button onClick={() => setAddState(true)} className='add-card-btn'><i className="bi bi-plus-lg"></i> CREATE</button> 
                                            )
                                        }
                                    </div>
                                </div>
                        )
                    }
                </Droppable> 
            </div>
        </div>   
  )
}

export default List