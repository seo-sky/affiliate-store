import logo from './../logo.svg';
import './css/Products.css';
import * as React from 'react';
import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import seosky from './../images/linkedin_banner_image_1.png';
import seosky_logo from './../images/youtube_profile_image.png';
import { ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Tilty from 'react-tilty';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Categories from './../dbs/categories.json';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import ReactplosiveModal from "reactplosive-modal";
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';


function Products() {
  
  const [allProducts, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [fillProducts, setfillProducts] = useState(false);
  const [once, setOnce] = useState(true);
  const queryParameters = new URLSearchParams(window.location.search)
  console.log(queryParameters.get("category"))

  async function getProducts(){
    const responseProducts =  await fetch('/getAllProducts');
    console.log(responseProducts);
    const dataProducts =  await responseProducts.json();
    console.log(dataProducts);
      setfillProducts(true);
      setProducts(dataProducts);
  }
  if(!fillProducts)
    getProducts(); 
  
  if(fillProducts){
    if(once) {
      console.log("CURRENT->",allProducts)
      if(queryParameters.get("category") == null || queryParameters.get("category") == "null" || queryParameters.get("category") == ""){
        setCurrentProducts(allProducts);
        console.log("--------------------ALL")
      } else if((queryParameters.get("category") != null || queryParameters.get("category") == "null" || queryParameters.get("category") == "") && queryParameters.get("subcategory") == "none"){
        console.log("--------------------ALL")
        let newObject = [];
        allProducts.map(item => {
          if(item.subcategory == false && item.category == queryParameters.get("category")){
            newObject.push(item);
          }
        })
        console.log(newObject)
        setCurrentProducts(newObject);
      } else if((queryParameters.get("category") != null || queryParameters.get("category") == "null" || queryParameters.get("category") == "") && queryParameters.get("subcategory") != "none"){
        console.log("--------------------ALL")
        let newObject = [];
        allProducts.map(item => {
          if(item.subcategory == queryParameters.get("subcategory") && item.category == queryParameters.get("category")){
            newObject.push(item);
          }
        })
        console.log(newObject)
        setCurrentProducts(newObject);
      }
      setOnce(false);
    }
  }


  
  
  
   

  

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
  
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [inputText, setInputText] = useState("");
  const [selectSort, setSelectSort] = useState("populare");
  const [open, setOpen] = useState(false);
  let inputHandler = (e) => {
    //convert input text to lower case
    e.preventDefault();
    e.stopPropagation();
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    console.log(lowerCase)
  };
     
  
  let data = currentProducts;
  if(selectSort == "crescator") {
    data.sort(function (x, y) {
      return x.price - y.price;
    });
  } else if(selectSort == "descrescator") {
    data.sort(function (x, y) {
      return y.price - x.price;
    });
  } else if(selectSort == "populare") {
    data.sort(function (x, y) {
      return y.clicks - x.clicks;
    });
  } else if(selectSort == "noi") {
    data.map(item => {
      if(new String(item.date).includes(".")){
        let splited = new String(item.date).split('.');
        console.log(splited);
        item.date = new Date (parseInt(splited[2]), parseInt(splited[1]), parseInt(splited[0]));
        console.log(item.date);
      }
      console.log(item.date);
    })
    data.sort(function (x, y) {
      return Number(y.date) - Number(x.date);
    });
  }


  let selectHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value;
    setSelectSort(lowerCase);
      console.log(filteredData)
      
  };


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


  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };


  function Items({ currentItems }) {
    return (
      <>
      {
        currentItems.map(prod => {
        if(currentItems.length >= 1) {
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
  
            <a className="cart" onClick={() => {
              Swal.fire({
                title: prod.name,
                html:
                prod.subname +
                '<br /><br /><h3>Description</h3> ' +
                prod.description,
                imageUrl: prod.image,
                width: "90%",
                imageWidth: 200,
                imageHeight: 200,
                confirmButtonText: 'Buy '+prod.price+'$',
                showCancelButton: true,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  window.open(prod.link, "_blank");
                }
              })
            }}>
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
        </>
    );
}
const [pageCount, setPageCount] = useState(0);
const [pageNumber, setPageNumber] = useState(1);
const [itemOffset, setItemOffset] = useState(0);

const handlePageChange = (event, value) => {
  setPageNumber(value);
  
};

function PaginatedItems({ itemsPerPage }) {
  const newOffset = (pageNumber-1) * 2 % filteredData.length;
  console.log(`User requested page number ${pageNumber}, which is offset ${newOffset}`);
  setItemOffset(newOffset);
  // We start with an empty list of items.
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [currentItems, setCurrentItems] = useState([]);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(filteredData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  return (
    <>
    {
      <Items currentItems={currentItems} />
    }
      {/* <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      /> */}
      
    </>
  );
}


if(fillProducts) {
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
    <PaginatedItems itemsPerPage={2} />
</Grid>


 {pageCount > 1 ?
 <Stack spacing={2}>
      <Pagination
      style={{margin: "0 auto", marginBottom: "30px"}}
        count={pageCount}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
: "" }


      
</div>

)
} else {
  return (
    <Box sx={{ position: 'absolute', top:"50%", left: "50%" }}>
      <CircularProgress />
    </Box>
  )
}
}

export default Products;