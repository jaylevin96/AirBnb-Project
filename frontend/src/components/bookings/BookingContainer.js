import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { getReviewsCurrentThunk } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewModal from "../reviews/ReviewModal";

export default function BookingContainer({ booking, future }) {
    const dispatch = useDispatch();
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
    let userSpotReview = Object.values(useSelector((state) => state.reviews.spot))
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

    return <div key={booking.id} className="booking-tile">
        {/* <BookingSpotDetail spot={spot} /> */}
        <img src={preview}></img>

        <div id="booking-text-container">
            <h3 className="booking-text">{spot.city}</h3>
            <h4 className="booking-text">{spot.name} </h4>
            <ul id="booking-dates-container">
                {future && (<>
                    <li className="booking-dates">Reservation begins {`${months[startMonth]} ${startDay}, ${startYear}`}</li>
                    <li className="booking-dates">Ends {`${months[endMonth]} ${endDay}, ${endYear}`}</li>

                </>)}
                {!future && (<>
                    <li className="booking-dates"> Started {`${months[startMonth]} ${startDay}, ${startYear}`}</li>
                    <li className="booking-dates">Ended {`${months[endMonth]} ${endDay}, ${endYear}`}</li>
                    {!userReviewed && (<>
                        <button>
                            <OpenModalMenuItem
                                itemText="Post your Review"
                                modalComponent={<ReviewModal />}
                            />

                        </button>

                    </>)}
                </>)}

            </ul>
        </div>
    </div>
}
