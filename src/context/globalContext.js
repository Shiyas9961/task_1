import { createContext, useState } from "react";

export const GlobalContext = createContext()


const GlobalProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null)

    return (
        <GlobalContext.Provider value={{ accessToken, setAccessToken, verifyJWT }}>
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider