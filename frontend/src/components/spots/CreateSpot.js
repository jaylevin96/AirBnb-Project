import React, { useEffect, useHistory, useState } from 'react'

import { useDispatch } from 'react-redux'
export default function CreateSpot() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const [submitAttempt, setSubmitAttempt] = useState(false)
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
        if (!endings.includes(previewImage.slice(-5))) errors.preview = "Preview image URL must end in .png, .jpg, or .jpeg"
        if (image1.length && !endings.includes(image1.slice(-5))) errors.image1 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image2.length && !endings.includes(image2.slice(-5))) errors.image2 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image3.length && !endings.includes(image3.slice(-5))) errors.image3 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image4.length && !endings.includes(image4.slice(-5))) errors.image4 = "Image URL must end in .png, .jpg, or .jpeg"
        setValidationErrors(errors)


    }, [country, address, city, state, description, name, price, previewImage, image1, image2, image3, image4])

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitAttempt(true)
        if (Object.values(validationErrors).length) return;

    }

    return (<>
        <h2>Create a New Spot</h2>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <form onSubmit={handleSubmit}>
            <label>
                Country
                {submitAttempt && (<span className="form-error">{validationErrors.country}</span>)}
                <input type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}></input>
            </label>
            <label>Street address
                {submitAttempt && (<span className="form-error">{validationErrors.address}</span>)}
                <input type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}></input>
            </label>
            <label>State
                {submitAttempt && (<span className="form-error">{validationErrors.state}</span>)}
                <input type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}></input>
            </label>
            <h3>Describe your place to guests</h3>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

            <input type="text" placeholder="Please write at least 30 characters."
                value={description}
                onChange={(e) => setDescription(e.target.value)}

            ></input>
            {submitAttempt && (<span className="form-error">{validationErrors.description}</span>)}

            <h3>Create a title for your spot</h3>
            <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

            <input type="text" placeholder="Name of your spot"
                value={name}
                onChange={(e) => setName(e.target.value)}></input>
            {submitAttempt && (<span className="form-error">{validationErrors.name}</span>)}

            <h3>Set a base price for your spot</h3>
            <p>Competitive pricing can help your listing stand out and rank higher in search results</p>

            <input type="number" placeholder="Price per night (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}></input>
            {submitAttempt && (<span className="form-error">{validationErrors.price}</span>)}

            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>

            <input type="url" placeholder="Preview Image URL"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
            ></input>
            {submitAttempt && (<span className="form-error">{validationErrors.preview}</span>)}

            <input type="url" placeholder="Image URL"
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
            ></input>
            {submitAttempt && (<span className="form-error">{validationErrors.image1}</span>)}
            <input type="url" placeholder="Image URL"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}></input>
            {submitAttempt && (<span className="form-error">{validationErrors.image2}</span>)}
            <input type="url" placeholder="Image URL"
                value={image3}
                onChange={(e) => setImage3(e.target.value)}></input>
            {submitAttempt && (<span className="form-error">{validationErrors.image3}</span>)}
            <input type="url" placeholder="Image URL"
                value={image4}
                onChange={(e) => setImage4(e.target.value)}></input>
            {submitAttempt && (<span className="form-error">{validationErrors.image4}</span>)}
            <button type="submit">Create Spot</button>

        </form>
    </>)


}