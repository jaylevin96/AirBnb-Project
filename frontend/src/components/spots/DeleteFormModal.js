import React from "react"
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { useDispatch } from "react-redux";
import "./deleteModal.css"
export default function DeleteFormModal({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    return (
        <div>
            <h1>Confirm Delete</h1>
            <h3 id="confirm-delete-text">Are you sure you want to remove this spot from the listings?</h3>
            <h4
                style={{ textAlign: "center", paddingTop: "1em" }}
            >This will cancel any future bookings</h4>
            <div id="delete-modal-buttons-container">
                <button id="delete" className="modal-delete-buttons"
                    onClick={() => {
                        dispatch(deleteSpotThunk(spotId))
                        closeModal();
                    }}
                >{`Yes (Delete Spot)`}</button>
                <button id="keep" className="modal-delete-buttons"
                    onClick={() => closeModal()}
                >{`No (Keep Spot)`}</button>


            </div>
        </div>

    )
}
