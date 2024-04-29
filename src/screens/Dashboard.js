import React from 'react';
import { Box, Container, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

// Replace these with actual icons from Material-UI or another icon library
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';

// Mock data for the table, replace with actual data
const deviceData = [
    { deviceName: 'Apple Watch', uuid: '3726472378023', employee: 'Khalid Alhazmi', location: 'Saudi Arabia', lastUpdated: '3 min ago', status: 'Active' },
    { deviceName: 'Apple Watch', uuid: '3726472378023', employee: 'Khalid Alhazmi', location: 'Saudi Arabia', lastUpdated: '3 min ago', status: 'DeActivated' }
];

const StyledChip = styled(Chip)({
    // Add styles for the chips based on the screenshot, for example:
    '&.Active': {
        backgroundColor: 'green',
        color: 'white',
    },
    '&.Pending': {
        backgroundColor: 'yellow',
        color: 'black',
    },
    '&.Rejected': {
        backgroundColor: 'red',
        color: 'white',
    },
});

function Dashboard() {
    // Component for the summary boxes
    const SummaryBox = ({ icon, title, value }) => (
        <Paper sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginRight: 2 }}>{icon}</Box>
            <Box>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="h6">{value}</Typography>
            </Box>
        </Paper>
    );

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ marginBottom: 4 }}>Dashboard</Typography>
            
            {/* Summary boxes */}
            <Grid container spacing={2} sx={{ marginBottom: 3}}>
                <Grid item xs={3}>
                    <SummaryBox icon={<DevicesIcon />} title="Total Devices" value="6040" />
                </Grid>
                <Grid item xs={3}>
                    <SummaryBox icon={<PeopleIcon />} title="Total Employees" value="2031" />
                </Grid>
                <Grid item xs={3}>
                    <SummaryBox icon={<AndroidIcon />} title="Android Devices" value="4000" />
                </Grid>
            
            </Grid>

            {/* Table for devices */}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Device Name</TableCell>
                            <TableCell>UUID</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Last Updated</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deviceData.map((row) => (
                            <TableRow key={row.uuid}>
                                <TableCell>{row.deviceName}</TableCell>
                                <TableCell>{row.uuid}</TableCell>
                                <TableCell>{row.employee}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.lastUpdated}</TableCell>
                                <TableCell>
                                    <StyledChip label={row.status} className={row.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Dashboard;
