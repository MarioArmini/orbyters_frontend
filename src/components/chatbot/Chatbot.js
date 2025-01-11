import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, Container, List, ListItem, ListItemText, Divider } from "@mui/material";

export const Chatbot = ({ t }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);

    const botResponse = `Hai detto: "${input}"`;
    setIsTyping(true);

    setMessages((prev) => [...prev, { type: "bot", text: "" }]);
    simulateTyping(botResponse);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const simulateTyping = (text) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].text = text;
          return updatedMessages;
        });
        setTypingMessage("");
      }
    }, 50); // typing speed
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", mt: 5 }}>
      <Container maxWidth="md" sx={{ flex: 1, display: "flex", flexDirection: "column", py: 4 }}>
        <Paper elevation={3} sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2, overflow: "hidden" }}>
          <Typography variant="h5" gutterBottom>
            {t("chatPageTitle") || "Chat"}
          </Typography>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 2,
              mb: 2,
              backgroundColor: "background.paper",
            }}
          >
            <List>
              {messages.map((msg, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems={msg.type === "user" ? "flex-end" : "flex-start"}>
                    <ListItemText
                      primary={
                        index === messages.length - 1 && isTyping && msg.type === "bot"
                          ? typingMessage
                          : msg.text
                      }
                      sx={{
                        textAlign: msg.type === "user" ? "right" : "left",
                        color: msg.type === "user" ? "primary.main" : "text.primary",
                        whiteSpace: "pre-wrap",
                      }}
                    />
                  </ListItem>
                  {index < messages.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t("typeYourMessage")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={handleKeyPress}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
              {t("send")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
