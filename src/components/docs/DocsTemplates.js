export const DocsTemplate = {
    "gettingStarted": {
        "docIntroduction": ["introductionText"],
    },
    "features": {
        "widgetFeature": [
            "widgetText1",
            `<iframe
                src="/ChatBotWidget.html?headerColor=%23ff5722&buttonColor=%231e88e5&textColor=%23000000&backgroundColor=%23fafafa"
                title="Chatbot Widget"
                style={{
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    zIndex: 1,
                }}
/>`,  
                "widgetText2", 
                "\nheaderColor=%23{yourcolor}\nbuttonColor=%23{yourcolor}\ntextColor=%23{yourcolor}\nbackgroundColor=%23{yourcolor}",
                "widgetText3"
            ]
    }
};