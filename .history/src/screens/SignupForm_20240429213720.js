import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Container, Typography, Link } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';

function SignupForm({ onSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
                    first_name: firstName, // Assuming you have firstName state variable
                    last_name: lastName // Assuming you have lastName state variable
                })
            });
    
            if (!response.ok) {
                const message = await response.text();
                alert(`An error occurred: ${message}`);
            } else {
                onSignup({ email, password });
            }
        } else {
            // Handle password mismatch
            alert("Passwords don't match!");
        }
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
        </Container>
    );
}

export default SignupForm;
