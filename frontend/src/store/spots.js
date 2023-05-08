import { csrfFetch } from "./csrf";

const GETSPOTS = '/spots/GETSPOTS'
const GETSPOTDETAILS = '/spots/getspotdetails'
const CREATESPOT = '/spots/CREATESPOT'


export function loadSpots(data) {
    return {
        type: GETSPOTS,
        data
    }
}
export function getSpot(data) {
    return {
        type: GETSPOTDETAILS,
        data
    }
}
export function createSpot(data) {
    return {
        type: CREATESPOT,
        data
    }
}





export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const data = await response.json()

    dispatch(loadSpots(data))
    return data;

}


export const getSpotDetailsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)
    const data = await response.json();

    dispatch(getSpot(data))
    return data;
}
export const createSpotThunk = (body) => async dispatch => {
    const response = await csrfFetch('/api/spots',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify(body)
            }
        })
    const data = await response.json();
    dispatch(createSpot(data))
    return data;
}

const initialState = {};

export default function spotsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETSPOTS:

            newState = Object.assign({}, state)
            action.data.Spots.forEach((spot) => {
                newState[spot.id] = spot;
            });
            return newState;
        // case GETSPOTDETAILS:
        //     newState = Object.assign({}, state)
        //     newState[action.data.id] = action.data;
        //     return newState;

        case CREATESPOT:
            newState = Object.assign({}, state)
            newState[action.data.id] = action.data;
            return newState;

        default:
            return state;
    }
}

export function singleSpotReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETSPOTDETAILS:
            newState = Object.assign({}, state)
            newState[action.data.id] = action.data;
            return newState;
        default:
            return state;
    }
}
