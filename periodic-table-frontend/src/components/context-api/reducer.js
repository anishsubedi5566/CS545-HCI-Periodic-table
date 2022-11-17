export const initialState = {
    elementsOpacity: 1
}

export const actionTypes = {
    SET_ELEMENT_OPACITY: 'SET_ELEMENT_OPACITY'
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_ELEMENT_OPACITY:
            return {
                ...state,
                elementsOpacity: action.elementsOpacity,
            }
        default:
            return state
    }
}

export default reducer