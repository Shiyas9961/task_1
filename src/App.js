import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin";
import { useEffect } from "react";
import { logOut } from "./utils/logout";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {

  const { accessToken } = useSelector(state => state.authState)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(pathname === '/logout'){
      logOut(dispatch)
    }
  }, [pathname, dispatch])

  useEffect(() => {
    if(!accessToken){
      navigate('/login')
    }
  }, [accessToken, navigate])

  return (
    <Routes>
        <Route path="/" element={<Layout/>}>

          {/* Home Page */}
          <Route index element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
              }
          />

          {/* Profile Page */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Signin/>}/>
    </Routes>
  )
}

export default App;
