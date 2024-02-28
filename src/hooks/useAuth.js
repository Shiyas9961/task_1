import { useSelector } from "react-redux"

//Just getting initial user values from redux state
export const useAuth = () => {
    return useSelector(state => state.authState)
}