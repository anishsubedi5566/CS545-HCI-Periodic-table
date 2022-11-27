import data from "../../PeriodicTableJSON.json";
export const initialState = {
    elements: data.elements,
    colorMap: {
        "noble gas": "#FFBC42",
        "alkaline earth metal": "#808000",
        "diatomic nonmetal": "#D81159",
        "polyatomic nonmetal": "#FF4500",
        "alkali metal": "#8F2D56",
        "transition metal": "#191970",
        "post-transition metal": "#218380",
        "lanthanide": "#9400D3",
        "actinide": "#EE82EE",
        "metalloid": "#73D2DE",
        "unknown, probably transition metal": "#191970",
        "unknown, probably post-transition metal": "#218380",
        "unknown, probably metalloid": "#73D2DE",
        "unknown, but predicted to be an alkali metal": "#8F2D56",
        "unknown, predicted to be noble gas": "#FFBC42"
    },
    elementsOpacity: 1,
    periodicDetails: false,
	periodicSelectedElement: undefined,
    periodicSearch: "hidebx",
    searchList: data.elements,
}

export const actionTypes = {
    SET_ELEMENT_OPACITY: 'SET_ELEMENT_OPACITY',
    SET_DETAILS_MODAL: 'SET_DETAILS_MODAL',
	SET_SELECTED_ELEMENT: 'SET_SELECTED_ELEMENT',
    SEARCH_UI_TOGGLE: 'SEARCH_UI_TOGGLE',
	SEARCH_LIST: 'SEARCH_LIST',
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_ELEMENT_OPACITY:
            return {
                ...state,
                elementsOpacity: action.elementsOpacity,
            }
        case actionTypes.SET_DETAILS_MODAL:
            return {
                ...state,
                periodicDetails: action.periodicDetails,
            }
        case actionTypes.SET_SELECTED_ELEMENT:
            return {
                ...state,
                periodicSelectedElement: action.periodicSelectedElement,
            }
        case actionTypes.SEARCH_UI_TOGGLE:
            return {
                ...state,
                periodicSearch: action.periodicSearch,
            }
        case actionTypes.SEARCH_LIST:
            return {
                ...state,
                searchList: action.searchList,
            }
        default:
            return state
    }
}

export default reducer