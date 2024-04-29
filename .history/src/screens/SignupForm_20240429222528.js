import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Container, Typography, Link, Snackbar } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const response = await fetch('http://host.docker.internal:8080/auth/register', {
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
    <Container maxWidth="100%" maxhight="100%" sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}>
      <Card raised sx={{
        maxWidth: 400,
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Sign Up</Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
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
            <Typography variant="body2" align="center">
              Already have an account?
              <Link component={RouterLink} to="/login" sx={{ display: 'inline', ml: 1 }}>
                Login
              </Link>
            </Typography>
          </form>
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