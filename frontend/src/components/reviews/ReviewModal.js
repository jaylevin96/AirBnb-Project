import React, { useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { postReviewsThunk } from "../../store/reviews";
export default function ReviewModal() {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector((state) => state.spots.singleSpot)

    return (
        <div>
            <h1>How was your stay?</h1>
            <input type="text" placeholder="Leave your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}></input>
            <div>
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

            </div>
            <button
                onClick={() => {
                    dispatch(postReviewsThunk(spot.id, { review, stars }))
                    closeModal();
                }}
                disabled={stars < 1 || review.length < 10}
            >Submit Your Review</button>
        </div>
    )
}
