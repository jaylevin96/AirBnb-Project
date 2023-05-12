import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBookingThunk, getSpotBookingsThunk, getUserBookingsThunk } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import "./bookingModal.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getReviewsCurrentThunk } from "../../store/reviews";

export default function BookingFormModal({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const { closeModal } = useModal();


    useEffect(() => {
        let errors = {};
        if (!startDate) errors.start = "Start date is required"
        if (!endDate) errors.end = "End date is required"
        let start = new Date(startDate).setHours(0, 0, 0, 0)
        let end = new Date(endDate).setHours(0, 0, 0, 0)
        if (end <= start) errors.end = "End date can not be on or before Start date"
        setValidationErrors(errors);

    }, [startDate, endDate])

    function handleSubmit(e) {
        setHasSubmitted(true)
        e.preventDefault();

        if (Object.values(validationErrors).length) return;
        let res = dispatch(createBookingThunk(spot.id, { startDate, endDate })).then(dispatch(getUserBookingsThunk())).then(closeModal)
            .then(() => history.push('/bookings/current'))
            .catch(async (res) => {
                console.log(res);
                let error = await res.json()
                error = error.errors;
                // console.log(error);
                let newErrors = {};
                if (error && error.message === "Authentication required") {
                    newErrors.message = "You must be logged in to request a booking"
                }
                if (error && error.endDate) {
                    newErrors.end = error.endDate;

                }
                if (error && error.startDate) {

                    newErrors.start = error.startDate;
                }
                if (!error) {

                    newErrors.message = "Sorry, you can not book a reservation for your own listing."
                }
                setValidationErrors(newErrors);
                return
            })



    }


    return <>
        <h2 id="booking-header">Let's get started with your reservation</h2>
        <h3 id="booking-subheader">What dates are you looking to stay at {spot.name}? </h3>
        {hasSubmitted && validationErrors.message && (<p className="booking-error">{validationErrors.message}</p>)}
        <form id="booking-form" onSubmit={handleSubmit}>
            <label>Start Date</label>
            <input type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            ></input>
            {hasSubmitted && validationErrors.start && (<p className="booking-error">{validationErrors.start}</p>)}
            <label>End Date</label>
            <input type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}></input>
            {hasSubmitted && validationErrors.end && (<p className="booking-error">{validationErrors.end}</p>)}
            <button type="submit">Request booking</button>
        </form>

    </>
}
