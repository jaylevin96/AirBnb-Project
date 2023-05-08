import { csrfFetch } from "./csrf";

const GETSPOTS = '/spots/GETSPOTS'
const GETSPOTDETAILS = '/spots/getspotdetails'
const CREATESPOT = '/spots/CREATESPOT'
const CREATESPOTIMAGE = '/spots/CreateSpotImage'



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

export function createSpotImage(data, id) {
    return {
        type: CREATESPOTIMAGE,
        data,
        id
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
    console.log(body);

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

export const createSpotImageThunk = (id, body) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/images`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify(body)
            }
        })
    const data = await response.json();
    dispatch(createSpotImage(data, id))
    return data;
}

export const getUserSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');
    const data = await response.json();
    dispatch(getAllSpots(data))
    return data;

}

const initialState = { allSpots: {}, singleSpot: {} };

export default function spotsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETSPOTS:

            newState = Object.assign({}, state)
            newState.allSpots = { ...newState.allSpots }
            action.data.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            });

            return newState;
        // case GETSPOTDETAILS:
        //     newState = Object.assign({}, state)
        //     newState[action.data.id] = action.data;
        //     return newState;

        case CREATESPOT:
            newState = Object.assign({}, state)
            newState.singleSpot[action.data.id] = action.data;
            return newState;

        case GETSPOTDETAILS:
            newState = Object.assign({}, state)

            newState.singleSpot = action.data;

            return newState;

        case CREATESPOTIMAGE:
            newState = Object.assign({}, state)
            let images = [...newState.singleSpot[action.id].SpotImages]
            images.push(action.data)

            newState[action.id].SpotImages = images;

        default:
            return state;
    }
}

/* export function singleSpotReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETSPOTDETAILS:
            newState = Object.assign({}, state)
            newState.singleSpot[action.data.id] = action.data;
            return newState;
        case CREATESPOTIMAGE:
            newState = Object.assign({}, state)
            let images = [...newState[action.id].SpotImages]
            images.push(action.data)

            newState[action.id].SpotImages = images;
            return newState;
        default:
            return state;
    }
} */
