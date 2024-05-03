import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Toolbar, Grid, AppBar , Drawer, IconButton, Typography, Button } from '@mui/material';
import Dashboard from './screens/Dashboard';
import DeviceManagement from './screens/DeviceManagement';
import PolicyManagement from './screens/PolicyManagement';
import DeviceTracking from './screens/DeviceTracking';
import OrderList from './screens/OrderList';
import ProductStock from './screens/ProductStock';
import Settings from './screens/Settings';
import LogOff from './screens/LogOff';
import LoginForm from './screens/LoginForm';
import SignupForm from './screens/SignupForm';
import PasswordResetForm from './screens/PasswordResetForm';
import NavBar from './screens/Navbar';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeviceHubIcon from '@mui/icons-material/DeviceHub'; // Replace with actual icon for Device Management
import PolicyIcon from '@mui/icons-material/Policy'; // Replace with actual icon for Policy Management
import TrackChangesIcon from '@mui/icons-material/TrackChanges'; // Replace with actual icon for Device Tracking
import ListAltIcon from '@mui/icons-material/ListAlt'; // Replace with actual icon for Order List
import InventoryIcon from '@mui/icons-material/Inventory'; 
import { blue, green } from '@mui/material/colors';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240;

const theme = createTheme({
    typography: {
      fontFamily: '"Fira Code", monospace',
    },
  });

function App() {
    const handleLogin = (credentials) => {
        // handle login
    };

    const handleSignup = (credentials) => {
        // handle signup
    };

    const handlePasswordReset = (email) => {
        // handle password reset
    };

    return (
        <ThemeProvider theme={theme}>

        <Router>
            <Grid container>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={2}>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                backgroundColor: '#212121', // Drawer background color
                                color: 'white' // Text color
                            },
                        }}
                    >
                        <Toolbar sx={{ backgroundColor: blue[700], color: 'white' }}>
                            <Typography variant="h6" noWrap component="div">
                                MDM
                            </Typography>
                        </Toolbar>
                        <List>
                            {['Dashboard', 'Device Management', 'Policy Management','Device Tracking','Settings'].map((text, index) => (
                                <ListItem button key={text} component={NavLink} to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                                    sx={{ '&.active': { backgroundColor: blue[500] } }}>
                                    <ListItemIcon>
                                        {/* You will replace this switch statement with the actual icons you want to use */}
                                        {index === 0 && <DashboardIcon sx={{ color: 'white' }} />}
                                        {index === 1 && <DeviceHubIcon  sx={{ color: 'white' }}/>}
                                        {index === 2 && <PolicyIcon sx={{ color: 'white' }} />}
                                        {index === 3 && <InventoryIcon sx={{ color: 'white' }} />}
                                        {index === 4 && <SettingsIcon sx={{ color: 'white' }} />}
                                        {/* ... other icons */}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </Grid>
                <Grid item xs={10}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/device-management" element={<DeviceManagement />} />
                        <Route path="/policy-management" element={<PolicyManagement />} />
                        <Route path="/order-list" element={<OrderList />} />
                        <Route path="/product-stock" element={<ProductStock />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/logoff" element={<LogOff />} />
                        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                        <Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />
                        <Route path="/reset-password" element={<PasswordResetForm onPasswordReset={handlePasswordReset} />} />
                    </Routes>
                </Grid>
            </Grid>
        </Router>  
        </ThemeProvider>
           
    );
}

export default App;