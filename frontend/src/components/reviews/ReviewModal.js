import React, { useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { postReviewsThunk, getReviewsThunk } from "../../store/reviews";
import { getSpotDetailsThunk } from "../../store/spots";
import "./reviewModal.css"
export default function ReviewModal() {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector((state) => state.spots.singleSpot)

    return (
        <div id="container">
            <h1>How was your stay?</h1>
            <textarea placeholder="Leave your review here..."
                value={review}

                onChange={(e) => setReview(e.target.value)}></textarea>
            <div className="stars">
                <i className={stars >= 1 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}
                    onClick={() => {
                        setStars(1)
                    }}></i>
                <i className={stars >= 2 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"} onClick={() => {
                    setStars(2)
                }}></i>
                <i className={stars >= 3 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}
                    onClick={() => {
                        setStars(3)
                    }}
                ></i>
                <i className={stars >= 4 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}
                    onClick={() => {
                        setStars(4)
                    }}
                ></i>
                <i className={stars >= 5 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}
                    onClick={() => {
                        setStars(5)
                    }}
                ></i>
                <span> Stars</span>

            </div>
            <button
                onClick={() => {
                    dispatch(postReviewsThunk(spot.id, { review, stars })).then(() => { dispatch(getSpotDetailsThunk(spot.id)) }).then(closeModal)
                }}
                disabled={stars < 1 || review.length < 10}
            >Submit Your Review</button>
        </div>
    )
}
