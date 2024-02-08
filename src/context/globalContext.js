import { createContext, useState } from "react";

export const GlobalContext = createContext()


const GlobalProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null)

    return (
        <GlobalContext.Provider value={{ accessToken, setAccessToken }}>
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider