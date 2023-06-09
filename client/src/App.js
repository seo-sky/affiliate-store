import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import seosky from './images/linkedin_banner_image_1.png';
import seosky_logo from './images/youtube_profile_image.png';
import { ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import Tilty from 'react-tilty';
import Categories from './dbs/categories.json';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import sslogo from './images/sslogo.jpg';
import Products from './components/Products.js';
import Search from './components/HeaderSearch.js';
import currentCategory from './functions/category.js';
import GridViewIcon from '@mui/icons-material/GridView';
import { useEffect } from 'react';

console.log(currentCategory);





async function addCategory(category) {
  console.log(JSON.stringify(category));
  fetch('/addCategory', {
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
    });
  
}

// addCategory({
//   "id":"hey1",
//   "name":"h2",
//   "subcategories":[
//      "TESTTTTTT"
//   ]
// })


// fetch('/getAllCategories')
// .then((data) => {
//   console.log(data.json());
// })





function App() {

  

  const [categories, setCategories] = useState([]);
  
  const [open, setOpen] = useState(true);
  const [fill, setFill] = useState(false);


    async function getData(){
      const response =  await fetch('/getAllCategories');
      console.log(response);
      const data =  await response.json();
      console.log(data);

      if(!fill){
        setCategories(data);
        setFill(true)
      }
    }

if(!fill) {
  getData();
}


       
       

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
  setOpen(false);
  };
  
  const action = (
    <React.Fragment>
      <Button size="small" onClick={() => {window.location.href = "https://seosky.ro"}}>
        View
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  

  
  const [menuCollapse, setMenuCollapse] = useState(true)

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    function openSub(v){
      if(menuCollapse){
        setMenuCollapse(false);
      }
    }
  // function addCategories(c){
  //   c.map(categ => {
  //     if()
  //     return(
  //       <MenuItem>{categ.name}</MenuItem>
  //     )
  //   })
  //   //   console.log(c[i])
  //   //   if(c[i].subcategories.length < 1) {
  //   //     return (
  //   //       <MenuItem>{c[i].name}</MenuItem>
  //   //     )
  //   //   } else {
  //   //     return (
  //   //       <SubMenu label={c[i].name}>
  //   //         {c[i].subcategories.map(x => (
  //   //           <MenuItem>{x}</MenuItem>
  //   //         ))}
  //   //       </SubMenu>
  //   //     )
  //   //   }
  //   //   i += 1;
  //   // }
  // }
  return (
    <>
    <div style={{width: '100% !important', height: '100%', minHeight: '400px'}}>
      
      <ProSidebarProvider>
    <Sidebar   defaultCollapsed={menuCollapse}  style={{position: 'fixed', top: 0, borderBottomRightRadius: '30px', borderTopRightRadius: '30px'}}
    rootStyles={{
      background:
        'linear-gradient(180deg, rgba(178,235,249,1) 0%, rgba(89,117,124,1) 49%, rgba(255,255,255,1) 100%)',
    }}
    >
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
      <MenuItem icon={<GridViewIcon />} onClick={()=>{window.location.href = "/"}}>All Products</MenuItem>
      

      {categories.map(categ => {
      if(categ.subcategories.length == 0){
        return(
          <MenuItem key={categ.id} onClick={()=>{window.location.href = "/?category="+categ.name+"&subcategory=none"}}>{categ.name}</MenuItem>
        )
      } else {
        return (
        <SubMenu onOpenChange={(open) => {openSub(categ.subcategories)}} label={categ.name}>
        {categ.subcategories.map(subcateg => {
          return (
          <MenuItem onClick={()=>{window.location.href = "/?category="+categ.name+"&subcategory="+subcateg}}>{subcateg}</MenuItem>
        )})}
        </SubMenu>
        )
      }
    })}


      {/* <SubMenu label="Charts">
      <MenuItem>Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>   */}
  </Menu>
    </Sidebar>
    </ProSidebarProvider>



{/* ADD SEARCH ON HEADER (CREATE NEW COMPONENT) */}
{/* ADD GRID VIEW */}
    <div className='transitionMain' onClick={()=>{setMenuCollapse(true)}} style={{paddingLeft: menuCollapse ? '100px' : '280px', paddingRight: '20px'}}>
    <h1><b className="titleSearch">S</b>tore - <i className='titleSearch'>Seo</i>Sky</h1>
      <div className='ProdDiv' style={{ opacity: menuCollapse ? '1' : '0.2'}}>
        <Products ></Products>
      </div>
    </div>
      <Snackbar style={{backgroundColor: "#fff"}}
        open={open}
        onClose={handleClose}
        message=<div><img src={sslogo} height="20px" width="20px" style={{position:'relative'}} /> <p style={{display: 'inline',position:'relative', top:"-3px"}}>Check Our website</p></div>
        action={action}
      />
    </div>
  </>
  );
}
export default App;
