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
import TextField from "@mui/material/TextField";
import allProducts from './../dbs/products.json';
import { useSearchParams } from "react-router-dom";


function Products() {
  
  const queryParameters = new URLSearchParams(window.location.search)
  let currentProducts;
    console.log(queryParameters.get("category"))
  
   function load() {
    if(queryParameters.get("category") == null || queryParameters.get("category") == "null" || queryParameters.get("category") == ""){
      currentProducts = allProducts;
    } else if((queryParameters.get("category") != null || queryParameters.get("category") == "null" || queryParameters.get("category") == "") && queryParameters.get("subcategory") == "none"){
      let newObject = [];
      allProducts.map(item => {
        if(item.subcategory == false && item.category == queryParameters.get("category")){
          newObject.push(item);
        }
      })
      currentProducts = newObject;
    } else if((queryParameters.get("category") != null || queryParameters.get("category") == "null" || queryParameters.get("category") == "") && queryParameters.get("subcategory") != "none"){
      let newObject = [];
      allProducts.map(item => {
        if(item.subcategory == queryParameters.get("subcategory") && item.category == queryParameters.get("category")){
          newObject.push(item);
        }
      })
      currentProducts = newObject;
    }
  } 

  load();

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

  const [inputText, setInputText] = useState("");
  const [selectSort, setSelectSort] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    e.preventDefault();
    e.stopPropagation();
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    console.log(lowerCase)
  };

  let selectHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value;
    setSelectSort(lowerCase);
  };

  let data = currentProducts;

  const filteredData = data.filter((list) => {
    //if no input the return the original
    if (inputText === '') {
        return list;
    }
    //return the item which contains the user input
    else {
        return list.name.toLowerCase().includes(inputText)
    }
});
function checkFilter(data) {
  if(data.length < 1) {
    return (
      <h3 style={{margin: "50px auto"}}>Sorry, no products found...</h3>
    )
  }
}
return (
  <div>
    <div className="mainSearch">
    
      
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search..."
          onChange={inputHandler}
        />
        <TextField
          id="outlined-select-currency-native"
          select
          label="Sort"
          defaultValue="populare"
          onChange={selectHandler}
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
  <Grid className="gridProducts" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 2, sm: 3,  md: 6, xl: 12}}>
    {checkFilter(filteredData)}
    {
      filteredData.map(prod => {
      if(filteredData.length >= 1) {
      return (
    <Grid item xs={3} style={{marginBottom: "20px"}}>
  <div className="el-wrapper">
        <div className="box-up">
          <img className="img" src={prod.image} alt="" />
          <div className="img-info">
            <div className="info-inner">
              <span className="p-name">{prod.name}</span>
              <span className="p-company">{prod.distribuitor}</span>
            </div>
            <div className="a-size">{prod.subname}</div>
          </div>
        </div>

        <div className="box-down">
          <div className="h-bg">
            <div className="h-bg-inner"></div>
          </div>

          <a className="cart" href="#">
            <span className="price">{'$' + prod.price}</span>
            <span className="add-to-cart">
              <span className="txt">Details...</span>
            </span>
          </a>
        </div>
        </div>
        </Grid>
        )
      } else {
        return (
          <Grid item xs={3} style={{marginBottom: "20px"}}>
            Sorry, no products found...
        </Grid>
        )

      }
    
      })}
</Grid>
      
</div>

)
}

export default Products;