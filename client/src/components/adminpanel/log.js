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

export default function AdminLog() {

  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [fill, setFill] = React.useState(false);
  const [titleModalView, settitleModalView] = React.useState("");
  const [subcategoriesModalView, setSubcategoriesModalView] = React.useState([]);
  const [openNew, setOpenNew] = React.useState(false);
  const [newCategoryName, setnewCategoryName] = React.useState("");
  const [newCategorySub, setnewCategorySub] = React.useState("");
  const [titleSubCateg, settitleSubCateg] = React.useState("");
  const [openSubCategDialog, setopenSubCategDialog] = React.useState(false);
  const [openEditCategDialog, setopenEditCategDialog] = React.useState(false);

  const [editCategoryName, seteditCategoryName] = React.useState("");
  const [editCategorySub, seteditCategorySub] = React.useState("");
  const [editCategoryId, seteditCategoryId] = React.useState(0);

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
    setnewCategoryName("");
    setnewCategorySub("");
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
    if(newCategoryName != "") {
      let subcategories = newCategorySub.split(',');
      let newSubcategories = [];
      let reps = false;
      categories.map((category) => {
        if(newCategoryName == category.name){
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
          let id = parseInt(categories.length) + 1;
          addCategory({
            "id":id,
            "name":newCategoryName,
            "subcategories": newSubcategories
          });
          resyncCategories();
          setOpenNew(false);
          Swal.fire({
            icon: 'success',
            title: 'Succes',
            text: 'Categoria a fost adaugata cu succes!',
            footer: '<a href="https://seosky.ro">SeoSky</a>'
          });
          setnewCategoryName("");
          setnewCategorySub("");
        } else {
          setOpenNew(false);
          Swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Numele subcategoriilor nu trebuie sa se repete!',
            footer: '<a href="https://seosky.ro">SeoSky</a>'
          }).then(() => setOpenNew(true));
        }
      } else {
        setOpenNew(false);
        Swal.fire({
          icon: 'error',
          title: 'Eroare',
          text: 'Acest nume de categorie exista deja!',
          footer: '<a href="https://seosky.ro">SeoSky</a>'
        }).then(() => setOpenNew(true));
      }
    } else {
      setOpenNew(false);
      Swal.fire({
        icon: 'error',
        title: 'Eroare',
        text: 'Va rugam introduceti numele categoriei!',
        footer: '<a href="https://seosky.ro">SeoSky</a>'
      }).then(() => setOpenNew(true));
    }
    
  };

  const handleAddEdited = () => {
    if(editCategoryName != "") {
      let subcategories = editCategorySub.split(',');
      let newSubcategories = [];
      let reps = false;
      categories.map((category) => {
        if(editCategoryName == category.name){
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
          resyncCategories();
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
            resyncCategories();
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
          'info'
        )
      }
    })
    
    
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  async function resyncCategories(){
    const response =  await fetch('/getAllCategories');
    const data =  await response.json();
    setCategories(data)
  }

  async function getData(){
    const response =  await fetch('/getAdminLog');
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
            "headerName":"Data",
            "width":180
         },
         {
            "field":"hour",
            "headerName":"Ora",
            "width":180,
            "editable":false
         },
         {
          "field":"name",
          "headerName":"Nume",
          "width":250,
          "editable":false
        },
        {
          "field":"method",
          "headerName":"Metoda",
          "width":150,
          "editable":false
        },
      ],
      
      "rows":categories,
      "initialState":{
         "columns":{
            "columnVisibilityModel":{
               "id":false
            }
         }
      }
   }
  return (
    <div style={{ height: '90%', width: '100%' }}>
      <h3>- Istoric</h3>
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
        <DialogTitle>Adauga categorie noua</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introdu numele categoriei si adauga numele subcategoriilor separate prin virgula. Iar daca nu exista, lasa loc liber.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Numele categoriei"
            fullWidth
            variant="standard"
            value={newCategoryName}
            onChange={(e) => setnewCategoryName(e.target.value)}
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
            value={newCategorySub}
            onChange={(e) => setnewCategorySub(e.target.value)}
          />
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
  );
}