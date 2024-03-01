import React, { Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanLists, getCurrProject, setListsObjToVal } from '../slices/listSilce'
import SideBar from '../components/Layouts/SideBar'
import List from '../components/Ticket/List'
import { DragDropContext } from 'react-beautiful-dnd'
import { ROLES } from '../roles'
import { getAllProject } from '../actions/projectActions'
import { usePrivateAxios } from '../hooks/usePrivateAxios'
import { getCurrentUserData } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'
import { editTicket, getAllTicketBasedOnProject } from '../actions/ticketAction'


const Home = () => {
    const { idToken, userDetails } = useSelector(state => state.authState)
    const { tickets, projects = [], listsObj, currProject } = useSelector( state => state.listState)
    const privateAxios = usePrivateAxios()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    //Fetching userdata and Projects
    useEffect(() => {       
        dispatch(getCurrentUserData())
        dispatch(getAllProject(privateAxios, navigate))
    },[ dispatch, privateAxios, navigate, idToken])

    //Fetching Tickets based on project
    useEffect(() => {
        if(projects.length > 0){
            const defaultVal = document.getElementById('select-projects').value
            dispatch(getCurrProject(defaultVal))
        }
        dispatch(getAllTicketBasedOnProject(privateAxios, currProject))

        return () => {
            dispatch(cleanLists())
        }
    }, [projects, privateAxios, dispatch, currProject])

    //Setting ticket based on status
    useEffect(() => {
        if(tickets && tickets.length){
            tickets.forEach(ticket => {
                dispatch(setListsObjToVal(ticket))
            })
        } 
    }, [tickets, dispatch])


    //Search Change
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    //Search Click
    const handleSearchclick = () => {
        setSearch(initial => initial)
    }

    //Dropdown Change
    const handleDropDownChange = async (event) => {
        dispatch(getAllTicketBasedOnProject(privateAxios, event.target.value))
        dispatch(getCurrProject(event.target.value))
    }


    //Drag and Drop
     const onDragEnd = (result) => {

       const { destination, source, draggableId } = result

        /* console.log({
            destination, 
            source,
            draggableId
        })  */

        if(!destination){
            return
        } 
        
        if(![ROLES.User, ROLES.Admin].includes(userDetails?.role)) return

        if([ROLES.User].includes(userDetails?.role)){
            if(source.droppableId === "DONE" || destination.droppableId === "DONE") return
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index){
            return
        }

        const apiObj = {
            ticketId : draggableId,
            updateValue : destination.droppableId,
            updateKey : "ticketStatus"
        }

        const dispObj = {
            destSts : destination.droppableId,
            srcSts : source.droppableId,
            destIndex : destination.index,
            srcIndex : source.index,
            itemId : draggableId
        }
        
        //console.log(apiObj)
        dispatch(editTicket(apiObj, privateAxios, currProject, dispObj))
    } 

  return (
    <Fragment>
            {/* Side Bar Component */}
        <SideBar />
        <main id="main" className="main">
            <div className="pagetitle">
                <h1><i className="bi bi-chevron-right"></i> Dashboard</h1>
            </div>

            <div className="d-md-flex align-items-center justify-content-between">

                {/* Search bar */}
                <div className="search-bar">
                    <div className="input-group my-3">
                        <input type="search" value={search} onChange={handleSearchChange} className="form-control rounded" placeholder="Search tickets..." aria-label="Search" aria-describedby="search-addon" />
                        <button onClick={handleSearchclick} type="button" className="btn btn-primary" data-mdb-ripple-init>
                            <i className='bi bi-search fw-bold'></i>
                        </button>
                    </div>
                </div>
                

                {/* Drop down */}
                <div className='d-flex align-items-center gap-1 drop-down-item'>
                    <label className='select-label' htmlFor="select-projects">Select Project : </label>
                    <select onChange={handleDropDownChange} className="form-select my-2" id='select-projects'>
                        {
                            projects.map((project, index) => (
                                <option key={index} value={ project.projectId }>{ project.projectName }</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <section className="section dashboard">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className='row'>
                        {

                            Object.keys(listsObj).map((list, index) => (
                                    <List handleSearchChange={handleSearchChange} search={search} key={index} list={list}/>
                            ))
                        }
                    </div>
                </DragDropContext>
            </section>
        </main>   
    </Fragment>
  )
}

export default Home