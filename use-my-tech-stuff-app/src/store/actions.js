import { axiosWithAuth } from '../utils/axiosWithAuth'

export const FETCH_RENTALSLIST_START = 'FETCH_RENTALSLIST_START'
export const FETCH_RENTALSLIST_SUCCESS = 'FETCH_RENTALSLIST_SUCCESS'
export const FETCH_RENTALSLIST_FAILURE = 'FETCH_RENTALSLIST_FAILURE'

export const DELETE_RENTAL_ITEM_START = 'DELETE_RENTAL_ITEM_START'
export const DELETE_RENTAL_ITEM_SUCCESS = 'DELETE_RENTAL_ITEM_SUCCESS'
export const DELETE_RENTAL_ITEM_FAILURE = 'DELETE_RENTAL_ITEM_FAILURE'

export const FETCH_SINGLE_ITEM_START = 'FETCH_SINGLE_ITEM_START'
export const FETCH_SINGLE_ITEM_SUCCESS = 'FETCH_SINGLE_ITEM_SUCCESS'
export const FETCH_SINGLE_ITEM_FAILURE = 'FETCH_SINGLE_ITEM_FAILURE'

export const POST_ITEM = 'POST_ITEM'

export const SET_ISEDITING = 'SET_ISEDITING'

export const PUT_ITEM = 'PUT_ITEM'

export const RENT_ITEM = 'RENT_ITEM'


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

export const fetchSingleItem = (id) => {
     return dispatch => {
          dispatch({ type: FETCH_SINGLE_ITEM_START })
          axiosWithAuth()
               .get(`/api/listings/${id}`)
               .then(response => {
                    console.log(response.data)
                    dispatch({ type: FETCH_SINGLE_ITEM_SUCCESS, payload: response.data })
               })
               .catch(err => {
                    console.log(err)
                    dispatch({ type: FETCH_SINGLE_ITEM_FAILURE, payload: err })
               })
     }
}

export const postItem = (itemFormValues, ownerId) => dispatch => {
     itemFormValues.owner_id = parseInt(ownerId)
     itemFormValues.is_currently_available = true
     itemFormValues.price_per_day_in_dollars = parseFloat(itemFormValues.price_per_day_in_dollars)
     console.log(itemFormValues)
     return (
          axiosWithAuth()
               .post(`/api/listings`, itemFormValues)
               .then(response => {
                    console.log(response.data)
                    const postItemAction = { type: POST_ITEM }
                    dispatch(postItemAction)
               })
               .catch(err => {
                    console.log(err)
               })
     )
}

export const setIsEditing = () => {
     return dispatch => {
          dispatch({ type: SET_ISEDITING })
     }
}

export const putItem = (editedItemFormValues, urlId, editingOwnerId) => dispatch => {
     editedItemFormValues.owner_id = parseInt(editingOwnerId)
     editedItemFormValues.is_currently_available = true
     editedItemFormValues.price_per_day_in_dollars = parseFloat(editedItemFormValues.price_per_day_in_dollars)
     console.log(editedItemFormValues)

     return (
          axiosWithAuth()
               .put(`/api/listings/${urlId}`, editedItemFormValues)
               .then(response => {
                    console.log(response.data)
                    const putItemAction = { type: PUT_ITEM }
                    dispatch(putItemAction)
               })
               .catch(err => console.log(err))
     )
}

export const rentItem = (renterId, singleItem) => dispatch => {
     const newItem = {
          id: singleItem.id,
          description: singleItem.description,
          is_currently_available: false,
          name: singleItem.name,
          owner_id: singleItem.owner_id,
          price_per_day_in_dollars: singleItem.price_per_day_in_dollars,
          renter_id: renterId,
          exchange_method: singleItem.exchange_method,
     }

     console.log(newItem)
     return (
          axiosWithAuth()
               .put(`api/listings/${singleItem.id}`, newItem)
               .then(response => {
                    console.log(response)
                    const rentItemAction = { type: RENT_ITEM }
                    dispatch(rentItemAction)
               })
               .catch(err => {
                    console.log(err)
               })
     )
}