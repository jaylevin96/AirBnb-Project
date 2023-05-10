import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { createSpotThunk, createSpotImageThunk, editSpotThunk } from '../../store/spots';
import "./spotForm.css"
export default function CreateSpot({ spot, form }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const [submitAttempt, setSubmitAttempt] = useState(false)

    useEffect(() => {
        if (spot) {
            setAddress(spot.address)
            setCountry(spot.country)
            setCity(spot.city)
            setState(spot.state)
            setDescription(spot.description)
            setName(spot.name)
            setPrice(spot.price)

            let images = spot.SpotImages;
            let preview = images.find((image) => image.preview)
            if (preview) {

                setPreviewImage(preview.url)
            }

            let otherImages = images.filter((image) => !image.preview)

            if (otherImages[0]) {
                setImage1(otherImages[0].url)
            }
            if (otherImages[1]) {

                setImage2(otherImages[1].url)
            }
            if (otherImages[2]) {

                setImage3(otherImages[2].url)
            }
            if (otherImages[3]) {

                setImage4(otherImages[3].url)
            }

        }
    }, [spot])
    useEffect(() => {
        let errors = {}
        if (!country.length) errors.country = "Country is required"
        if (!address.length) errors.address = "Address is required"
        if (!city.length) errors.city = "City is required"
        if (!state.length) errors.state = "State is required"
        if (description.length < 30) errors.description = "Description needs a minimum of 30 characters"
        if (!name.length) errors.name = "Name is required"
        if (price < 1) errors.price = "Price is required"
        if (!previewImage.length) errors.preview = "Preview image is required"
        let endings = ['.png', '.jpg', '.jpeg']
        if (previewImage.length && !endings.includes(previewImage.slice(previewImage.lastIndexOf('.')))) errors.preview = "Preview image URL must end in .png, .jpg, or .jpeg"
        if (image1.length && !endings.includes(image1.slice(image1.lastIndexOf('.')))) errors.image1 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image2.length && !endings.includes(image2.slice(image2.lastIndexOf('.')))) errors.image2 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image3.length && !endings.includes(image3.slice(image3.lastIndexOf('.')))) errors.image3 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image4.length && !endings.includes(image4.slice(image4.lastIndexOf('.')))) errors.image4 = "Image URL must end in .png, .jpg, or .jpeg"
        setValidationErrors(errors)


    }, [country, address, city, state, description, name, price, previewImage, image1, image2, image3, image4])



    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitAttempt(true)

        if (Object.values(validationErrors).length) return;
        if (spot) {
            dispatch(editSpotThunk(spot.id, { country, address, city, state, description, name, price, lat: 0, lng: 0 }))
            history.push(`/spots/${spot.id}`)
        }
        else {
            const newSpot = await dispatch(createSpotThunk({ country, address, city, state, description, name, price, lat: 0, lng: 0 }))
            dispatch(createSpotImageThunk(newSpot.id, { url: previewImage, preview: true }))
            const images = [image1, image2, image3, image4]
            images.forEach((image) => {
                if (image) {
                    dispatch(createSpotImageThunk(newSpot.id, { url: image, preview: false }))
                }
            })
            history.push(`/spots/${newSpot.id}`)
        }
    }

    return (<div id="form-container">
        <h2>{spot ? "Update Spot" : "Create a New Spot"}</h2>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <form onSubmit={handleSubmit}>
            <label>
                Country
                {submitAttempt && (<span className="form-error">{validationErrors.country}</span>)}

            </label>
            <input type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}></input>
            <label>Street address
                {submitAttempt && (<span className="form-error">{validationErrors.address}</span>)}

            </label>
            <input type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}></input>
            <label>
                City
                {submitAttempt && (<span className="form-error">{validationErrors.city}</span>)}
            </label>
            <input type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            ></input>
            <label>State
                {submitAttempt && (<span className="form-error">{validationErrors.state}</span>)}
            </label>
            <input type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}></input>
            <h3>Describe your place to guests</h3>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

            <textarea placeholder="Please write at least 30 characters."
                value={description}
                onChange={(e) => setDescription(e.target.value)}

            ></textarea>
            {submitAttempt && (<span className="form-error bottom">{validationErrors.description}</span>)}

            <h3>Create a title for your spot</h3>
            <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

            <input type="text" placeholder="Name of your spot"
                value={name}
                onChange={(e) => setName(e.target.value)}></input>
            {submitAttempt && (<span className="form-error bottom">{validationErrors.name}</span>)}

            <h3>Set a base price for your spot</h3>
            <p>Competitive pricing can help your listing stand out and rank higher in search results</p>

            <input type="number" placeholder="Price per night (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}></input>
            {submitAttempt && (<span className="form-error bottom">{validationErrors.price}</span>)}

            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>

            <input type="url" placeholder="Preview Image URL"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
            ></input>
            {submitAttempt && (<span className="form-error bottom">{validationErrors.preview}</span>)}

            <input type="url" placeholder="Image URL"
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
            ></input>
            {submitAttempt && (<span className="form-error bottom">{validationErrors.image1}</span>)}
            <input type="url" placeholder="Image URL"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}></input>
            {submitAttempt && (<span className="form-error bottom">{validationErrors.image2}</span>)}
            <input type="url" placeholder="Image URL"
                value={image3}
                onChange={(e) => setImage3(e.target.value)}></input>
            {submitAttempt && (<span className="form-error bottom">{validationErrors.image3}</span>)}
            <input type="url" placeholder="Image URL"
                value={image4}
                onChange={(e) => setImage4(e.target.value)}></input>
            {submitAttempt && (<span className="form-error bottom">{validationErrors.image4}</span>)}
            <button type="submit">{`${form ? 'Update Spot' : 'Create Spot'}`}</button>

        </form>
    </div>)


}
