import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetailsThunk } from '../../store/spots';
import SpotReviews from '../reviews/SpotReviews';
import './spotDetails.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ReviewModal from '../reviews/ReviewModal';
import { getReviewsThunk } from '../../store/reviews';
export default function SpotDetails() {
    const params = useParams();
    let { spotId } = params;
    spotId = Number(spotId)
    const dispatch = useDispatch();
    let spot = useSelector((state) => state.spots.singleSpot)
    let user = useSelector((state) => state.session.user)

    // let spot = spots.singleSpot;
    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
        dispatch(getReviewsThunk(spotId))
    }, [dispatch, spotId])
    // let spot = spots.find((spot) => spot.id === spotId)
    // console.log("SPOT", spot);
    if (Object.values(spot).length < 2) return (<></>)
    console.log("SPOT", Object.values(spot));
    const { name, city, state, country, Owner: owner, price, avgStarRating, description, numReviews } = spot;

    let firstName, lastName;

    if (owner) {
        firstName = owner.firstName;
        lastName = owner.lastName;

    }
    let images = spot.SpotImages;
    let preview = images.find((image) => image.preview)
    let otherImages = images.filter((image) => !image.preview).slice(0, 4)
    let hiddenClassName = user ? "" : "hidden"

    if (user.id === spot.ownerId) {
        hiddenClassName = "hidden"
    }

    return (
        <>
            <h2>{name}</h2>
            <span>
                {`${city}, ${state}, ${country}`}
            </span>
            <div className='images'>
                <div id="preview">
                    <img src={preview.url} />
                </div>
                {otherImages.map((image, index) => {
                    return (<div id={`image${index}`} key={image.id}>
                        <img src={image.url} />
                    </div>)
                })}
            </div>
            <div id="info-grid">
                <div id="info">
                    <h3>{`Hosted by ${firstName} ${lastName}`}</h3>
                    <p>{description}</p>

                </div>
                <div className='reserve-button'>
                    <span>{`$${price} night`}</span>
                    {numReviews > 0 && (<span>
                        <i className="fa-solid fa-star"></i>
                        {avgStarRating}
                    </span>)}

                    {!numReviews && (<span>  <i className="fa-solid fa-star"></i>New</span>)}
                    {numReviews > 0 && (<span>{numReviews} reviews</span>)}
                    {/* <span>{`${numReviews ? `${numReviews} reviews` : "New"}`}</span> */}
                    <button>Reserve</button>
                </div>
            </div>
            <div id="review-summary">
                <span>
                    <i className="fa-solid fa-star fa-lg"></i>
                    {!numReviews && (<span>New</span>)}
                    {(numReviews > 0) && (<span>{`${avgStarRating} ${numReviews} reviews`}</span>)}
                    {/* {numReviews && (<span>)} */}
                    {/* {{ numReviews > 1 } && (<span>`${avgStarRating} ${numReviews} reviews`</span>)} */}



                </span>

                <button className={hiddenClassName}>
                    <OpenModalMenuItem itemText="Post your review"
                        modalComponent={<ReviewModal />} />

                </button>

            </div>
            <div className='reviews-container'>
                <SpotReviews spotId={spotId} />

            </div>
        </>
    )


}
