import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpotDetailsThunk, getUserSpotsThunk } from '../../store/spots';
import SpotContainer from './SpotContainer';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteFormModal from './DeleteFormModal';

export default function ManageSpots() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [dispatch])
    const spots = Object.values(useSelector((state) => state.spots.allSpots))
    const user = useSelector((state) => state.session.user)
    if (!user) {
        return <Redirect to="/" />
    }

    const userId = user.id

    const userSpots = spots.filter((spot) => spot.ownerId == userId)





    return (
        <>
            <div id="manage-header">
                <h2>Manage Your Spots</h2>
                <button id="manage-create-new-spot-button"
                    onClick={() => {
                        history.push('/spots/new')

                    }}
                >Create a New Spot</button>
            </div>
            <div id="manage-spots-grid" className="spots-grid">
                {userSpots.map(spot => {
                    return (
                        <div id='manage-tile' key={spot.id}>
                            <SpotContainer spot={spot} />
                            <div id="manage-buttons-container">
                                <button id="manage-update-spot"
                                    onClick={() => {

                                        dispatch(getSpotDetailsThunk(spot.id))
                                        history.push(`/spots/${spot.id}/edit`)
                                    }}

                                >Update</button>
                                <button id="manage-delete-spot">
                                    <OpenModalMenuItem itemText="Delete"
                                        modalComponent={<DeleteFormModal spotId={spot.id} />} />


                                </button>

                            </div>

                        </div>)

                })}
            </div>


        </>
    )
}
