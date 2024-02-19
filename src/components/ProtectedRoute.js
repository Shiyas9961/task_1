import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const { idToken, accessToken } = useSelector(state => state.authState)

    //console.log(accessToken)

    if(!idToken || !accessToken){
        return <Navigate  to="/login" />
    }
    return children
}

export default ProtectedRoute