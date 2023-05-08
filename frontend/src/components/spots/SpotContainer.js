import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



export default function SpotContainer({ spot }) {
    const history = useHistory();

    return (
        <div className="tile"
            onClick={() => {

                history.push(`/spots/${spot.id}`)
            }}>
            <img src={spot.previewImage} />
            <span>
                {spot.city},{spot.state}
            </span>
            <span>
                <i className="fa-solid fa-star"></i>

                {spot.avgRating}</span>
            <div>
                ${spot.price} night
            </div>

        </div>
    )
}
