import * as React from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDemoData } from '@mui/x-data-grid-generator';
import ListItemText from '@mui/material/ListItemText';
import { NumericFormat } from 'react-number-format';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CurrencyInput from 'react-currency-input-field';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Swal from "sweetalert2";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from '@mui/x-data-grid';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function containsDuplicates(array) {
  if (array.length !== new Set(array).size) {
    return true;
  }

  return false;
}

export default function Products() {

  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [fill, setFill] = React.useState(false);
  const [titleModalView, settitleModalView] = React.useState("");
  const [subcategoriesModalView, setSubcategoriesModalView] = React.useState([]);
  const [openNew, setOpenNew] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  
  const [newProductName, setnewProductName] = React.useState("");
  const [newProductSub, setnewProductSub] = React.useState("");
  const [newProductImg, setnewProductImg] = React.useState("");
  const [newProductDescription, setnewProductDescription] = React.useState("");
  const [newProductDistribution, setnewProductDistribution] = React.useState("Amazon.com");
  const [newProductCategory, setnewProductCategory] = React.useState("");
  const [newProductSubcategory, setnewProductSubcategory] = React.useState("");
  const [newProductLink, setnewProductLink] = React.useState("");
  const [newProductPrice, setnewProductPrice] = React.useState("");
  const [newCurrentCategory, setnewCurrentCategory] = React.useState(0);
  const [newCurrentCategoryObj, setnewCurrentCategoryObj] = React.useState([])
  const [newSubcategory, setnewSubcategory] = React.useState(0);

  const [titleSubCateg, settitleSubCateg] = React.useState("");
  const [openSubCategDialog, setopenSubCategDialog] = React.useState(false);
  const [openEditCategDialog, setopenEditCategDialog] = React.useState(false);

  const [editCategoryName, seteditCategoryName] = React.useState("");
  const [editCategorySub, seteditCategorySub] = React.useState("");
  const [editCategoryId, seteditCategoryId] = React.useState(0);

  const handleChangeCategory = (event) => {
    setnewCurrentCategory(event.target.value);
    setnewSubcategory(0);
  };
  const handleChangeSubcategory = (event) => {
    setnewSubcategory(event.target.value);
  }

  function viewModalProduct(prod){
    Swal.fire({
      title: prod.name,
      html:`
      
      ${prod.subname}
      <div style="text-align: left">
      <h4>Data: ${prod.date}</h4>
      <h4>Clickuri: ${prod.clicks}</h4>
      <h3>Descriere: </h3>
      ${prod.description}
      <br /><h4>Pret: ${prod.price}</h4>
      <h4>Categorie: ${prod.category}</h4>
      ${prod.subcategory !== false ? "<h4>Subcategorie: " + prod.subcategory + "</h4>" : ""}
      <h4>Link: <a href="${prod.link}" target="__blank">${prod.link}</a></h4>
      </div>`,
      imageUrl: prod.image,
      width: "90%",
      imageWidth: 200,
      imageHeight: 200,
      confirmButtonText: 'Inchide',
    })
  }

  async function addProduct(product) {
    console.log(JSON.stringify(product));
    fetch('/addProduct', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
      });
  }
  console.log(newProductPrice)

  async function editCategory(category) {
    console.log(JSON.stringify(category));
    fetch('/editCategory', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
      });
    
  }

  const handleClickOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
    // setnewProductName("");
    // setnewProductSub("");
    // setnewProductImg("");
    // setnewProductDescription("");
    // setnewProductPrice(undefined);
    // setnewProductDistribution("");
    // setnewProductLink("");
    // setnewCurrentCategory(0);
    // setnewSubcategory(0);
    // setnewCurrentCategoryObj([]);
  };

  const handleCloseEdit = () => {
    setopenEditCategDialog(false);
    seteditCategoryName("");
    seteditCategorySub("");
  }
  const handleClickOpenEdit = (name, subcategories, id) => {
    seteditCategoryName(name);
    seteditCategoryId(id);
    seteditCategorySub(subcategories.toString());
    setopenEditCategDialog(true);
  };

  const handleAddNew = () => {

  if(newProductName === ""){

    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti numele produsului!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(
      () => {setOpenNew(true)});

  } else if(newProductSub === "") {

    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti mini descrierea!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(
      () => {setOpenNew(true)});

  } else if(newProductImg === ""){

    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti linkul catre imaginea produsului!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(
      () => {setOpenNew(true)});

  } else if(newProductDescription === ""){

    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti descrierea produsului!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(
      () => {setOpenNew(true)});

  } else if(newProductPrice === "" || newProductPrice === undefined){

    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti pretul produsului!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(
      () => {setOpenNew(true)});

  } else if(newProductDistribution == "") {

    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti furnizorul produsului!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(
      () => {setOpenNew(true)});

  } else if(newProductLink === ""){

    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti linkul de afiliere al produsului!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(
      () => {setOpenNew(true)});

  } else if(newCurrentCategory === 0){

    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti categoria produsului!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(
      () => {setOpenNew(true)});

  } else if(newCurrentCategory !== 0){
    if(newCurrentCategoryObj.length !== 0){
      if(newSubcategory === "" || newSubcategory === 0){
        setOpenNew(false);
        Swal.fire({
          icon: 'error',
          title: 'Eroare',
          text: 'Introduceti subcategoria produsului!',
          footer: '<a href="https://seosky.ro">SeoSky</a>'
        }).then(
          () => {setOpenNew(true)});
      }
    }
  }










    

  };

  const handleAddEdited = () => {
    if(editCategoryName != "") {
      let subcategories = editCategorySub.split(',');
      let newSubcategories = [];
      let reps = false;
      products.map((product) => {
        if(editCategoryName == product.name){
          reps = true;
        }
      });
      if(subcategories.length == 1 && subcategories[0] == ""){

      } else {
        subcategories.map((item) => {
          newSubcategories.push(item.trimStart().trimEnd());
        });
      } 
      if(!reps) {
        if(!containsDuplicates(newSubcategories)){
          editCategory({
            "id":editCategoryId,
            "name":editCategoryName,
            "subcategories": newSubcategories
          });
          resyncProducts();
          setopenEditCategDialog(false);
          Swal.fire({
            icon: 'success',
            title: 'Succes',
            text: 'Categoria a fost editata cu succes!',
            footer: '<a href="https://seosky.ro">SeoSky</a>'
          });
        } else {
          setopenEditCategDialog(false);
          Swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Numele subcategoriilor nu trebuie sa se repete!',
            footer: '<a href="https://seosky.ro">SeoSky</a>'
          }).then(() => setopenEditCategDialog(true));
        }
      } else {
        setopenEditCategDialog(false);
        Swal.fire({
          icon: 'error',
          title: 'Eroare',
          text: 'Acest nume de categorie exista deja!',
          footer: '<a href="https://seosky.ro">SeoSky</a>'
        }).then(() => setopenEditCategDialog(true));
      }
    } else {
      setopenEditCategDialog(false);
      Swal.fire({
        icon: 'error',
        title: 'Eroare',
        text: 'Va rugam introduceti numele categoriei!',
        footer: '<a href="https://seosky.ro">SeoSky</a>'
      }).then(() => setopenEditCategDialog(true));
    }
    
  };


  const handleDeleteCategory = (id) => {
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Doriti stergerea?',
      text: "Sunteti sigur ca doriti sa stergeti aceasta categorie?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sterge',
      cancelButtonText: 'Anuleaza',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('/deleteCategory?id='+parseInt(id))
          .then(() => {
            resyncProducts();
          })
        swalWithBootstrapButtons.fire(
          'Sters!',
          'Categoria a fost stearsa cu succes!',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Anulat!',
          'Categoria nu a mai fost stearsa.',
          'error'
        )
      }
    })
    
    
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button startIcon={<AddIcon />} onClick={handleClickOpenNew}>New</Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  async function resyncProducts(){
    const response =  await fetch('/getAllProducts');
    const data =  await response.json();
    setProducts(data)
  }

  async function getData(){
    const response =  await fetch('/getAllProducts');
    console.log(response);
    const data =  await response.json();
    console.log(data);

    const response2 =  await fetch('/getAllCategories');
    console.log(response2);
    const data2 =  await response2.json();
    console.log(data2);
    if(!fill){
      setProducts(data);
      setCategories(data2);
      setFill(true)
    }
  }

