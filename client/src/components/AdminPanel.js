import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
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
import './css/AdminPanel.css';
import adminData from "./../dbs/admin.json";
import adminToken from "./../dbs/admin_token.json";
import seosky from './../images/linkedin_banner_image_1.png';
import seosky_logo from './../images/youtube_profile_image.png';
import { ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import sslogo from './../images/sslogo.jpg';
import Tilty from 'react-tilty';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import ViewListIcon from '@mui/icons-material/ViewList';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LogoutIcon from '@mui/icons-material/Logout';
import Stats from './adminpanel/stats.js';
import Categories from './adminpanel/categories.js';
import Products from './adminpanel/products.js';
import AdminLog from './adminpanel/log.js';
import Settings from './adminpanel/settings.js';


function AdminPanel(){
  const queryParameters = new URLSearchParams(window.location.search)
  if(localStorage.getItem('login') != 'true'){
    
    if(queryParameters.get('token_login') != adminToken[0].token){
      if(sessionStorage.getItem('currentlog') != 'true') {
        window.location.href = "/admin";
      }
    }
  }


  const [menuCollapse, setMenuCollapse] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("stats");

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    function openSub(v){
      if(menuCollapse){
        setMenuCollapse(false);
      }
    }


    // Get ip
    const [ip, setIP] = useState("");
    const getData = async () => {
      const res = await axios.get("https://api.ipify.org/?format=json");
      console.log(res.data);
      setIP(res.data.ip);
      
    }

    useEffect(() => {
      //passing getData method to the lifecycle method
      getData();
    }, []);


    function logout() {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/"
    }

    function goToStore() {
      window.location.href = "/"
    }

  return (
    <div style={{height: '100%'}}>

<ProSidebarProvider style={{}}>
    <Sidebar   defaultCollapsed={menuCollapse}  style={{position: 'fixed', top: 0, borderBottomRightRadius: '30px', borderTopRightRadius: '30px'}}
    rootStyles={{
      background:
        'linear-gradient(180deg, rgba(178,235,249,1) 0%, rgba(89,117,124,1) 49%, rgba(255,255,255,1) 100%)',
    }}>
       <div style={{position: 'relative', width: '100%', textAlign: 'right'}} className="closemenu" onClick={menuIconClick}>
        <p className='collapse_button' style={{position: 'relative', display: 'inline', top:"10px", paddingRight:"5px"}}>
        {menuCollapse ? (
        <ArrowCircleRightIcon style={{fontSize:'38px'}}/>
        ) : (
        <ArrowCircleLeftIcon style={{fontSize:'38px'}}/>
        )}
        </p>
      </div>
      <Tilty>
      <div style={{ display: 'flex', height: '120px'}}>
        <img src={seosky} className='collapse_button' onClick={menuIconClick} style={{display: menuCollapse ? 'none' : 'block' ,position: "relative", top: '10px', left: '11px', height: '90%', width: "90%", borderRadius: '30px'}}></img>
        <img src={seosky_logo} className='collapse_button' onClick={menuIconClick} style={{display: menuCollapse ? 'block' : 'none' ,position: "relative", top: '25px', left: '4px', height: '60%', width: "90%", borderRadius: '30px'}}></img>
      </div>
      </Tilty>
      <Menu style={{marginTop: "10px"}}>
        <br />
      <MenuItem disabled icon={<AdminPanelSettingsIcon />}>{ip}</MenuItem>
      <br />
      <br />
      <MenuItem icon={<QueryStatsIcon/>} onClick={() => {setSelectedCategory("stats")}}>Statistici</MenuItem>
      <MenuItem icon={<PivotTableChartIcon /> } onClick={() => {setSelectedCategory("categories")}}>Categorii</MenuItem>
      <MenuItem icon={<ViewListIcon />} onClick={() => {setSelectedCategory("products")}}>Produse</MenuItem>
      <MenuItem icon={<HistoryToggleOffIcon />} onClick={() => {setSelectedCategory("log")}}>Admin Log</MenuItem>
      <MenuItem icon={<SettingsSuggestIcon />} onClick={() => {setSelectedCategory("settings")}}>Setari</MenuItem>
      <MenuItem icon={<LogoutIcon />} onClick={() => {logout()}}>Deconectare</MenuItem>
      <MenuItem icon={<FirstPageIcon />} onClick={() => {goToStore()}}>Magazin</MenuItem>
      {/* <SubMenu label="Charts">
      <MenuItem>Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>   */}
  </Menu>
  <Box style={{position: 'absolute', bottom: 0, right: 0}} sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Menu"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
            key="settings"
            icon={<SettingsSuggestIcon  />}
            tooltipTitle="Setari"
            onClick={() => {setSelectedCategory("settings")}}
          />
          <SpeedDialAction
            key="addproduct"
            icon={<AddBoxIcon />}
            tooltipTitle="Produs nou"
            onClick={() => {setSelectedCategory("products")}}
          />
          <SpeedDialAction
            key="addcategory"
            icon={<PivotTableChartIcon  />}
            tooltipTitle="Categorie noua"
            onClick={() => {setSelectedCategory("categories")}}
          />
          <SpeedDialAction
            key="adminlog"
            icon={<AdminPanelSettingsIcon  />}
            tooltipTitle="Admin Log"
            onClick={() => {setSelectedCategory("log")}}
          />
      </SpeedDial>
    </Box>
    </Sidebar>
    
    </ProSidebarProvider>





<div className='transitionMain' onClick={()=>{setMenuCollapse(true)}} style={{paddingLeft: menuCollapse ? '100px' : '280px', paddingRight: '20px', height: '100%'}}>
    <h3 className='animate-charcter'>Admin Panel</h3>
      {selectedCategory == 'stats' ? <Stats></Stats> : void(0)}
      {selectedCategory == 'categories' ? <Categories></Categories> : void(0)}
      {selectedCategory == 'products' ? <Products></Products> : void(0)}
      {selectedCategory == 'log' ? <AdminLog></AdminLog> : void(0)}
      {selectedCategory == 'settings' ? <Settings></Settings> : void(0)}
</div>
    

    </div>
  )
}

export default AdminPanel;