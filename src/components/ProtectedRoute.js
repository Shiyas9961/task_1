import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const { accessToken } = useSelector(state => state.authState)

    if(!accessToken){
        return <Navigate to='/login'/>
    }

    return children
}

export default ProtectedRoute