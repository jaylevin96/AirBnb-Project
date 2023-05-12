import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { getReviewsCurrentThunk } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewModal from "../reviews/ReviewModal";
import DeleteBookingModal from "./DeleteBookingModal";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";

export default function BookingContainer({ booking, future }) {
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        dispatch(getAllSpots()).then(dispatch(getReviewsCurrentThunk()))

    }, [dispatch])

    let spot = booking.Spot;
    let allSpots = Object.values(useSelector((state) => state.spots.allSpots))
    // let allPreviewImages = allSpots.map(spot => spot.previewImage)
    let preview = allSpots.find(spot => spot.id === booking.spotId)
    if (preview) {
        preview = preview.previewImage;
    }
    let startDate = booking.startDate
    let endDate = booking.endDate
    let user = useSelector((state) => state.session.user)
    let userSpotReview = Object.values(useSelector((state) => state.reviews.user))
    if (user) {
        userSpotReview = userSpotReview.filter((review) => review.userId === user.id && review.spotId === booking.spotId)
    }
    let userReviewed = userSpotReview.length;


    let startMonth = startDate.slice(5, 7)
    let endMonth = endDate.slice(5, 7)
    let startDay = startDate.slice(8)
    let endDay = endDate.slice(8)
    let startYear = startDate.slice(0, 4)
    let endYear = endDate.slice(0, 4)
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

    if (!spot) return <></>

    return <>
        {/* <BookingSpotDetail spot={spot} /> */}
        <img src={preview}
            onClick={() => history.push(`/spots/${spot.id}`)}
        ></img>

        <div id="booking-text-container">
            <h3 className="booking-text"
                onClick={() => history.push(`/spots/${spot.id}`)}>{spot.city}
            </h3>
            <h4 className="booking-text"
                onClick={() => history.push(`/spots/${spot.id}`)}>{spot.name}
            </h4>
            <ul id="booking-dates-container">
                {future && (<>
                    <li className="booking-dates">Reservation begins {`${months[startMonth]} ${startDay}, ${startYear}`}</li>
                    <li className="booking-dates">Ends {`${months[endMonth]} ${endDay}, ${endYear}`}</li>
                    <OpenModalButton buttonText="Cancel booking"
                        modalComponent={<DeleteBookingModal bookingId={booking.id} />} />
                    {/* <button>
                        <OpenModalMenuItem
                            itemText="Cancel booking"
                            modalComponent={/>}
                                />

                    </button> */}
                </>)}
                {!future && (<>
                    <li className="booking-dates"> Started {`${months[startMonth]} ${startDay}, ${startYear}`}</li>
                    <li className="booking-dates">Ended {`${months[endMonth]} ${endDay}, ${endYear}`}</li>
                    {!userReviewed && (<>

                        <OpenModalButton buttonText="Post your Review"
                            modalComponent={<ReviewModal spotInfo={spot} />} />
                    </>)}
                </>)}

            </ul>
        </div>
    </>
}
