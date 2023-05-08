import React from "react"
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { useDispatch } from "react-redux";
export default function DeleteFormModal({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    return (
        <div>
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to remove this spot from the listings?</h3>
            <button
                onClick={() => {
                    dispatch(deleteSpotThunk(spotId))
                    closeModal();
                }}
            >{`Yes (Delete spot)`}</button>
            <button
                onClick={() => closeModal()}
            >{`No (Keep Spot)`}</button>
        </div>

    )
}
