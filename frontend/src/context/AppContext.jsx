import { createContext } from "react";  
export const AppContext = createContext();
import { doctors } from "../assets/assets";

const AppContextProvider = ({ children }) => {

    const value={
        doctors
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;