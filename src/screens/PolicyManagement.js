import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip
} from '@mui/material';
import { RefreshOutlined, InfoOutlined } from '@mui/icons-material';
import {PolicyManagementData} from '../helpers/mockData'
import {extractDeviceName} from '../helpers/index'
import PolicyModal from '../components/PolicyManagementModal';


function PolicyManagement() {
  const [policies, setPolicies] = useState(PolicyManagementData);
  const [open, setOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const handleRefresh = () => {
    // This function should handle the refresh logic, possibly fetching updated data
    console.log('Data refreshed');
  };

  const handleOpen = (policy) => {
    setSelectedPolicy(policy);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderPolicyDetails = (policy) => {
    if (!policy) return null;

    const details = Object.keys(policy).map((key) =>
      Array.isArray(policy[key]) ? (
        <Typography key={key}>
          {key}: {JSON.stringify(policy[key], null, 2)}
        </Typography>
      ) : (
        <Typography key={key}>
          {key}: {policy[key]}
        </Typography>
      )
    );

    return <Box sx={{ p: 2 }}>{details}</Box>;
  };

  return (
    <div style={{ padding: 10, marginTop: 10 }}>
      <Box sx={{ margin: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={handleRefresh} startIcon={<RefreshOutlined />}>
          Refresh Data
        </Button>
        <PolicyModal />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Policy Name</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {extractDeviceName(policy.name)}
                </TableCell>
                <TableCell>{policy.version}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(policy)} startIcon={<InfoOutlined />}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Policy Details</DialogTitle>
        <DialogContent>{selectedPolicy && renderPolicyDetails(selectedPolicy)}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PolicyManagement;
