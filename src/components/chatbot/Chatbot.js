import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, Container, List, ListItem, ListItemText, Divider, CircularProgress } from "@mui/material";
import { useChat } from '../../context/ChatbotContext';
import { SendTextDto } from "../../dtos/chatBot/sendTextDto";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

export const Chatbot = ({ t }) => {
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { user, fetchUser } = useAuth();
  const [initialLoading, setInitialLoading] = useState(true);
  const { sendText } = useChat();
  const [formData, setFormData] = useState({
    inputs: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        if (!user) {
          await fetchUser();
        }
      } catch (error) {
        console.error('Error fetching user in Profile:', error);
        navigate('/login');
      } finally {
        setInitialLoading(false);
      }
    };

    initialize();
  }, [fetchUser, navigate, user]);

  if (initialLoading) {
    return (
      <Container
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}
      >
        <CircularProgress />
        <Typography className="mt-2">{t('Loading...')}</Typography>
      </Container>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSend = async () => {
    const input = formData.inputs;

    if (!input || !input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);

    const sendTextDto = SendTextDto({ inputs: input });
    const botResponse = await sendText(sendTextDto);
    setIsTyping(true);

    setMessages((prev) => [...prev, { type: "bot", text: "" }]);
    simulateTyping(botResponse.generated_text);

    setFormData({ inputs: "" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const simulateTyping = (text) => {
    const words = text.split(' ');
    let wordIndex = 0;
    let letterIndex = 0;
    let displayedWord = '';
    
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        const currentWord = words[wordIndex];
      
        if (letterIndex < currentWord.length) {
          displayedWord += currentWord[letterIndex];
          setTypingMessage(displayedWord);
          letterIndex++;
        } else {
          displayedWord += ' ';
          setTypingMessage(displayedWord);
          wordIndex++;
          letterIndex = 0;
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);
        
        setMessages((prev) => [...prev, { type: "bot", text: text }]);
        
        setTypingMessage("");
      }
    }, 10);
  };

  return (
    <Container maxWidth="xl" sx={{ height: "100vh", display: "flex", flexDirection: "column", mt: 5 }}>
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
                  {/* QUESTION */}
                  {msg.type === "user" && (
                    <ListItem sx={{ justifyContent: "flex-end" }}>
                      <Box
                        sx={{
                          backgroundColor: "primary.light",
                          borderRadius: 2,
                          padding: 1,
                          maxWidth: "60%",
                          display: "inline-block",
                          textAlign: "right",
                        }}
                      >
                        <Typography>{msg.text}</Typography>
                      </Box>
                    </ListItem>
                  )}

                  {/* ANSWER */}
                  {msg.type === "bot" && (
                    <ListItem sx={{ justifyContent: "flex-start" }}>
                      <ListItemText
                        primary={
                          isTyping && messages[messages.length - 1].type === "bot"
                            ? typingMessage
                            : messages[messages.length - 1].text
                        }
                        sx={{
                          backgroundColor: "secondary.light",
                          borderRadius: 2,
                          padding: 1,
                          maxWidth: "60%",
                          display: "inline-block",
                        }}
                      />
                    </ListItem>
                  )}

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
              value={formData.inputs}
              onChange={(e) => setFormData({ ...formData, inputs: e.target.value })}
              onKeyUp={handleKeyPress}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
              {t("send")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
};
