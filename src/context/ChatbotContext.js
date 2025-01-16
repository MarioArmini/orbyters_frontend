import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ChatbotContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

export const ChatbotProvider = ({ children }) => {
    const { token } = useAuth();

    const sendText = async (sendTextDto) => {
        const { inputs, conversationId, userId } = sendTextDto;
        const response = await fetch(apiUrl + "/mistral/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
             },
            body: JSON.stringify({ inputs, conversationId, userId }),
        });

        const data = await response.json();
        if (response.ok) {
            return data
        } else {
            throw new Error(data.message);
        }
    };

    return (
        <ChatbotContext.Provider value={{ sendText }}>
            {children}
        </ChatbotContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatbotContext);
};