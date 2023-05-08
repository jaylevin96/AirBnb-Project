import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailsThunk } from '../../store/spots';
import SpotReviews from '../reviews/SpotReviews';
export default function SpotDetails() {
    const params = useParams();
    let { spotId } = params;
    spotId = Number(spotId)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])
    let spots = Object.values(useSelector((state) => state.spots))
    let spot = spots.find((spot) => spot.id === spotId)

    if (!spot) return (<></>)
    // console.log("SPOT", spots);
    const { name, city, state, country, Owner: owner, price, avgStarRating, description, numReviews } = spot;
    let firstName, lastName;

    if (owner) {
        firstName = owner.firstName;
        lastName = owner.lastName;

    }
    return (
        <>
            <h2>{name}</h2>
            <span>
                {`${city}, ${state}, ${country}`}
            </span>
            <div className='images'></div>
            <div>
                <h3>{`Hosted by ${firstName} ${lastName}`}</h3>
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
            <div>
                <span>
                    <i className="fa-solid fa-star fa-lg"></i>
                    {`${avgStarRating} ${numReviews} reviews`}


                </span>
                <button>Post your review</button>

            </div>
            <SpotReviews spotId={spotId} />
        </>
    )


}
