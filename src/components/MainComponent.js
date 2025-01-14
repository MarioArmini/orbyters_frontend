import React from 'react';
import {
    Container,
    Card,
    Typography,
    Button,
    Box,
    ThemeProvider,
    createTheme,
    useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid2';

export const MainComponent = ({ t }) => {
    const theme = useTheme();
    const muiTheme = createTheme();

    const actions = [
        { label: 'Connect Wallet', onClick: () => alert('Navigating to wallet connection') },
        { label: 'Start Trading', onClick: () => alert('Navigating to trading') },
        { label: 'Learn More', onClick: () => alert('Navigating to learn more') },
    ];

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
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card
                                    sx={{
                                        padding: 4,
                                        backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
                                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                                    }}
                                >
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
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Card
                                    sx={{
                                        padding: 4,
                                        backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
                                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                                    }}
                                >
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Container>
        </ThemeProvider>
    );
};
