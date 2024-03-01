import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tickets : [],
    listsObj : {
        "TO DO" : [],
        "IN PROGRESS" : [],
        "REVIEW" : [],
        "DONE" : []
    },
    projects : [],
    loading : false,
    currProject : null,
    error : null,
    ticket : {},
    singleTicketLoading : false
}

const listSlice = createSlice({
    name : 'card',
    initialState,
    reducers : {
        addNewCard : {

        },
        projectsRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        projectsSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                projects : action.payload
            }
        },
        projectsFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        getCurrProject : (state, action) => {
            return {
                ...state,
                currProject : action.payload
            }
        },
        getAllTicketsRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        getAllTicketsSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                tickets : action.payload,
                listsObj : {
                    "TO DO" : [],
                    "IN PROGRESS" : [],
                    "REVIEW" : [],
                    "DONE" : []
                }
            }
        },
        getAllTicketsFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        setListsObjToVal : (state, action) => {
            //console.log(action.payload)
            state.listsObj[(action.payload.ticketStatus).toUpperCase()].push(action.payload)
        },
        addNewTicketRequset : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        addNewTicketSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
            }
        },
        addNewTicketFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        getSingleTicketRequest : (state, action) => {
            return {
                ...state,
                singleTicketLoading : true
            }
        },
        getSingleTicketSuccess : (state, action) => {
            return  {
                ...state,
                singleTicketLoading : false,
                ticket : action.payload
            }
        },
        getSingleTicketFail : (state, action) => {
            return {
                ...state,
                singleTicketLoading : false,
                error : action.payload
            }
        },
        clearCurrentTicket : (state, action) => {
            return {
                ...state,
                ticket : {}
            }
        },
        ticketDragUpdateRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        ticketDragUpdateSuccess : (state, action) => {
            state.loading = false

            let newListObj = {...state.listsObj}

            let destinationArray = Array.from(state.listsObj[action.payload.destSts])

            let sourceArray = Array.from(state.listsObj[action.payload.srcSts])

            if(action.payload.destSts !== action.payload.srcSts){
                const itemInserted = sourceArray[action.payload.srcIndex]

                itemInserted.ticketStatus = action.payload.destSts

                sourceArray.splice(action.payload.srcIndex, 1)

                destinationArray.splice(action.payload.destIndex, 0, itemInserted)


                newListObj[action.payload.srcSts] = sourceArray
                newListObj[action.payload.destSts] = destinationArray
            }

            state.listsObj = newListObj
        },
        ticketDragUpdateFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        ticketUpdateRequest : (state, action) => {
            return {
                ...state,
                singleTicketLoading : true
            }
        },
        ticketUpdateSuccess : (state, action) => {
            return {
                ...state,
                singleTicketLoading : false,
            }
        },
        ticketUpdateFail : (state, action) => {
            return {
                ...state,
                singleTicketLoading : false,
                error : action.payload
            }
        },
        addNewCommentRequest : (state, action) => {
            return {
                ...state,
                singleTicketLoading : true
            }
        },
        addNewCommentSuccess : (state, action) => {
            return {
                ...state,
                singleTicketLoading : false
            }
        },
        addNewCommentFail : (state, action) => {
            return {
                ...state,
                singleTicketLoading : false,
                error : action.payload
            }
        },
        cleanLists : (state, action) => {
            return {
                ...state,
                listsObj : {
                    "TO DO" : [],
                    "IN PROGRESS" : [],
                    "REVIEW" : [],
                    "DONE" : []
                }
            }
        }
    }
})

export default listSlice.reducer

export const { 
    projectsRequest,
    projectsSuccess,
    projectsFail,
    getAllTicketsRequest,
    getAllTicketsSuccess,
    getAllTicketsFail,
    setListsObjToVal,
    addNewTicketRequset,
    addNewTicketSuccess,
    addNewTicketFail,
    getSingleTicketRequest,
    getSingleTicketSuccess,
    getSingleTicketFail,
    clearCurrentTicket,
    getCurrProject,
    ticketDragUpdateRequest,
    ticketDragUpdateSuccess,
    ticketDragUpdateFail,
    addNewCard,
    addNewCommentRequest,
    addNewCommentSuccess,
    addNewCommentFail,
    cleanLists
} = listSlice.actions