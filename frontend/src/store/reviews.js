import { csrfFetch } from "./csrf";
const GETREVIEWSBYSPOT = '/reviews/spotId'
const POSTREVIEW = '/reviews/post'

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

const initialState = { spot: {}, user: {} }
export default function reviewsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETREVIEWSBYSPOT:
            newState = Object.assign({}, state)
            newState.spot = { ...newState.spot }
            newState.spot.User = { ...newState.spot.User }
            action.data.Reviews.forEach((review) => {
                newState.spot[review.id] = review;
            })
            return newState;
        case POSTREVIEW:
            newState = Object.assign({}, state)
            newState.spot = { ...newState.spot }
            newState.spot.User = { ...newState.spot.User }

            newState.spot[action.data.id] = action.data;
            return newState;

        default:
            return state;

    }


}
