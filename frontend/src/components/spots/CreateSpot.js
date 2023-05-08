export default function CreateSpot() {

    return (<>
        <h2>Create a New Spot</h2>
        <h3>Where's your palce located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <form>
            <label>
                Country
                <input type="text"></input>
            </label>
            <label>Street address
                <input type="text"></input>
            </label>
            <label>State
                <input type="text"></input>
            </label>
            <h3>Describe your place to guests</h3>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

            <input type="text" placeholder="Please write at least 30 characters."></input>

            <h3>Create a title for your spot</h3>
            <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

            <input type="text" placeholder="Name of your spot"></input>

            <h3>Set a base price for your spot</h3>
            <p>Competitive pricing can help your listing stand out and rank higher in search results</p>

            <input type="number" placeholder="Price per night (USD)"></input>

            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>

            <input type="url" placeholder="Preview Image URL"></input>

            <input type="url" placeholder="Image URL"></input>
            <input type="url" placeholder="Image URL"></input>
            <input type="url" placeholder="Image URL"></input>
            <input type="url" placeholder="Image URL"></input>

            <button>Create Spot</button>

        </form>
    </>)


}
