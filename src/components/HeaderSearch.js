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


function Search() {
  const currencies = [
    {
      value: 'populare',
      label: 'Cele mai populare',
    },
    {
      value: 'noi',
      label: 'Cele mai noi',
    },
    {
      value: 'crescator',
      label: 'Pret crescator',
    },
    {
      value: 'descrescator',
      label: 'Pret descrescator',
    }
    
  ];
return (
  <div className="mainSearch">
    
      <h1><b className="titleSearch">S</b>tore - <i className='titleSearch'>Seo</i>Sky</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search..."
        />
        <TextField
          id="outlined-select-currency-native"
          select
          label="Sort"
          defaultValue="EUR"
          SelectProps={{
            native: true,
          }}
          style={{width: "200px", marginTop: "20px"}}
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
    </div>
)
}

export default Search;
