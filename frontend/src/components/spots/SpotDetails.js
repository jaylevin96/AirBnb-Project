import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailsThunk } from '../../store/spots';
export default function SpotDetails() {
    const params = useParams();
    let { spotId } = params;
    spotId = Number(spotId)
    const dispatch = useDispatch();

    let spots = Object.values(useSelector((state) => state.spots))
    let spot = spots.find((spot) => spot.id === spotId)
    const { name, city, state, country, Owner: owner, price, avgStarRating, description, numReviews } = spot;

    return (
        <>
            <h2>{name}</h2>
            <span>
                {`${city}, ${state}, ${country}`}
            </span>
            <div className='images'></div>
            <div>
                <h3>{`Hosted by ${owner.firstName} ${owner.lastName}`}</h3>
                <p>{description}</p>

            </div>
            <div className='reserve-button'>
                <span>{`$${price}night`}</span>
                <span>
                    <i class="fa-solid fa-star"></i>
                    {avgStarRating}
                </span>
                <span>{`${numReviews}reviews`}</span>
                <button>Reserve</button>
            </div>
        </>
    )


}
