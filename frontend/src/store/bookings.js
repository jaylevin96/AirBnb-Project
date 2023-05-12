import { csrfFetch } from "./csrf"

const GETBOOKINGS = '/spot/bookings'
const CREATEBOOKING = '/spot/booking/new'
const GETUSERBOOKINGS = '/booking/current'
const DELETEBOOKING = '/booking/delete'

export function getBookings(data, id) {
    return {
        type: GETBOOKINGS,
        data,
        id
    }
}
export function getUserBookings(data) {
    return {
        type: GETUSERBOOKINGS,
        data
    }
}
export function createBooking(data, id) {
    return {
        type: CREATEBOOKING,
        data,
        id
    }
}
export function deleteBooking(id) {
    return {
        type: DELETEBOOKING,
        id
    }
}

export const getSpotBookingsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`)
    const data = await response.json()
    dispatch(getBookings(data, id))
    return data;
}
export const getUserBookingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current')
    const data = await response.json();
    dispatch(getUserBookings(data))
    return data;
}

export const createBookingThunk = (id, body) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createBooking(data, id))
        return data;
    }
    else {
        const error = await response.json()
        return error;
    }

}
export const deleteBookingThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: "DELETE",
    })
    const data = await response.json();
    dispatch(deleteBooking(id))
}

const initialState = { user: {}, spot: {} }

export default function bookingsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETBOOKINGS:
            newState = Object.assign({}, state);
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            action.data.Bookings.forEach(booking => {
                newState.spot[action.id] = booking;
            })
            return newState;
        case GETUSERBOOKINGS:
            newState = Object.assign({}, state);
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            action.data.Bookings.forEach(booking => {
                newState.user[booking.id] = booking;
            })
            return newState;


        case CREATEBOOKING:
            newState = Object.assign({}, state);
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            newState.spot[action.data.id] = action.data
            newState.user[action.data.id] = action.data
            return newState;

        case DELETEBOOKING:
            newState = Object.assign({}, state);
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            delete newState.user[action.id]
            delete newState.spot[action.id]
            return newState;

        default:
            return state;
    }
}