if(!fill) {
getData();
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSubCategDialog = () => {
    setopenSubCategDialog(true);
  };

  const handleCloseSubCategDialog = () => {
    setopenSubCategDialog(false);
  };

  

  const data =
    {
      "columns":[
         {
            "field":"id",
            "width":180
          },
          {
            "field":"date",
            "headerName":"Ultima modificare",
            "width":180,
            "editable":false
          },
         {
            "field":"name",
            "headerName":"Nume",
            "width":180
         },
         {
           "field":"subname",
            "headerName":"Descriere scurta",
            "width":180,
            "editable":false
         },
         {
            "field":"description",
            "headerName":"Descriere",
            "width":180,
            "editable":false
        },
         {
            "field":"price",
            "headerName":"Pret",
            "width":80,
            "editable":false
        },
        {
            "field":"distribuitor",
            "headerName":"Furnizor",
            "width":180,
            "editable":false
        },
        {
            "field":"category",
            "headerName":"Categorie",
            "width":180,
            "editable":false
        },
        {
          "field":"subcategory",
          "headerName":"Subcategorie",
          "width":180,
          "editable":false
        },
         {
          field: "action_edit",
          headerName: "Edit",
          sortable: false,
          "width":70,
          renderCell: ({ row }) => {
            return(
              <IconButton variant="outlined" color="success" onClick={() => {handleClickOpenEdit(row.name, row.subcategories, row.id)}}>
              <EditIcon />
            </IconButton>
            )
            },
        },
        {
          field: "action_delete",
          headerName: "Delete",
          "width":70,
          sortable: false,
          renderCell: ({ row }) => {
            return(
            <IconButton variant="outlined" color="error" onClick={() => {handleDeleteCategory(row.id)}}>
              <DeleteIcon />
            </IconButton>
            )
            },
        },
        {
          field: "action_view",
          headerName: "View",
          "width":70,
          sortable: false,
          renderCell: ({ row }) => {
            return(
            <IconButton variant="outlined" color="primary" onClick={() => {viewModalProduct(row)}}>
              <VisibilityIcon />
            </IconButton>
            )
            },
        },
      ],
      "rows":products,
      "initialState":{
         "columns":{
            "columnVisibilityModel":{
               "id":false
            }
         }
      }
   }
  return (
    <>
    <div style={{ height: '90%', width: '100%' }}>
      <h3>- Produse</h3>
      <DataGrid
        {...data}
        hideFooter
        localeText={{
          toolbarDensity: 'Size',
          toolbarDensityLabel: 'Size',
          toolbarDensityCompact: 'Small',
          toolbarDensityStandard: 'Medium',
          toolbarDensityComfortable: 'Large',
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
<Dialog style={{zIndex: 999999}}
        open={openSubCategDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseSubCategDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{width: '280px'}}>{titleSubCateg}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubCategDialog}>Ok</Button>
        </DialogActions>
      </Dialog>
<Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {titleModalView}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary={"Nume: " + titleModalView} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={"Subcategorii: "}
            />
                      </ListItem>
            <Grid container spacing={2} style={{marginLeft: 5, width: "90%"}}>

          {subcategoriesModalView.map(item => {
            return(
              <Grid item xs={4}>
                <Chip style={{width: "90%"}} label={item} variant="outlined" onClick={() => {
                  settitleSubCateg(item);
                  handleOpenSubCategDialog();
                }}/>
              </Grid>
            )
            })}
            </Grid>


        </List>
      </Dialog>

            {/* ADD NEW */}
      <Dialog open={openNew} onClose={handleCloseNew}>
        <DialogTitle>Adauga produs nou</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introdu numele produsului si linkul catre imagine si toate celelalte campuri. Toate campurile trebuie completate.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Numele produsului..."
            fullWidth
            variant="standard"
            value={newProductName}
            onChange={(e) => setnewProductName(e.target.value)}
          />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="subtitlu"
            label="Mini descriere..."
            fullWidth
            variant="standard"
            value={newProductSub}
            onChange={(e) => setnewProductSub(e.target.value)}
          />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="link_imagine"
            label="Link imagine..."
            fullWidth
            variant="standard"
            value={newProductImg}
            onChange={(e) => setnewProductImg(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="description"
            label="Descriere..."
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={newProductDescription}
            onChange={(e) => setnewProductDescription(e.target.value)}
          />
          <br />
          <CurrencyInput
            id="input-example"
            name="input-name"
            style={{width: "100%", height: "50px", fontSize: "16px", marginTop: "10px", borderRadius: "8px", outline: "none", borderWidth: "0.1px", padding: '4px'}}
            placeholder="Pret..."
            decimalsLimit={2}
            prefix="$"
            value={newProductPrice}
            className={`form-control`}
            onValueChange={(value, name) => {setnewProductPrice(value)}}
          />
          <br />
          <br />
          <TextField
            id="distribution"
            label="Numele furnizorului..."
            fullWidth
            variant="standard"
            value={newProductDistribution}
            onChange={(e) => setnewProductDistribution(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="linkafiliere"
            label="Linkul de afiliere..."
            fullWidth
            variant="standard"
            value={newProductLink}
            onChange={(e) => setnewProductLink(e.target.value)}
          />
          <br />
          <br />
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={newCurrentCategory}
            onChange={(event) => {handleChangeCategory(event);}}
            label="Age"
          >
            <MenuItem disabled value={0}>
            Categorie...
            </MenuItem>
           
            {
              categories.map((category) => {
                console.log(category);
                return(
                <MenuItem onClick={()=>{setnewCurrentCategoryObj(category.subcategories);console.log(newCurrentCategoryObj)}} value={category.name}>{category.name}</MenuItem>
                )
              })
            }
            
          </Select>
          {
            newCurrentCategoryObj.length !== 0 ?
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={newSubcategory}
            onChange={handleChangeSubcategory}
            label="Age"
          >
            <MenuItem disabled value={0}>
            Subcategorie...
            </MenuItem>
            {
              newCurrentCategoryObj.map((subcategories) => {
                return(
                <MenuItem value={subcategories}>{subcategories}</MenuItem>
                )
              })
            }
            
          </Select>
          :
          newCurrentCategory !== 0 ?
          <p style={{marginLeft: "10px", display: 'inline'}}>Nu exista subcategorie</p>
          : ""
          }
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseNew}>Anuleaza</Button>
          <Button variant="contained" onClick={handleAddNew}>Adauga</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openEditCategDialog} onClose={handleCloseEdit}>
        <DialogTitle>Editeaza categoria</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Editeaza numele categoriei si adauga/sterge/editeaza numele subcategoriilor separate prin virgula. Iar daca nu exista, lasa loc liber.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Numele categoriei"
            fullWidth
            variant="standard"
            value={editCategoryName}
            onChange={(e) => seteditCategoryName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="subcategories"
            label="Subcategorii (separate prin virgula)"
            fullWidth
            variant="standard"
            value={editCategorySub}
            onChange={(e) => seteditCategorySub(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseEdit}>Anuleaza</Button>
          <Button variant="contained" onClick={() => {handleAddEdited()}}>Salveaza</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}