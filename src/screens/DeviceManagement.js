import React, { useState, useEffect } from "react";
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Box,
  TextField,
} from "@mui/material";
import {
  Info as InfoIcon,
  Memory as MemoryIcon,
  Devices as DevicesIcon,
  MoreHoriz as MoreHorizIcon,
  Policy as PolicyIcon,
  Storage as StorageIcon,
  Timer as TimerIcon,
  RefreshOutlined,
} from "@mui/icons-material";
import QRCode from "qrcode.react";

import {
  MockEnvironmentEnabled,
  DeviceManagementData,
} from "../helpers/mockData";
import { extractDeviceName } from "../helpers/index";

function DeviceManagement({ token }) {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDeviceCount, setNewDeviceCount] = useState(0); // Counter for new devices

  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddDevice = (barcodeValue) => {
    const newDevice = {
      barcode: barcodeValue,
      isNew: true, // Flag to identify new devices
    };
    setDevices([...devices, newDevice]);
    setNewDeviceCount(newDeviceCount + 1); // Increment counter
  };
  const handleRefresh = () => {
    //call api again to refresh data
    console.log("Refreshed");
  };

  const handleOpen = (device) => {
    setSelectedDevice(device);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("/api2/mdm/devices", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.message);
        }
        setDevices(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    if (MockEnvironmentEnabled) {
      setLoading(false);
      setDevices(DeviceManagementData);
    } else {
      fetchDevices();
    }

    // Cleanup function
    return () => {
      // Cleanup tasks, if any
    };
  }, [token]);

  const renderDeviceDetails = (device) => {
    if (!device) return null;

    const details = Object.keys(device).map((key) => {
      if (
        typeof device[key] === "object" &&
        !Array.isArray(device[key]) &&
        device[key] !== null
      ) {
        return Object.keys(device[key]).map((subKey) => (
          <ListItem key={subKey}>
            <ListItemText
              primary={`${subKey}`}
              secondary={device[key][subKey]}
            />
          </ListItem>
        ));
      } else if (Array.isArray(device[key])) {
        return device[key].map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${key} ${index + 1}`}
              secondary={JSON.stringify(item, null, 2)}
            />
          </ListItem>
        ));
      } else {
        return (
          <ListItem key={key}>
            <ListItemText primary={`${key}`} secondary={device[key]} />
          </ListItem>
        );
      }
    });

    return <List>{details}</List>;
  };

  const RenderColumnItem = ({ children }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {children}
      </Box>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 10, marginTop: 10 }}>
      <Box
        sx={{
          margin: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
        variant="contained"
          onClick={handleOpenModal}
        >
          Add Device
        </Button>
        {newDeviceCount > 0 && (
          <Typography sx={{ color: "#4caf50" }}>
            New Devices: {newDeviceCount}
          </Typography>
        )}
        <Button  onClick={handleRefresh} color="primary" variant="outlined">
          <RefreshOutlined />
        </Button>
      </Box>

      <AddDeviceModal
        open={openModal}
        handleClose={handleCloseModal}
        handleAddDevice={handleAddDevice}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Device (Model)</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>Storage</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DeviceManagementData.map((device, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {extractDeviceName(device.name)}
                </TableCell>
                <TableCell component="th" scope="row">
                  <RenderColumnItem>
                    <DevicesIcon /> {device.hardwareInfo.model}
                  </RenderColumnItem>
                </TableCell>

                <TableCell component="th" scope="row">
                  <RenderColumnItem>
                    <MemoryIcon />{" "}
                    {Math.round(device.memoryInfo.totalRam / 1e9)} GB
                  </RenderColumnItem>
                </TableCell>

                <TableCell component="th" scope="row">
                  <RenderColumnItem>
                    <StorageIcon />{" "}
                    {Math.round(device.memoryInfo.totalInternalStorage / 1e9)}{" "}
                    GB
                  </RenderColumnItem>
                </TableCell>

                <TableCell component="th" scope="row">
                  <RenderColumnItem>
                    <Chip
                      label={device.state}
                      color={device.state === "ACTIVE" ? "success" : "error"}
                    />
                  </RenderColumnItem>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button onClick={() => handleOpen(device)}>
                    <MoreHorizIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Device Details</DialogTitle>
        <DialogContent>
          {selectedDevice && renderDeviceDetails(selectedDevice)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeviceManagement;

function AddDeviceModal({ open, handleClose, handleAddDevice }) {
  const [barcodeValue, setBarcodeValue] = useState("");

  const handleSave = () => {
    handleAddDevice(barcodeValue);
    setBarcodeValue(""); // Clear input for adding another one immediately
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Device</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="barcode"
          label="This value will come from the backend"
          type="text"
          fullWidth
          variant="outlined"
          value={barcodeValue}
          onChange={(e) => setBarcodeValue(e.target.value)}
        />
        {barcodeValue && (
          <Box sx={{ display: "flex",flexDirection:'column', alignItems:'center', justifyContent: "center", padding: 2 }}>
            <QRCode value={barcodeValue} size={128} level="H" includeMargin />
            <Typography sx={{ color: "gray" }}>
            This QR code will expire after 1 Hour
          </Typography>
          </Box>
          
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save and Add Another
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
