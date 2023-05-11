import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBookingThunk, getSpotBookingsThunk } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import "./bookingModal.css"

export default function BookingFormModal({ spot }) {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const { closeModal } = useModal();


    useEffect(() => {
        let errors = {};
        if (!startDate) errors.start = "Start date is required"
        if (!endDate) errors.end = "End date is required"
        setValidationErrors(errors);

    }, [startDate, endDate])

    function handleSubmit(e) {
        setHasSubmitted(true)
        e.preventDefault();

        if (Object.values(validationErrors).length) return;
        let res = dispatch(createBookingThunk(spot.id, { startDate, endDate })).then(closeModal).catch(async (res) => {
            let error = await res.json()
            error = error.errors;
            // console.log(error);
            let newErrors = {};
            if (error && error.endDate) {
                newErrors.end = error.endDate;

            }
            if (error && error.startDate) {

                newErrors.start = error.startDate;
            }
            if (!error) {
                console.log("got here");
                newErrors.message = "Sorry, you can not book a reservation for your own listing."
            }
            setValidationErrors(newErrors);
        })



    }
    console.log(validationErrors);

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
            {hasSubmitted && validationErrors.end && (<p className="booking-error">{"End date cannot be on or before the start date"}</p>)}
            <button type="submit">Request booking</button>
        </form>

    </>
}
