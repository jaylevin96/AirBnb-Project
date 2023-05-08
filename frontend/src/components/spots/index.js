import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import SpotContainer from './SpotContainer'
export default function AllSpots() {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])


    return (
        <>
            {/* {spots.map((spot) => {
                return <li key={spot.id}>{spot.name}</li>
            })} */}
            {spots.map(spot => {
                return <SpotContainer key={spot.id} spot={spot} />
            })}


        </>
    )




}
