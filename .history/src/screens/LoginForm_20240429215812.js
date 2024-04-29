import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // import useHistory
import { Card, CardHeader, CardContent, TextField, Snackbar } from '@material-ui/core'; // import Snackbar
import MuiAlert from '@material-ui/lab/Alert'; // import MuiAlert
import { Link as RouterLink } from 'react-router-dom';
import { Container, Card, CardHeader, CardContent, TextField, FormControlLabel, Checkbox, Button, Link, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        history.push('/dashboard');
      } else {
        setMessage(data.message);
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
  <Container maxWidth="100%" sx={{
    display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
  }}>
    <Card raised sx={{
      maxWidth: 400,
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      textAlign: 'center'
    }}>
      <CardHeader title="Login to Account" titleTypographyProps={{ variant: 'h6' }}
                  subheader="Please enter your email and password to continue"
                  sx={{ paddingBottom: 0 }}
      />
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
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
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
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
            autoComplete="current-password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <FormControlLabel 
            control={
              <Checkbox value="remember" color="primary" checked={remember} 
              onChange={(e) => setRemember(e.target.checked)} />
            } 
            label="Remember me"
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            sx={{ mt: 3, mb: 2, backgroundColor: blue[700] }}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2" sx={{ display: 'block' }}>
            Forgot password?
          </Link>
          <Typography variant="body2" align="center">
            Don't have an account? 
            <Link component={RouterLink} to="/signup" sx={{ display: 'inline', ml: 1 }}>
              Sign Up
            </Link>
          </Typography>
        </form>
      </CardContent>
    </Card>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  </Container>
);
}

export default LoginForm; 
