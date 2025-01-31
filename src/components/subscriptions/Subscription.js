import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Container, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid2';
import { useSubscriptions } from "../../context/SubscriptionsContext";
import { CustomAnimatedButton } from '../shared/CustomAnimatedButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

export const SubscriptionComponent = ({ t }) => {

    const theme = useTheme();
    const { getAllSubscriptions } = useSubscriptions();
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const handleGetAll = async () => {
            const responseSubscriptions = await getAllSubscriptions();
            setSubscriptions(responseSubscriptions);
        };
    
        handleGetAll();
    }, [getAllSubscriptions]);

    return (
        <Container sx={{mt: 5}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Typography sx={{ mb: 4, mt: 3, fontSize: "2rem" }}>
                    {t("subscriptionsText")}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Grid container spacing={4} justifyContent="center">
                    {subscriptions.map((sub, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card elevation={6} sx={{ borderRadius: 5, backgroundColor: theme.palette.subCards.background1 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" gutterBottom>
                                        {sub.title}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.subCards.text1 }}>
                                        {t(sub.description)}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ mr: 1 }}>{sub.icon}</Box>
                                        <Typography variant="h6" color="primary">
                                            {sub.price} €
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                <CustomAnimatedButton text={t("subscribeBtn")}
                                        StartIcon={LibraryAddIcon}
                                        EndIcon={ArrowForwardIcon}
                                        backgroundColor={theme.palette.cards.buttonColor1}
                                        color={theme.palette.text.primary}
                                    >
                                    </CustomAnimatedButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};