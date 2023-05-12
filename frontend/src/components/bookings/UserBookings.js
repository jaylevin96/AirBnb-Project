import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings";
import BookingContainer from "./BookingContainer";
import "./bookings.css"

export default function UserBookings() {
    const dispatch = useDispatch();
    const userBookings = Object.values(useSelector(state => state.bookings.user))
    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])
    let currentDate = new Date();
    let futureBookings = userBookings.filter(booking => {
        let date = new Date(booking.startDate)
        console.log("STARTING DATE", date);
        console.log("CURRENT DATE", currentDate);
        return date >= currentDate
    })
    let pastBookings = userBookings.filter(booking => {
        let date = new Date(booking.endDate)
        return date < currentDate
    })


    if (!userBookings.length) return <></>

    console.log(futureBookings);



    return <>

        <h2>Upcoming trips</h2>
        <div className="bookings-container">
            {futureBookings.map(booking => {
                return (<div key={booking.id} className="booking-tile">
                    <BookingContainer booking={booking} future={true} />

                </div>)

            })}

        </div>

        <h2>Where you've been</h2>
        <div className="bookings-container">
            {pastBookings.map(booking => {
                return (<div key={booking.id} className="booking-tile">
                    <BookingContainer booking={booking} future={false} />

                </div>)
            })}
        </div>


    </>
}
