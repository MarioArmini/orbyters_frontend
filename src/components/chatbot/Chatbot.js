import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useChat } from "../../context/ChatbotContext";
import { SendTextDto } from "../../dtos/chatBot/sendTextDto";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

export const Chatbot = ({ t }) => {
  const [messages, setMessages] = useState([]);
  const { user, fetchUser } = useAuth();
  const [initialLoading, setInitialLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { sendText } = useChat();
  const [formData, setFormData] = useState({
    inputs: "",
    conversationId: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        if (!user) {
          await fetchUser();
        }
      } catch (error) {
        console.error("Error fetching user in Profile:", error);
        navigate("/login");
      } finally {
        setInitialLoading(false);
      }
    };

    initialize();
  }, [fetchUser, navigate, user]);

  if (initialLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
        <Typography className="mt-2">{t("Loading...")}</Typography>
      </Container>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSend = async () => {
    setIsTyping(true);

    const input = formData.inputs;

    if (!input || !input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);

    const sendTextDto = SendTextDto({
      inputs: input,
      userId: user.id,
      conversationId: formData.conversationId,
    });
    const botResponse = await sendText(sendTextDto);
    const conversationId = botResponse.conversationId;

    setFormData((prev) => ({ ...prev, conversationId }));

    setMessages((prev) => {
      const newMessages = [...prev, { type: "bot", text: "", isTyping: true }];
      const messageIndex = newMessages.length - 1;

      simulateTyping(botResponse.generated_text, messageIndex);

      return newMessages;
    });

    setFormData((previous) => ({ ...previous, inputs: "" }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const simulateTyping = (text, messageIndex) => {
    const words = text.split(" ");
    let wordIndex = 0;
    let letterIndex = 0;
    let displayedWord = "";

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        const currentWord = words[wordIndex];

        if (letterIndex < currentWord.length) {
          displayedWord += currentWord[letterIndex];
          letterIndex++;

          setMessages((prev) =>
            prev.map((msg, index) =>
              index === messageIndex ? { ...msg, text: displayedWord } : msg
            )
          );
        } else {
          displayedWord += " ";
          wordIndex++;
          letterIndex = 0;
        }
      } else {
        clearInterval(interval);

        setMessages((prev) =>
          prev.map((msg, index) =>
            index === messageIndex ? { ...msg, text, isTyping: false } : msg
          )
        );
        setIsTyping(false);
      }
    }, 10);
  };

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      {/* Chatbot Widget */}
      <iframe
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
      />

      {/* Chat UI */}
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            py: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: 2,
              overflow: "hidden",
            }}
          >
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
                            <Typography
                              component="div"
                              sx={{
                                backgroundColor: "secondary.main",
                                color: "text.chatColor",
                                borderRadius: 2,
                                padding: 1,
                                maxWidth: "60%",
                                display: "inline-block",
                                wordWrap: "break-word",
                                whiteSpace: "pre-wrap",
                              }}
                              dangerouslySetInnerHTML={{ __html: msg.text }}
                            />
                          }
                        />
                      </ListItem>
                    )}

                    {index < messages.length - 1 && (
                      <Divider sx={{ borderColor: "" }} />
                    )}
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
                onChange={(e) =>
                  setFormData({ ...formData, inputs: e.target.value })
                }
                onKeyUp={handleKeyPress}
                sx={{ mr: 2, zIndex: 2 }}
              />
              <Button
                disabled={isTyping}
                variant="contained"
                color="primary"
                onClick={handleSend}
              >
                {isTyping ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: "text.accents" }}
                  />
                ) : (
                  <SendIcon></SendIcon>
                )}
              </Button>
            </Box>
          </Paper>
        </Container>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
          <Typography sx={{ fontSize: "12px" }}>
            {t("chatbotFooterText")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
