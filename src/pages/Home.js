import React, { Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cardChanged } from '../slices/listSilce'
import SideBar from '../components/SideBar'
import List from '../components/List'
import { DragDropContext } from 'react-beautiful-dnd'
import { ROLES } from '../roles'
import { getAllProject } from '../actions/projectActions'
import { usePrivateAxios } from '../hooks/usePrivateAxios'
import { getCurrentUserData } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const { idToken, userDetails = {} } = useSelector(state => state.authState)
    const { lists, projects = [] } = useSelector( state => state.listState)
    const privateAxios = usePrivateAxios()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()


    useEffect(() => {       
        dispatch(getCurrentUserData())
        dispatch(getAllProject(privateAxios, navigate))
        //verifyJWT(idToken, dispatch) 
    },[ dispatch, privateAxios, navigate, idToken])

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchclick = () => {
        setSearch(initial => initial)
    }

    const onDragEnd = (result) => {
        const { destination, source } = result

        /* console.log({
            destination, 
            source, 
            draggableId
        }) */
        
        if(![ROLES.User, ROLES.Admin].includes(userDetails?.role)) return

        if([ROLES.User].includes(userDetails?.role)){
            const destList = lists.find(list => list.id === destination.droppableId)
            const staList = lists.find(list => list.id === source.droppableId)

            if(staList.title === "DONE" || destList.title === "DONE") return
        }

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

                <div className="d-md-flex align-items-center justify-content-between">

                    {/* Search bar */}

                    <div className="input-group my-3 drop-down-item">
                        <input type="search" value={search} onChange={handleSearchChange} className="form-control rounded" placeholder="Search..." aria-label="Search" aria-describedby="search-addon" />
                        <button onClick={handleSearchclick} type="button" className="btn btn-primary" data-mdb-ripple-init>
                            <i className='bi bi-search fw-bold'></i>
                        </button>
                    </div>

                    {/* Drop down */}
                    <div className='d-flex align-items-center gap-1'>
                        <label className='select-label' htmlFor="select-projects">Select Project : </label>
                        <select className="form-select my-2" id='select-projects' aria-label="Default select example">
                            {
                                projects.map(project => (
                                    <option key={project.projectId} value={project.projectname || project.projectName}>{project.projectname || project.projectName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <section className="section dashboard">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className='row'>
                            {
                                lists.map(list => (
                                        <List handleSearchChange={handleSearchChange} search={search} key={list.id} list={list}/>
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