import React from "react";
import { useSelector } from "react-redux";
export default function ReviewDetail({ reviewId }) {

    const reviews = Object.values(useSelector((state) => state.reviews.spot));
    const reviewRecord = reviews.find((review) => review.id === reviewId)
    if (!Object.values(reviewRecord).length) return <></>
    const { review, stars, User, createdAt } = reviewRecord;
    const year = createdAt.slice(0, 4)
    const month = createdAt.slice(5, 7)
    return (
        <div>
            <h4>{User.firstName}</h4>
            <span>{`${year} ${month} `}</span>
            <span>{`${stars} stars`}</span>
            <p>{review}</p>
        </div>



    )


}
