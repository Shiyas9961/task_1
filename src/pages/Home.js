import React, { Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyJWT } from '../verifyJWT'
import { setUserDetails } from '../slices/authSlice'
import { getCurrentUser } from '../utils/getUserData'
import { cardChanged } from '../slices/listSilce'
import SideBar from '../components/SideBar'
import List from '../components/List'
import { DragDropContext } from 'react-beautiful-dnd'

const Home = () => {
    const { accessToken } = useSelector(state => state.authState)
    const { lists } = useSelector( state => state.listState)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    //const [addState, setAddState] = useState(false)
    //const [title, setTitle] = useState('')

    useEffect(() => {

        const fetUserData = async () => {
            try{
              const user = await getCurrentUser()
              //console.log(user)
              dispatch(setUserDetails(user))
            }catch(error){
              console.log(error)
            }
        }
        if(accessToken){
          verifyJWT(accessToken, dispatch)
            if(accessToken){
                fetUserData()
            }
        }
    },[accessToken, dispatch])

    /* const handleListClick = () => {
        setAddState(true)
    } 

    const handleAddList = (e) => {
        e.preventDefault()
        if(title === ''){
            setAddState(false)
            return
        }
        dispatch(addNewList(title))
        setAddState(false)
        setTitle('')
    } */

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result

        console.log({
            destination, 
            source, 
            draggableId
        })
        if(!destination){
            return
        } 
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }
        const chgObj = {
            fromIndex : source.index,
            fromListId : source.droppableId,
            endIndex : destination.index,
            endListId : destination.droppableId
        }
        dispatch(cardChanged(chgObj))
    }

  return (
    /* <!-- ======= Sidebar ======= --> */
    <Fragment>
        
            <SideBar/>
           <main id="main" className="main">
                <div className="pagetitle">
                    <h1><i className="bi bi-chevron-right"></i> Dashboard</h1>
                </div>
                <div className="input-group my-3 w-50 ">
                    <input type="search" value={search} onChange={handleSearchChange} className="form-control rounded" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                        <i className='bi bi-search fw-bold'></i>
                    </button>
                </div>
                <section className="section dashboard">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className='row'>
                            {
                                lists.map(list => (
                                        <List handleSearchChange={handleSearchChange} search={search} key={list.id} list={list}/>
                                ))
                            }
                            {/* <div className="col-md-3">
                                {
                                    addState ? (
                                        <div className='col-md'>
                                            <div className='card w-100 text-center'>
                                                <form onSubmit={handleAddList}>
                                                    <div className="form-group w-100">
                                                        <input 
                                                            id='title' 
                                                            type="text" 
                                                            value={title} 
                                                            className='form-control mb-1' 
                                                            onChange={e => setTitle(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type='submit' className='btn btn-primary p-1 my-2 w-75'>CREATE LIST</button> 
                                                </form>   
                                            </div>
                                        </div>
                                    ) : (
                                        <button className='btn btn-secondary' onClick={handleListClick}>
                                            <i className="bi bi-plus-lg"></i> CREATE LIST
                                        </button> 
                                    )
                                }
                                
                            </div> */}
                        </div>
                    </DragDropContext>
                </section>
            </main> 
          
  </Fragment>
  )
}

export default Home