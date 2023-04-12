import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import adminData from "./../dbs/admin.json";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://seosky.ro">
        SeoSky
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Admin() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('email') == "" && data.get('password') == "") {
      Swal.fire({
        icon: 'error',
        title: 'Eroare!',
        text: 'Va rugam introduceti adresa de email si parola!',
        footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
      });
    } else if(data.get('email') == ""){
      Swal.fire({
        icon: 'error',
        title: 'Eroare!',
        text: 'Va rugam introduceti adresa de email!',
        footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
      });
    } else if(data.get('password') == ""){
      Swal.fire({
        icon: 'error',
        title: 'Eroare!',
        text: 'Va rugam introduceti parola!',
        footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
      });
    } else {
      adminData.map(account => {
        if(data.get("email") == account.email && data.get("password") == account.password){
          Swal.fire({
            icon: 'success',
            title: 'Succes!',
            text: 'Autentificare...',
            timer: 3500,
            footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
          });
        } else if (data.get("email") != account.email && data.get("password") != account.password) {
          Swal.fire({
            icon: 'error',
            title: 'Eroare!',
            text: 'Adresa de email si parola nu corespund!',
            footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
          });
        } else if (data.get("email") != account.email ) {
          Swal.fire({
            icon: 'error',
            title: 'Eroare!',
            text: 'Adresa de email corespunde!',
            footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
          });
        } else if (data.get("password") != account.password) {
          Swal.fire({
            icon: 'error',
            title: 'Eroare!',
            text: 'Parola nu corespunde!',
            footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
          });
        }
      })
      // if(data.get("email") == adminData[0].email){
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error!',
      //     text: 'Please enter password!',
      //     footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
      //   });
      // }
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}