import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserSpotsThunk } from '../../store/spots';
import SpotContainer from './SpotContainer';
export default function ManageSpots() {
    const history = useHistory();
    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots.allSpots))
    const user = useSelector((state) => state.session.user)
    const userId = user.id

    const userSpots = spots.filter((spot) => spot.ownerId == userId)
    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [dispatch])




    return (
        <>
            <h2>Manage Your Spots</h2>
            <button
                onClick={() => {
                    history.push('/spots/new')

                }}
            >Create a New Spot</button>
            <div className="spots-grid">
                {userSpots.map(spot => {
                    return (
                        <div>
                            <SpotContainer key={spot.id} spot={spot} />

                            <button
                            // onClick={ }

                            >Update</button>
                            <button>Delete</button>
                        </div>)

                })}
            </div>


        </>
    )
}
