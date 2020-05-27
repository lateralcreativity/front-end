//import actions
import {
     FETCH_RENTALSLIST_START,
     FETCH_RENTALSLIST_SUCCESS,
     FETCH_RENTALSLIST_FAILURE,
     DELETE_RENTAL_ITEM_FAILURE,
     DELETE_RENTAL_ITEM_START,
     DELETE_RENTAL_ITEM_SUCCESS,
     FETCH_SINGLE_ITEM_START,
     FETCH_SINGLE_ITEM_SUCCESS,
     FETCH_SINGLE_ITEM_FAILURE, 
     POST_ITEM
} from '../store/actions'


//initialState
const initialState = {
     listings: [],
     isFetching: false,
     error: false,
     errorMessage: '',
     deleteMessage: '',
     singleItem: {},
}

export const reducer = (state = initialState, action) => {
     switch(action.type) {
          case FETCH_RENTALSLIST_START:
               return{
                    ...state,
                    isFetching: true,
                    error: false,
                    errorMessage: '',
               }
          case FETCH_RENTALSLIST_SUCCESS:
               return{
                    ...state,
                    isFetching: false,
                    listings: action.payload,
                    error: false,
                    errorMessage: '',
               }
          case FETCH_RENTALSLIST_FAILURE:
               return{
                    ...state,
                    isFetching: false,
                    error: true,
                    errorMessage: action.payload
               }
          case DELETE_RENTAL_ITEM_START:
               return{
                    ...state,
                    isFetching: true,
                    error: false,
                    errorMessage: '',
                    deleteMessage: '',
               }
          case DELETE_RENTAL_ITEM_SUCCESS:
               return{
                    ...state,
                    isFetching: false,
                    error: false,
                    errorMessage: '',
                    deleteMessage: action.payload,
               }
          case DELETE_RENTAL_ITEM_FAILURE:
               return {
                    ...state,
                    isFetching: false,
                    error: true,
                    errorMessage: action.payload,
                    deleteMessage: '',
               }
          case FETCH_SINGLE_ITEM_START:
               return {
                    ...state,
                    isFetching: true,
                    error: false,
                    errorMessage: '',
               }
          case FETCH_SINGLE_ITEM_SUCCESS:
               return {
                    ...state,
                    singleItem: action.payload,
                    isFetching: false,
                    error: false,
                    errorMessage: '',
               }
          case FETCH_SINGLE_ITEM_FAILURE:
               return {
                    ...state,
                    isFetching: false,
                    error: true,
                    errorMessage: action.payload
               }
          case POST_ITEM:
               return {
                    ...state,
               }
          default:
               return state
     }
}