import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid'

const initialState = {
    lists : [
        {
            title : "TO DO",
            id : uuid(),
            cards : [
                {
                    id : uuid(),
                    text : "Todo list first card"
                }
            ]
        },
        {
            title : "IN PROGRESS",
            id : uuid(),
            cards : [
                {
                    id : uuid(),
                    text : "Progress list first card"
                },
                {
                    id : uuid(),
                    text : "Progress list second card"
                }
            ]
        },
        {
            title : "REVIEW",
            id : uuid(),
            cards : [
                {
                    id : uuid(),
                    text : "Review list first card"
                }
            ]
        },
        {
            title : "DONE",
            id : uuid(),
            cards : [
                {
                    id : uuid(),
                    text : "Done list first card"
                }
            ]
        }
    ]
}

const listSlice = createSlice({
    name : 'card',
    initialState,
    reducers : {
        addNewCard : (state, action) => {
                const newLists = state.lists.forEach(list => {
                    if(list.id === action.payload.id){
                        list.cards.push({
                            id : uuid(),
                            text : action.payload.text
                        })
                    }
                })
                return newLists
        },
        addNewList : (state, action) => {
            const newList = {
                id : uuid(),
                title : action.payload,
                cards : []
            }
            return {
                lists : [...state.lists, newList]
            }
        },
        cardChanged : (state, action) => {

            const { fromIndex, fromListId, endIndex, endListId } = action.payload
            
            if(fromListId === endListId){ 
                const newLists = state.lists.forEach(list => {
                    if(list.id === fromListId){
                        const card = list.cards.splice(fromIndex, 1)
                        list.cards.splice(endIndex, 0, ...card)
                    }
                })
                return newLists
            } 
            if(fromListId !== endListId){
                const startList = state.lists.find(list => list.id === fromListId)

                const card = startList.cards[fromIndex]

                const newList = state.lists.forEach(list => {
                    if(list.id === fromListId){
                        list.cards.splice(fromIndex, 1)
                    }
                    if(list.id === endListId){
                        list.cards.splice(endIndex, 0, card)
                    }
                })

                return newList
            }
        },
    }
})

export default listSlice.reducer

export const { 
    addNewCard,
    addNewList,
    cardChanged
} = listSlice.actions