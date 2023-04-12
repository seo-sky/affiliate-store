import logo from './../logo.svg';
import './css/HeaderSearch.css';
import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import seosky from './../images/linkedin_banner_image_1.png';
import seosky_logo from './../images/youtube_profile_image.png';
import { ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import TextField from "@mui/material/TextField";
import Tilty from 'react-tilty';
import Categories from './../dbs/categories.json';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import sslogo from './../images/sslogo.jpg';


function Admin() {
return (
  <div>
    Hello from admin!
    </div>
)
}

export default Admin;
