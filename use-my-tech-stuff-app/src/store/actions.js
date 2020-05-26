import { axiosWithAuth } from '../utils/axiosWithAuth'

export const FETCH_RENTALSLIST_START = 'FETCH_RENTALSLIST_START'
export const FETCH_RENTALSLIST_SUCCESS = 'FETCH_RENTALSLIST_SUCCESS'
export const FETCH_RENTALSLIST_FAILURE = 'FETCH_RENTALSLIST_FAILURE'

export const DELETE_RENTAL_ITEM_START = 'DELETE_RENTAL_ITEM_START'
export const DELETE_RENTAL_ITEM_SUCCESS = 'DELETE_RENTAL_ITEM_SUCCESS'
export const DELETE_RENTAL_ITEM_FAILURE = 'DELETE_RENTAL_ITEM_FAILURE'

export const fetchRentalsList = () => {
     return dispatch => {
          dispatch({ type: FETCH_RENTALSLIST_START })
          axiosWithAuth()
               .get(`/api/listings`)
               .then(response => {
                    console.log(response)
                    dispatch({ type: FETCH_RENTALSLIST_SUCCESS, payload: response.data })
               })
               .catch(err => {
                    console.log(err)
                    dispatch({ type: FETCH_RENTALSLIST_FAILURE, payload: err })
               })
     }
}

export const deleteRentalItem = (itemId) => {
     return dispatch => {
          dispatch({ type: DELETE_RENTAL_ITEM_START })
          axiosWithAuth()
               .delete(`/api/listings/${itemId}`)
               .then(response => {
                    console.log(response)
                    dispatch({ type: DELETE_RENTAL_ITEM_SUCCESS, payload: response.data.message })
               })
               .catch(err => {
                    console.log(err)
                    dispatch({ type: DELETE_RENTAL_ITEM_FAILURE, payload: err })
               })
     }
}
