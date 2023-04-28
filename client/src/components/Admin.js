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
import axios from "axios";
// import adminData from "./../dbs/admin.json";
// import adminToken from "./../dbs/admin_token.json";

import {useState, useEffect} from 'react';


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
  const [adminToken, setAdminToken] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [fill, setFill] = useState(false);
  const [once, setOnce] = useState(false);
  const [ip, setIP] = useState("");
  const [logs, setLogs] = useState([]);
  async function getToken () {
    const response =  await fetch('/get_A_D_M_I_NToken/?name=Alexie');
      console.log(response);
      const data =  await response.json();
      console.log(data[0].token);
      const responseAdmin =  await fetch('/getAdminData');
      const dataAdmin =  await responseAdmin.json();
      if(!fill) {
        setAdminToken(data)
        setAdminData(dataAdmin);
        console.log(dataAdmin);
        setFill(true)
      }
  }
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
    const response =  await fetch('/getAdminLog');
    console.log(response);
    const data =  await response.json();
    setLogs(data);
  }

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
    if(!fill){
      if(!once)
        getToken()
    }
  }, []);

  async function addLog(log) {
    console.log(JSON.stringify(log));
    fetch('/addAdminLog', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
      });
  }

  const queryParameters = new URLSearchParams(window.location.search);
  console.log(once)
  if(!once) {
  if(fill){
    
    console.log(adminToken);
    console.log("Hello")
    let op = true;
  if(localStorage.getItem('login') == 'true'){
          if(op){
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 2500,
      title: 'Succes!',
      text: 'Autentificare...',

      footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
    }).then(() => {
      const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        // we will display the date as DD-MM-YYYY 
        let currentDate = `${currentDay}.${currentMonth}.${currentYear}`;
        const hoursAndMinutes = date.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        });
      addLog({
        "id": Number(logs.length) + 1,
        "date": currentDate,
        "hour": hoursAndMinutes,
        "name": ip,
        "method": "ramas autentificat"
      });
      window.location.href = '/adminpanel'
    });
    op = true;
  }
  } else if(sessionStorage.getItem('currentlog') == 'true'){
    let op = true;
          if(op){
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 2500,
      title: 'Succes!',
      text: 'Autentificare...',
      timer: 1500,
      footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
    }).then(() => {
      const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        // we will display the date as DD-MM-YYYY 
        let currentDate = `${currentDay}.${currentMonth}.${currentYear}`;
        const hoursAndMinutes = date.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        });
      addLog({
        "id": Number(logs.length) + 1,
        "date": currentDate,
        "hour": hoursAndMinutes,
        "name": ip,
        "method": "ramas autentificat"
      });
      window.location.href = '/adminpanel';
    });
    op = false;
  }
  } else if(queryParameters.get('token_login') == adminToken[0].token){
    let op = true;
          if(op){
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 2500,
      title: 'Succes!',
      text: 'Autentificare...',
      timer: 1500,
      footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
    }).then(() => {
      sessionStorage.setItem('currentlog', true);
      const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        // we will display the date as DD-MM-YYYY 
        let currentDate = `${currentDay}.${currentMonth}.${currentYear}`;
        const hoursAndMinutes = date.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        });
      addLog({
        "id": Number(logs.length) + 1,
        "date": currentDate,
        "hour": hoursAndMinutes,
        "name": ip,
        "method": "sesiune token"
      })
      window.location.href = '/adminpanel';
    });
    op = false;
  }
  }
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
      adminData.map((account) => {
        if(data.get("email") === account.email && data.get("password") === account.password){
          if(data.get("remember") == "remember"){
            localStorage.setItem('login', true);
          }
          let op = true;
          if(op){
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 2500,
            title: 'Succes!',
            text: 'Autentificare...',
            timer: 1500,
            footer: 'Copyright © <a href="https://seosky.ro">SeoSky</a>'
          }).then(() => {
            const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        // we will display the date as DD-MM-YYYY 
        let currentDate = `${currentDay}.${currentMonth}.${currentYear}`;
        const hoursAndMinutes = date.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        });
      addLog({
        "id": Number(logs.length) + 1,
        "date": currentDate,
        "hour": hoursAndMinutes,
        "name": account.email,
        "method": "email si parola"
      })
      sessionStorage.setItem("currentlog", true);
            window.location.href = '/adminpanel';
          });
          op = false;
        }
        } else if (data.get("email") !== account.email && data.get("password") !== account.password) {
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
      remember: data.get('remember'),
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
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              name="remember"
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
  setOnce(true);
}
}
}