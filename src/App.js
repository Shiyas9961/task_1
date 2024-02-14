import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin";
import { useEffect } from "react";
import { logOut } from "./utils/logout";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";

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
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        </Route>
        <Route path="/login" element={<Signin/>}/>
    </Routes>
  )
}

export default App;
