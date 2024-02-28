import { 
    getAllTicketsFail, 
    getAllTicketsRequest, 
    getAllTicketsSuccess, 
    addNewTicketFail, 
    addNewTicketRequset, 
    addNewTicketSuccess, 
    getSingleTicketFail, 
    getSingleTicketRequest, 
    getSingleTicketSuccess, 
    ticketDragUpdateRequest,
    ticketDragUpdateSuccess,
    ticketDragUpdateFail,
    addNewCommentRequest,
    addNewCommentFail,
    addNewCommentSuccess
} from "../slices/listSilce"

//Get All tickets based on project
export const getAllTicketBasedOnProject = (privateAxios, projectId) => {
    return async (dispatch) => {
        try{
            dispatch(getAllTicketsRequest())
            const { data } = await privateAxios.get(`/prod/ticketProjects?projectId=${projectId}`)
            dispatch(getAllTicketsSuccess(data))
        }catch(error){
            console.log(error)
            dispatch(getAllTicketsFail(error.response.data.message))
        }
    }
}

//Add new ticket
export const AddNewTicketAction = (ticketData, privateAxios) => {
    return async (dispatch) => {
        try{
            dispatch(addNewTicketRequset())
            await privateAxios.post('/prod/ticket', ticketData)
            dispatch(addNewTicketSuccess())
            dispatch(getAllTicketBasedOnProject(privateAxios, ticketData.projectId))
        }catch(error){
            dispatch(addNewTicketFail(error.response.data.message))
            console.log(error)
        }
    }
}

//Get Single Ticket
export const getSingleTicket = (privateAxios, ticketId) => {
    return async (dispatch) => {
        try{
            dispatch(getSingleTicketRequest())

            const { data } = await privateAxios.get(`/prod/ticket?ticketId=${ticketId}`)

            dispatch(getSingleTicketSuccess(data))
        }catch(error){
            dispatch(getSingleTicketFail(error.response.data.message))
        }
    }
}

//Dragg Edit Ticket
export const editTicket = (ticketData, privateAxios, currProject) => {
    return async (dispatch) => {
        try{
            dispatch(ticketDragUpdateRequest())

            await privateAxios.patch('/prod/ticket', ticketData)

            dispatch(ticketDragUpdateSuccess())

            dispatch(getAllTicketBasedOnProject(privateAxios, currProject))
        }catch(error){
            dispatch(ticketDragUpdateFail(error.response.data.message))
        }
    }
}

//Add New Comment
export const addNewComment = (commentData, privateAxios, ticketId) => {
    return async (dispatch) => {
        try{
            dispatch(addNewCommentRequest())

            await privateAxios.post('/prod/ticketComments', commentData)

            dispatch(addNewCommentSuccess())

            dispatch(getSingleTicket(privateAxios, ticketId))
        }catch(error){
            dispatch(addNewCommentFail(error.response.data.message))
        }
    }
}

//Edit Ticket Info
export const editSingleTicket = (ticketData, privateAxios, ticketId) => {
    return async (dispatch) => {
        try{
            dispatch(addNewCommentRequest())

            await privateAxios.patch('/prod/ticket', ticketData)

            dispatch(addNewCommentSuccess())

            dispatch(getSingleTicket(privateAxios, ticketId))
        }catch(error){
            dispatch(addNewCommentFail(error.response.data.message))
        }
    }
}