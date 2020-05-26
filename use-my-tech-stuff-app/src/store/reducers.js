//import actions
import {
     FETCH_RENTALSLIST_START,
     FETCH_RENTALSLIST_SUCCESS,
     FETCH_RENTALSLIST_FAILURE,
     DELETE_RENTAL_ITEM_FAILURE,
     DELETE_RENTAL_ITEM_START,
     DELETE_RENTAL_ITEM_SUCCESS
} from '../store/actions'


//initialState
const initialState = {
     listings: [],
     isFetching: false,
     error: false,
     errorMessage: '',
     deleteMessage: '',
}
//
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
          default:
               return state
     }
}