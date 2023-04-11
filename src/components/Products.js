import logo from './../logo.svg';
import './css/Products.css';
import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import seosky from './../images/linkedin_banner_image_1.png';
import seosky_logo from './../images/youtube_profile_image.png';
import { ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tilty from 'react-tilty';
import Categories from './../dbs/categories.json';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Paper from '@mui/material/Paper';
import allProducts from './../dbs/products.json';


function Products() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
return (
  <Grid className="gridProducts" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 2, sm: 3,  md: 6, xl: 12}}>
    {allProducts.map(prod => {
      return (
    <Grid item xs={3} style={{marginBottom: "20px"}}>
  <div class="el-wrapper">
        <div class="box-up">
          <img class="img" src={prod.image} alt="" />
          <div class="img-info">
            <div class="info-inner">
              <span class="p-name">{prod.name}</span>
              <span class="p-company">{prod.distribuitor}</span>
            </div>
            <div class="a-size">{prod.subname}</div>
          </div>
        </div>

        <div class="box-down">
          <div class="h-bg">
            <div class="h-bg-inner"></div>
          </div>

          <a class="cart" href="#">
            <span class="price">{'$' + prod.price}</span>
            <span class="add-to-cart">
              <span class="txt">Details...</span>
            </span>
          </a>
        </div>
        </div>
        </Grid>
        )
      })}


        

        
  
  {/* <Grid item xs={6}>
    <Item>2</Item>
  </Grid>
  <Grid item xs={6}>
    <Item>3</Item>
  </Grid>
  <Grid item xs={6}>
    <Item>4</Item>
  </Grid> */}
</Grid>
      

      
)
}

export default Products;
