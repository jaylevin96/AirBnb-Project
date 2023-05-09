import React from "react"
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { getSpotDetailsThunk } from "../../store/spots";
import { useDispatch } from "react-redux";
import "../spots/deleteModal.css"

export default function DeleteReviewModal({ reviewId, spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    return (
        <div>
            <h1>Confirm Delete</h1>
            <h3 id="confirm-delete-text">Are you sure you want to delete this review?</h3>
            <div id="delete-modal-buttons-container">
                <button id="delete" className="modal-delete-buttons"
                    onClick={() => {
                        dispatch(deleteReviewThunk(reviewId)).then(() => dispatch(getSpotDetailsThunk(spotId))).then(closeModal)
                    }}
                >{`Yes (Delete Review)`}</button>
                <button id="keep" className="modal-delete-buttons"
                    onClick={() => closeModal()}
                >{`No (Keep Review)`}</button>


            </div>
        </div>
    )
}
