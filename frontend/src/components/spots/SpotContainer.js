import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



export default function SpotContainer({ spot }) {
    const history = useHistory();
    let rating = Math.round(spot.avgRating * 100) / 100;
    rating = rating.toFixed(2)
    if (!rating) rating = "New"
    return (
        <div title={spot.name} className="tile"
            onClick={() => {

                history.push(`/spots/${spot.id}`)
            }}>
            <img src={spot.previewImage} />
            <div className="tile-content">
                <span className="tile-content-info location">
                    {spot.city}, {spot.state}
                </span>
                <span className="tile-content-info">
                    ${spot.price} night
                </span>
                <span className="tile-content-review">
                    <i className="fa-solid fa-star"></i>

                    {rating}</span>

            </div>

        </div>
    )
}
