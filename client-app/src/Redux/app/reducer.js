import { 
    SET_LOADING,
    SET_ERROR,
    SET_CONTRACT_INSTANCE
} from './actionTypes';

const initialState = {
    isLoading: false,
    isError: false,
    contract: {}
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        case SET_ERROR:
            return {
                ...state,
                isError: payload
            }
        case SET_CONTRACT_INSTANCE:
            return {
                ...state,
                contract: payload
            }
        default:
            return state
    }
}

export {reducer}