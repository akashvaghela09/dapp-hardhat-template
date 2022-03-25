import { 
    SET_LOADING,
    SET_ERROR, 
    SET_CONTRACT_INSTANCE,
    SET_WALLET,
    SET_IS_AUTH
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

const setWallet = (payload) => {
    return {
        type: SET_WALLET,
        payload
    }
}

const setIsAuth = (payload) => {
    return {
        type: SET_IS_AUTH,
        payload
    }
}
export { 
    setLoading,
    setError,
    setContractInstance,
    setWallet,
    setIsAuth
}