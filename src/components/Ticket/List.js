import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewCard } from '../../slices/listSilce'
import Card from './Card'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { ROLES } from '../../roles'
import Loader from '../../pages/Loader'

const List = ({ list, search }) => {
    const [addState, setAddState] = useState(false)
    const [text, setText] = useState('')
    const [showCard, setShowCard] = useState([])
    const dispatch = useDispatch()
    const { userDetails = {} } = useSelector(state => state.authState)
    const { listsObj = {}, loading } = useSelector(state => state.listState)

    //Add cards
    const handleAddCard = (e) => {
        e.preventDefault()
        if(text === '') {
            setAddState(false)
            return
        }
        dispatch(addNewCard({
            id : list.id,
            ticketDescription : text
        }))
        setText('')
        setAddState(false)
    }

    //Giving value to show card
    useEffect(() => {
        setShowCard(listsObj[list])
    },[listsObj, list])

    //Showing cards based on search
    useEffect(() => {
        if(search === '') {
            setShowCard(initial => initial)
        }
        const trimmedSearch = search.trim().toLowerCase()
        const searchedCards = listsObj[list]?.filter(ticket => ticket.ticketTitle.toLowerCase().includes(trimmedSearch))
        setShowCard(searchedCards)
    }, [search, listsObj, list])

    if(loading){
        return <Loader/>
    }

  return (
                
        <div  className="col-lg-3 col-md-4 col-sm-6" >
            <div className="card cards-box" >
                <div className="card-header">
                    <i className="bi bi-list-task"></i> <span className='text-primary'>{list}</span>
                </div>
                <Droppable droppableId={String(list)}>
                    {
                        (provided, snapshot) => (
                                <div className={`list-body-sec ${snapshot.isDraggingOver ? 'dragging-list' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                                    {
                                        showCard?.map((ticket, index) => (
                                            <Card ticket={ticket} index={index} key={ticket.ticketId}/>
                                        ))
                                    }
                                    {provided.placeholder}
                                    <div className='main-btn my-1'>
                                        {
                                            addState ? (
                                                    <form className='text-center' onSubmit={handleAddCard}>
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
                                            ) :  [ROLES.Admin, ROLES.User].includes(userDetails?.role) || ([ROLES.Viewer].includes(userDetails?.role) && list?.title === "TO DO") ? 
                                            <button  onClick={() => setAddState(true)} className='add-card-btn'><i className="bi bi-plus-lg"></i> CREATE</button> : null
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