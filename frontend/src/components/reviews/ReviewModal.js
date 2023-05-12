import React, { useState } from "react"
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { postReviewsThunk, getReviewsThunk } from "../../store/reviews";
import { getSpotDetailsThunk } from "../../store/spots";
import "./reviewModal.css"
import { getUserBookingsThunk } from "../../store/bookings";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function ReviewModal({ spotInfo }) {
    const history = useHistory()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0)
    const [activeStars, setActiveStars] = useState(0)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    let spot = useSelector((state) => state.spots.singleSpot)
    if (spotInfo) spot = spotInfo;

    const disabled = stars < 1 || review.length < 10


    return (
        <div id="container">
            <h1>How was your stay?</h1>
            {errors.message && <p style={{ color: "#ff5a5f" }} id="errors-message">{errors.message}</p>}
            <textarea placeholder="Leave your review here..."
                value={review}

                onChange={(e) => setReview(e.target.value)}></textarea>
            <div className="stars"

                onMouseLeave={() => setActiveStars(stars)}>
                <i className={activeStars >= 1 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}
                    style={activeStars >= 1 ? { color: "#ff5a5f" } : {}}
                    onClick={() => {
                        setStars(1)
                        setActiveStars(1)
                    }}
                    onMouseEnter={() => !stars ? setActiveStars(1) : ''}></i>
                <i className={activeStars >= 2 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}

                    style={activeStars >= 2 ? { color: "#ff5a5f" } : {}}
                    onClick={() => {
                        setStars(2)
                        setActiveStars(2)
                    }}
                    onMouseEnter={() => !stars ? setActiveStars(2) : ''}></i>
                <i className={activeStars >= 3 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}
                    style={activeStars >= 3 ? { color: "#ff5a5f" } : {}}
                    onClick={() => {
                        setStars(3)
                        setActiveStars(3)
                    }}
                    onMouseEnter={() => !stars ? setActiveStars(3) : ''}
                ></i>
                <i className={activeStars >= 4 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}
                    style={activeStars >= 4 ? { color: "#ff5a5f" } : {}}
                    onClick={() => {
                        setStars(4)
                        setActiveStars(4)
                    }}
                    onMouseEnter={() => !stars ? setActiveStars(4) : ''}
                ></i>
                <i className={activeStars >= 5 ? "fa-solid fa-star fa-lg" : "fa-regular fa-star fa-lg"}
                    style={activeStars >= 5 ? { color: "#ff5a5f" } : {}}
                    onClick={() => {
                        setStars(5)
                        setActiveStars(5)
                    }}
                    onMouseEnter={() => !stars ? setActiveStars(5) : ''}
                ></i>
                <span> Stars</span>

            </div>
            <button className={disabled ? "" : "canSubmit"}
                onClick={() => {
                    dispatch(postReviewsThunk(spot.id, { review, stars })).then(() => { dispatch(getSpotDetailsThunk(spot.id)) })
                        // .then(getUserBookingsThunk())
                        .then(closeModal).catch(async (res) => {
                            console.log(res);
                            const data = await res.json();
                            if (data && data.errors) {
                                setErrors(data.errors)
                            }
                            if (data.message) {
                                setErrors(data.message)
                            }
                        })
                    if (spotInfo) {
                        history.push(`/spots/${spot.id}`)
                    }
                }}
                disabled={disabled}
            >Submit Your Review</button>
        </div>
    )
}
