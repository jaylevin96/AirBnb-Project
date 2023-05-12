import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
import ReviewDetail from "./ReviewDetail";


export default function SpotReviews({ spotId, hidden }) {
    const dispatch = useDispatch();
    const reviews = Object.values(useSelector((state) => state.reviews.spot))
    const spotReviews = reviews.filter((review) => review.spotId === spotId)
    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch])
    if (!spotReviews.length && !hidden.length) {
        return <h3
            style={{ marginBottom: "1.5em" }}
        >Be the first to post a review!</h3>
    }
    if (!spotReviews) return (<></>)
    return (
        <>

            {spotReviews.reverse().map((review) => {


                return (<div key={review.id} className="review-post">

                    <ReviewDetail reviewId={review.id} spotId={spotId} />
                </div>)
            })}

        </>

    )



}
