import React from 'react';
import {
    Container,
    Card,
    Typography,
    Button,
    Box,
    ThemeProvider,
    createTheme,
    useTheme,
    Paper,
    IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Carousel from 'react-material-ui-carousel';
import { CustomAnimatedButton } from './shared/CustomAnimatedButton';
import ArticleIcon from '@mui/icons-material/Article';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { alpha } from '@mui/material/styles';


export const MainComponent = ({ t }) => {
    const theme = useTheme();
    const muiTheme = createTheme();

    return (
        <ThemeProvider theme={muiTheme}>
            <Container
                maxWidth="xl"
                sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', mt: 5 }}
            >
                <Container sx={{ paddingY: 4 }}>
                    <Box sx={{ flexGrow: 1, mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 12 }}>
                                <Typography fontSize={"2.5rem"}>
                                    {t("mainPageTitle")}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        padding: 4,
                                        backgroundColor: theme.palette.cards.background1,
                                        color: theme.palette.text.primary,
                                        borderRadius: 5
                                    }}
                                >
                                    <Typography variant="h5" mb={2}>
                                        {t("sliderTitle")}
                                    </Typography>
                                    <Carousel
                                        interval={3000}
                                        animation="slide"
                                        indicators={false}
                                    >

                                        <Paper key={1} sx={{ textAlign: 'center', padding: 2, backgroundColor: "transparent" }}>
                                            <Typography variant="body1" mt={2}>
                                                test1
                                            </Typography>
                                        </Paper>

                                        <Paper key={2} sx={{ textAlign: 'center', padding: 2, backgroundColor: "transparent" }}>
                                            <Typography variant="body1" mt={2}>
                                                test2
                                            </Typography>
                                        </Paper>

                                    </Carousel>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card
                                    sx={{
                                        padding: 4,
                                        backgroundColor: theme.palette.cards.background2,
                                        color: theme.palette.text.primary,
                                        borderRadius: 5
                                    }}
                                >
                                    <Typography variant="h5" mb={2}>
                                        {t("signUpBtnTitle")}
                                    </Typography>
                                    <Typography variant="body1" mb={3}>
                                        {t("signUpBtnSubtitle")}
                                    </Typography>
                                    <CustomAnimatedButton text={t("signUpBtnText")} StartIcon={AppRegistrationIcon} EndIcon={ArrowForwardIcon} backgroundColor={theme.palette.cards.buttonColor1} color={theme.palette.text.primary}></CustomAnimatedButton>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ flexGrow: 1, mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        padding: 4,
                                        backgroundColor: theme.palette.cards.background3,
                                        color: theme.palette.text.primary,
                                        borderRadius: 5
                                    }}
                                >
                                    <Typography variant="h5" mb={2}>
                                        {t("documentationTitle")}
                                    </Typography>
                                    <Typography variant="body1" mb={3}>
                                        {t("documentationSubtitle")}
                                    </Typography>
                                    <CustomAnimatedButton text={t("documentationBtn")} StartIcon={ArticleIcon} EndIcon={ArrowForwardIcon} backgroundColor={theme.palette.background.default} color={theme.palette.text.primary}></CustomAnimatedButton>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card
                                    sx={{
                                        padding: 4,
                                        backgroundColor: theme.palette.cards.background4,
                                        color: theme.palette.text.primary,
                                        borderRadius: 5
                                    }}
                                >
                                    <Typography variant="h5" mb={2}>
                                        {t("Card4Title")}
                                    </Typography>
                                    <Typography variant="body1" mb={3}>
                                        {t("card4SubTitle")}
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Container>
        </ThemeProvider>
    );
};
