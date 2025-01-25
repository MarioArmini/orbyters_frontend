export const DocsTemplate = {
    "gettingStarted": {
        "docIntroduction": ["introductionText"],
    },
    "features": {
        "widgetFeature": [
            "widgetText1",
            `<iframe
        src="/ChatBotWidget.html"
        title="Chatbot Widget"
/>`,
      "widgetText2",
      `<iframe
        src="/ChatBotWidget.html"
        title="Chatbot Widget"
        onLoad={(e) => {
          const iframe = e.target.contentWindow;
          iframe.postMessage(
            {
              type: "CHATBOT_CONFIG",
              payload: {
                headerColor: "#001831",
                buttonColor: "#4caf50",
                textColor: "#212121",
                backgroundColor: "#ffffff",
                buttonHover: "#ffffff",
              },
            },
            "*"
          );
        }}
/>`,
      "widgetText3",
            `<iframe
        src="/ChatBotWidget.html"
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
        onLoad={(e) => {
          const iframe = e.target.contentWindow;
          iframe.postMessage(
            {
              type: "CHATBOT_CONFIG",
              payload: {
                headerColor: "#001831",
                buttonColor: "#4caf50",
                textColor: "#212121",
                backgroundColor: "#ffffff",
                buttonHover: "#ffffff",
              },
            },
            "*"
          );
        }}
/>`,  
                "widgetText4", 
            ]
    }
};