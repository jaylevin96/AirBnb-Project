import { csrfFetch } from "./csrf";
const GETREVIEWSBYSPOT = '/reviews/spotId'


export function getReviews(data) {
    return {
        type: GETREVIEWSBYSPOT,
        data
    }
}

export const getReviewsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    const data = await response.json()
    dispatch(getReviews(data))
    return data;
}

const initialState = {}
export default function reviewsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETREVIEWSBYSPOT:
            newState = Object.assign({}, state)
            action.data.Reviews.forEach((review) => {
                newState[review.id] = review;
            })
            return newState;
        default:
            return state;

    }


}
