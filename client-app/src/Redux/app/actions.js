import { 
    SET_LOADING,
    SET_ERROR, 
    SET_CONTRACT_INSTANCE
} from './actionTypes';

const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload
    }
}

const setError = (payload) => {
    return {
        type: SET_ERROR,
        payload
    }
}

const setContractInstance = (payload) => {
    return {
        type: SET_CONTRACT_INSTANCE,
        payload
    }
}
export { 
    setLoading,
    setError,
    setContractInstance
}