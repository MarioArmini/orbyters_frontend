import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Container, useTheme } from '@mui/material';
import { AccountBalance, Star, ShoppingCart } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

export const SubscriptionComponent = ({ t }) => {

    const theme = useTheme();

    const plans = [
        {
            title: t("basicPlanTitle"),
            subtitle: t("basicPlanSubtitle"),
            price: "$9.99",
            icon: <AccountBalance />,
            description: t("basicPlanDescription"),
        },
        {
            title: t("premiumPlanTitle"),
            subtitle: t("premiumPlanSubtitle"),
            price: "$19.99",
            icon: <Star />,
            description: t("premiumPlanDescription"),
        },
        {
            title: t("ultimatePlanTitle"),
            subtitle: t("ultimatePlanSubtitle"),
            price: "$29.99",
            icon: <ShoppingCart />,
            description: t("ultimatePlanDescription"),
        },
    ];

    return (
        <Container sx={{mt: 5}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Typography sx={{ mb: 4, mt: 3, fontSize: "2rem" }}>
                    {t("subscriptionsText")}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Grid container spacing={4} justifyContent="center">
                    {plans.map((plan, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card elevation={6} sx={{ borderRadius: 5, backgroundColor: theme.palette.subCards.background1 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" gutterBottom>
                                        {plan.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
                                        {plan.subtitle}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ mr: 1 }}>{plan.icon}</Box>
                                        <Typography variant="h6" color="primary">
                                            {plan.price}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                        {plan.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant="contained" color="primary" size="large" fullWidth>
                                        {t("subscribeBtn")}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};