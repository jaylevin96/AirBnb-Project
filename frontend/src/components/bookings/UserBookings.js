import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings";
import BookingContainer from "./BookingContainer";
import "./bookings.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function UserBookings() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [loading, setLoading] = useState(true);
    const userBookings = Object.values(useSelector(state => state.bookings.user))
    useEffect(() => {
        dispatch(getUserBookingsThunk()).then(() => {
            setLoading(false)
        })
    }, [dispatch])
    let currentDate = new Date(new Date().setHours(0, 0, 0, 0))
    let futureBookings = userBookings.filter(booking => {
        let date = new Date(booking.startDate)

        return date >= currentDate
    })

    futureBookings = futureBookings.sort((a, b) => {
        let aStart = new Date(a.startDate)
        let bStart = new Date(b.startDate)
        return aStart - bStart
    })
    let pastBookings = userBookings.filter(booking => {
        let date = new Date(booking.endDate)
        return date < currentDate
    })
    pastBookings.sort((a, b) => {

        let aStart = new Date(a.startDate)
        let bStart = new Date(b.startDate)
        return bStart - aStart
    })


    // if (!userBookings.length) return <></>
    if (loading) return <></>




    return <>

        <h2>Upcoming trips</h2>
        <div className="bookings-container">
            {!futureBookings.length && (
                <>
                    <h3

                        style={{ textAlign: "left", margin: 0 }}>No trips booked...yet!</h3>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <button id="booking-start-searching"
                        onClick={() => {
                            history.push('/')
                        }}
                    >Start searching</button>
                </>)}
            {futureBookings.map(booking => {
                return (<div key={booking.id} className="booking-tile">
                    <BookingContainer booking={booking} future={true} />

                </div>)

            })}

        </div>
        {userBookings.length > 0 && pastBookings.length > 0 && (<h2 >Where you've been</h2>)}

        <div className="bookings-container">
            {pastBookings.map(booking => {
                return (<div key={booking.id} className="booking-tile">
                    <BookingContainer booking={booking} future={false} />

                </div>)
            })}
        </div>


    </>
}
