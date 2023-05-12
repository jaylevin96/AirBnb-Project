import { deleteBookingThunk, getUserBookings, getUserBookingsThunk } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
export default function DeleteBookingModal({ bookingId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    return (
        <div>
            <h1>Confirm Cancellation</h1>
            <h3 id="confirm-delete-text">Are you sure you want to cancel this upcoming booking?</h3>
            <div id="delete-modal-buttons-container">
                <button id="delete" className="modal-delete-buttons"
                    onClick={() => {
                        dispatch(deleteBookingThunk(bookingId)).then(dispatch(getUserBookingsThunk())).then(closeModal)
                    }}
                >{`Yes (Cancel Booking)`}</button>
                <button id="keep" className="modal-delete-buttons"
                    onClick={() => closeModal()}
                >{`No (Keep Booking)`}</button>


            </div>
        </div>
    )
}
