import { useAuth } from "./AuthContext";
import React, { useContext, createContext } from "react";

const SubscriptionsContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

export const SubscriptionsProvider = ({ children }) => {
    const { token } = useAuth();

    const getAllSubscriptions = async () => {
        const response = await fetch(apiUrl + "/subscriptions", {
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    };

    return (
        <SubscriptionsContext.Provider value={{ getAllSubscriptions }}>
            {children}
        </SubscriptionsContext.Provider>
    )
}

export const useSubscriptions = () => {
    return useContext(SubscriptionsContext);
}
