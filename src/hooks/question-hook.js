import { useReducer } from 'react'

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA': {
            console.log('SET_DATA')
        }
        default:
            throw new Error('Špatný action v useQuestion()')
    }
}
export const useQuestion = (initState) => {
    const [questionState, dispatch] = useReducer(reducer, initState = null)

    const setData = (data) => {
        dispatch({type: 'SET_DATA', data: data})
    }

    return {questionState, setData}
}
