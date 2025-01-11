import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {
  Container, Card, Typography, Avatar, Button, CircularProgress, Alert, Box, useTheme
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../../Theme';
import Grid from '@mui/material/Grid2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Profile = ({ t }) => {
  const { user, logout, fetchUser } = useAuth();
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);
  const theme = useTheme();
  const muiTheme = createTheme(theme);

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
        <Typography className="mt-2">{t('Loading your profile...')}</Typography>
      </Container>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const usageData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Projects Completed',
        data: [5, 10, 8, 15, 12, 20],
        backgroundColor: theme.palette.secondary.main,
      },
    ],
  };

  const notifications = [
    { id: 1, message: 'New project created successfully!' },
    { id: 2, message: 'Your subscription will expire in 5 days.' },
    { id: 3, message: 'AI Analysis for Project X completed.' },
  ];

  const actions = [
    { label: 'Create New Project', onClick: () => alert('Create project') },
    { label: 'Manage Integrations', onClick: () => alert('Manage integrations') },
    { label: 'Upgrade Plan', onClick: () => alert('Upgrade plan') },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', mt: 5 }}
      >
        <Container sx={{ paddingY: 4 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    textAlign: 'center',
                    padding: 4,
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                  }}
                >
                  <Avatar
                    src={`https://ui-avatars.com/api/?name=${user.name}`}
                    alt={`${user.name} ${user.surname}`}
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 3 }}
                  />
                  <Typography variant="h6">{`${user.name} ${user.surname}`}</Typography>
                  <Typography>{user.email}</Typography>
                  <Typography>
                    Roles: {user.roles.map((role) => role.Name).join(', ') || 'No roles assigned'}
                  </Typography>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 8 }}>
                <Card
                  sx={{
                    padding: 4,
                    backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                  }}
                >
                  <Typography variant="h6">Usage Statistics</Typography>
                  <Bar data={usageData} />
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12 }}>
                <Card
                  sx={{
                    padding: 4,
                    backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ mb: 2 }} variant="h6">Quick Actions</Typography>
                  <Grid sx={{ justifyContent: "center" }} container spacing={3}>
                    {actions.map((action, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Button
                          variant={theme.palette.mode === 'dark' ? 'outlined' : 'contained'}
                          sx={{ width: '100%' }}
                          onClick={action.onClick}
                        >
                          {action.label}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};
