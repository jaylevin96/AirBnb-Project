import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
export default function ReviewDetail({ reviewId, spotId }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch])
    const reviews = Object.values(useSelector((state) => state.reviews.spot));
    if (!reviews.length) return <></>
    const reviewRecord = reviews.find((review) => review.id === reviewId)
    const { review, stars, User, createdAt } = reviewRecord;
    let firstName;
    if (User) {
        firstName = User.firstName
    }
    const year = createdAt.slice(0, 4)
    const month = createdAt.slice(5, 7)
    return (
        <div>
            <h4>{firstName}</h4>
            <span>{`${year} ${month} `}</span>
            <span>{`${stars} stars`}</span>
            <p>{review}</p>
        </div>



    )


}
