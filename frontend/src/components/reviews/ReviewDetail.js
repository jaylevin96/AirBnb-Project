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
    const months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }
    return (
        <div>
            <h4>{firstName}</h4>
            <span className="review-timestamp">{`${months[month]} ${year}  `}</span>
            <span>{`${stars} stars`}</span>
            <p>{review}</p>
        </div>



    )


}
