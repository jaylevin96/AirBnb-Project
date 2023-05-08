import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpotDetailsThunk, getUserSpotsThunk } from '../../store/spots';
import SpotContainer from './SpotContainer';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteFormModal from './DeleteFormModal';
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
                        <div key={spot.id}>
                            <SpotContainer spot={spot} />

                            <button
                                onClick={() => {

                                    dispatch(getSpotDetailsThunk(spot.id))
                                    history.push(`/spots/${spot.id}/edit`)
                                }}

                            >Update</button>
                            <button>
                                <OpenModalMenuItem itemText="Delete"
                                    modalComponent={<DeleteFormModal spotId={spot.id} />} />


                            </button>
                        </div>)

                })}
            </div>


        </>
    )
}
