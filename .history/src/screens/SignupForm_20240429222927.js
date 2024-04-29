import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Container, Typography, Link, Snackbar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignupForm({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer dsfsd'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName
        })
      });

      if (!response.ok) {
        const message = await response.text();
        setErrorMessage(message);
        setOpen(true);
      } else {
        onSignup({ email, password });
        navigate('/login'); // Redirect to login page on successful signup
      }
    } else {
      setErrorMessage("Passwords don't match!");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Card raised>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, backgroundColor: blue[700] }}
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" align="center">
            Already have an account? <Link component={RouterLink} to="/login">Login</Link>
          </Typography>
        </CardContent>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignupForm;
