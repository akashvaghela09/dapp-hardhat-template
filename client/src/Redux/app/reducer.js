import {
    SET_LOADING,
    SET_ERROR,
    SET_CONTRACT_INSTANCE,
    SET_WALLET,
    SET_IS_AUTH
} from './actionTypes';

const initialState = {
    isLoading: false,
    isError: false,
    contract: {},
    wallet: {},
    isAuth: false
}

const reducer = (state = initialState, { type, payload }) => {

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
        case SET_WALLET:
            return {
                ...state,
                wallet: payload
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: payload
            }
        default:
            return state
    }
}

export { reducer }