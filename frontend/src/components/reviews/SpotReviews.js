import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
import ReviewDetail from "./ReviewDetail";


export default function SpotReviews({ spotId }) {
    const dispatch = useDispatch();
    const reviews = Object.values(useSelector((state) => state.reviews))
    const spotReviews = reviews.filter((review) => review.spotId === spotId)
    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch])


    if (!spotReviews) return (<></>)

    return (
        <>

            {spotReviews.map((review) => {


                return <ReviewDetail key={review.id} review={review} />
            })}

        </>

    )



}
