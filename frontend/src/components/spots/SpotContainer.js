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
            <div className="tile-content">
                <span className="tile-content-info">
                    {spot.city}, {spot.state}
                </span>
                <span className="tile-content-info">
                    ${spot.price} night
                </span>
                <span className="tile-content-review">
                    <i className="fa-solid fa-star"></i>

                    {spot.avgRating}</span>

            </div>

        </div>
    )
}
