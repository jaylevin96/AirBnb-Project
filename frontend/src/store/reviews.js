import { csrfFetch } from "./csrf";
const GETREVIEWSBYSPOT = '/reviews/spotId'
const POSTREVIEW = '/reviews/post'
const GETEVIEWSBYUSER = '/reviews/current'
const DELETEREVIEW = '/reviews/delete'


export function getReviews(data) {
    return {
        type: GETREVIEWSBYSPOT,
        data
    }
}

export function postReview(data) {
    return {
        type: POSTREVIEW,
        data

    }
}
export function getReviewsCurrent(data) {
    return {
        type: GETEVIEWSBYUSER,
        data
    }
}
export function deleteReview(id) {
    return {
        type: DELETEREVIEW,
        id
    }
}

export const getReviewsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)
    const data = await response.json()
    dispatch(getReviews(data))

    return data;
}

export const postReviewsThunk = (id, body) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    dispatch(postReview(data))
    return data;
}
export const getReviewsCurrentThunk = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current')
    const data = await response.json();
    dispatch(getReviewsCurrent(data))
}

export const deleteReviewThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })
    const data = await response.json();
    dispatch(deleteReview(id))
    return data;
}

const initialState = { spot: {}, user: {} }
export default function reviewsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETREVIEWSBYSPOT:
            newState = Object.assign({}, state)
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }
            action.data.Reviews.forEach((review) => {
                newState.spot[review.id] = review;
            })
            return newState;
        case POSTREVIEW:
            newState = Object.assign({}, state)
            newState.spot = { ...newState.spot }
            newState.user = { ...newState.user }

            newState.spot[action.data.id] = action.data;
            return newState;

        case GETEVIEWSBYUSER:
            newState = Object.assign({}, state)
            newState.user = { ...newState.user }
            newState.spot = { ...newState.spot }
            action.data.Reviews.forEach((review) => {
                newState.user[review.id] = review;
            })
            return newState;
        case DELETEREVIEW:
            newState = Object.assign({}, state)
            newState.user = { ...newState.user }
            newState.spot = { ...newState.spot }
            delete newState.spot[action.id]
            delete newState.user[action.id]
            return newState;

        default:
            return state;

    }


}
