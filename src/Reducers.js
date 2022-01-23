import axios from "axios";

const SET_ORDER_TYPE = 'SET_ORDER_TYPE';
const SET_CATEGORIES_SUCCESS = 'SET_CATEGORIES_SUCCESS';
const SET_CATEGORIES_FAIL = 'SET_CATEGORIES_FAIL';
const REQ_PRODUCTS_SUCCESS = 'REQ_PRODUCTS_SUCCESS';
const SET_PRODUCTS_SUCCESS = 'SET_PRODUCTS_SUCCESS';
const SET_PRODUCTS_FAIL = 'SET_PRODUCTS_FAIL';
const UPDATE_CART_LIST = 'UPDATE_CART_LIST';

const initialState = {
    location: 'EAT IN',
    categoryList: {
        loading: true,
    },
    productList: {
        productLoading: true,
    },
    carts: {
        cartIds: 0,
        cartLists: [],
        totalPrice: 0.0,
        totalItems: 0,
    }
}

export const changeCartList = (dispatch, cartIds, totalPrice, totalItems, cartList) => {
    return dispatch({type: UPDATE_CART_LIST, payload: {
        cartIds: cartIds,
        totalPrice: totalPrice,
        totalItems: totalItems,
        cartLists: cartList
        }
    })
}   

export const selectCurLocation = (dispatch, curLocation) => {
    if(curLocation==='EAT IN') return dispatch({type: SET_ORDER_TYPE, payload: 'EAT IN'});
    else return dispatch({type: SET_ORDER_TYPE, payload: 'TAKE OUT'});
};

export const listCategories = async (dispatch) => {
    console.log('listCategories')
    try {
        const { data } = await axios.get('/api/categories');
        console.log('listCategories data: ', data);
        return dispatch({
            type: SET_CATEGORIES_SUCCESS,
            payload: data,
        })
    } catch (error) {
        return dispatch({
            type: SET_CATEGORIES_FAIL,
            payload: error.message,
        })
    }
}

export const listProducts = async (dispatch, categoryName='') => {
    try {
        dispatch({
            type: REQ_PRODUCTS_SUCCESS,
        })
        const { data } = await axios.get(`http://localhost:5000/api/products?category=${categoryName}`)
        console.log('data:',data);
        return dispatch({
            type: SET_PRODUCTS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(error)
        return dispatch({
            type: SET_PRODUCTS_FAIL,
            payload: error.message,
        })
    }
}

export const locationReducer = (state=initialState, action) => {
    console.log(action, action.type)
    switch (action.type) {
        case SET_ORDER_TYPE:
            // console.log(state)
            return {...state, location: action.payload};
        case SET_CATEGORIES_SUCCESS:
            // console.log(state)
            return {...state, categoryList: {loading: false, categories: action.payload}};
        case SET_CATEGORIES_FAIL:
            // console.log(state)
            return {...state, categoryList: {loading: true, error: action.payload}};
        case REQ_PRODUCTS_SUCCESS:
                return {...state, productList: {productLoading: true,}};
        case SET_PRODUCTS_SUCCESS:
            return {...state, productList: {productLoading: false, products: action.payload}};
        case SET_PRODUCTS_FAIL:
            return {...state, productList: {productLoading: true, error: action.payload}};
        case UPDATE_CART_LIST:
            return {...state, carts: action.payload};
        default:
            return state;
    }
};