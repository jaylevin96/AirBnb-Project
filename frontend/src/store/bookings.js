import { csrfFetch } from "./csrf"

const GETBOOKINGS = '/spot/bookings'
const CREATEBOOKING = '/spot/booking/new'

export function getBookings(data, id) {
    return {
        type: GETBOOKINGS,
        data,
        id
    }
}
export function createBooking(data, id) {
    return {
        type: CREATEBOOKING,
        data,
        id
    }
}

export const getSpotBookingsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`)
    const data = await response.json()
    dispatch(getBookings(data, id))
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
        case CREATEBOOKING:
            newState = Object.assign({}, state);
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            newState.spot[action.id] = action.data
            return newState;


        default:
            return state;
    }
}
