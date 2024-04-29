import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { DeviceHub as DeviceHubIcon, Security as SecurityIcon, AddCircle as AddCircleIcon } from '@mui/icons-material';

function DeviceManagement({ token }) {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:8082/mdm/devices', {
          headers: {
            'X-API-Key': token
          }
        });
        if (response.data.error) {
          throw new Error(response.data.message);
        }
        setDevices(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDevices();

    // Cleanup function
    return () => {
      // Cleanup tasks, if any
    };
  }, [token]);

  const handleAddDevice = () => {
    // Implement functionality to add a new device
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Device Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        onClick={handleAddDevice}
        style={{ marginBottom: '20px' }}
      >
        Add New Device
      </Button>
      <List>
        {devices.map((device, index) => (
          <ListItem key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Device {index + 1}</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <DeviceHubIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Name: ${device.name}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Model: ${device.hardwareInfo.model}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Serial Number: ${device.hardwareInfo.serialNumber}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={`User Name: ${device.userName}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Management Mode: ${device.managementMode}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Last Policy Sync Time: ${device.lastPolicySyncTime}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Policy Compliant: ${device.policyCompliant ? 'Yes' : 'No'}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Security Posture: ${device.securityPosture.devicePosture}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText primary={`State: ${device.state}`} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DeviceManagement;
