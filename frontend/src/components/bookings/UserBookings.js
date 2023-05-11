import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings";

export default function UserBookings() {
    const dispatch = useDispatch();
    const userBookings = Object.values(useSelector(state => state.bookings.user))
    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])
    let currentDate = new Date();
    let futureBookings = userBookings.filter(booking => {
        return booking.startDate > currentDate
    })
    let pastBookings = userBookings.filter(booking => {
        return booking.endDate < currentDate
    })


    if (!userBookings.length) return <></>



    return <>
        <h1>My Bookings</h1>
        <h2>Upcoming bookings</h2>
        {futureBookings.map(booking => {
            return <li key={booking.id}>{booking.name}</li>
        })}
        <h2>Past bookings</h2>

    </>
}
