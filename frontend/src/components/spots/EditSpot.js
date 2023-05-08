import { useSelector } from "react-redux"
import CreateSpot from "./CreateSpot"

export default function EditSpot() {
    const spot = useSelector((state) => state.spots.singleSpot)


    return <CreateSpot spot={spot} />
}
