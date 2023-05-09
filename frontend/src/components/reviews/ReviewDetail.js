import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReviewThunk, getReviewsThunk } from "../../store/reviews";
import { getSpotDetailsThunk } from "../../store/spots";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReviewModal";
export default function ReviewDetail({ reviewId, spotId }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch])
    const reviews = Object.values(useSelector((state) => state.reviews.spot));
    let user = useSelector((state) => state.session.user)
    if (!reviews.length) return <></>
    const reviewRecord = reviews.find((review) => review.id === reviewId)
    let { review, stars, User, createdAt } = reviewRecord;
    stars = new Array(stars).fill('');
    console.log(stars);
    let userIsReviewOwner;
    if (user) userIsReviewOwner = reviewRecord.userId === user.id;
    const deleteButtonClass = userIsReviewOwner ? "" : "hidden";
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
            {stars.map((star, index) => {
                return <span key={`star${index}`}><i className="fa-solid fa-star fa-lg review-stars"></i></span>
            })}
            {/* <span>{`${stars} stars`}</span> */}
            <p>{review}</p>
            <button id="review-delete-button" className={deleteButtonClass}>
                <OpenModalMenuItem itemText="Delete"
                    modalComponent={<DeleteReviewModal reviewId={reviewId} spotId={spotId} />} />


            </button>
        </div>



    )


}
