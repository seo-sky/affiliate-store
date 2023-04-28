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
import SyncLockIcon from '@mui/icons-material/SyncLock';
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

export default function Settings() {

  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [fill, setFill] = React.useState(false);
  const [titleModalView, settitleModalView] = React.useState("");
  const [subcategoriesModalView, setSubcategoriesModalView] = React.useState([]);
  const [openNew, setOpenNew] = React.useState(false);
  const [openToken, setOpenToken] = React.useState(false);
  const [newCategoryName, setnewCategoryName] = React.useState("");
  const [newCategorySub, setnewCategorySub] = React.useState("");
  const [titleSubCateg, settitleSubCateg] = React.useState("");
  const [openSubCategDialog, setopenSubCategDialog] = React.useState(false);
  const [openEditCategDialog, setopenEditCategDialog] = React.useState(false);

  const [editCategoryName, seteditCategoryName] = React.useState("");
  const [editCategorySub, seteditCategorySub] = React.useState("");
  const [editCategoryId, seteditCategoryId] = React.useState(0);
  const [currentToken, setcurrentToken] = React.useState("")

  async function addCategory(category) {
    console.log(JSON.stringify(category));
    fetch('/addAdminUser', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
      });
      
    
  }

  async function editCategory(category) {
    console.log(JSON.stringify(category));
    fetch('/editAdminUser', {
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
  const handleClickOpenToken = () => {
    setOpenToken(true);
  };

  const handleCloseToken = () => {
    setOpenToken(false);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
    setnewCategoryName("");
    setnewCategorySub("");
  };

  const handleAddEditedToken = async () => {
    if(currentToken === ""){
      setOpenToken(false);
      Swal.fire({
        icon: 'error',
        title: 'Eroare',
        text: 'Introduceti token-ul!',
        footer: '<a href="https://seosky.ro">SeoSky</a>'
      }).then(() => {setOpenToken(true)});
    } else {
      fetch('/edit_A_D_M_I_NToken?name=Alexie&token='+currentToken).then(() => {
        console.log("OK")
        setOpenToken(false);
        Swal.fire({
          icon: 'success',
          title: 'Succes!',
          text: 'Token-ul a fost editat cu succes!',
          footer: '<a href="https://seosky.ro">SeoSky</a>'
        });
      });
        
    }
  }

  const handleCloseEdit = () => {
    setopenEditCategDialog(false);
    seteditCategoryName("");
    seteditCategorySub("");
  }
  const handleClickOpenEdit = (name, subcategories, id) => {
    seteditCategoryName(name);
    seteditCategoryId(id);
    seteditCategorySub(subcategories);
    setopenEditCategDialog(true);
  };

  const [isused, setisused] = React.useState(false);
  const [isused2, setisused2] = React.useState(false);
  const handleAddNew = () => {
    if(newCategoryName === "") {
    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti email-ul noului utilizator!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(() => {setOpenNew(true)});
  }else if(newCategorySub === ""){
    setOpenNew(false);
    Swal.fire({
      icon: 'error',
      title: 'Eroare',
      text: 'Introduceti parola noului utilizator!',
      footer: '<a href="https://seosky.ro">SeoSky</a>'
    }).then(() => {setOpenNew(true)});
  } else {
    categories.map((item)=> {
      if(newCategoryName === item.email){
        setOpenNew(false);
        setisused(true);
        Swal.fire({
          icon: 'error',
          title: 'Eroare',
          text: 'Acest email de utilizator este deja folosit!',
          footer: '<a href="https://seosky.ro">SeoSky</a>'
        }).then(() => {setOpenNew(true)});
      }
    })
    if(!isused){
      addCategory({
        "id": Number(categories.length) + 1,
        "email": newCategoryName,
        "password": newCategorySub
      });
      setOpenNew(false);
        setisused(false);
        Swal.fire({
          icon: 'success',
          title: 'Succes!',
          text: 'Noul utilizator a fost adaugat cu succes!',
          footer: '<a href="https://seosky.ro">SeoSky</a>'
        }).then(()=>{resyncCategories()});
    }
  }
}

  const handleAddEdited = () => {
    if(editCategoryName === "") {
      setopenEditCategDialog(false);
      Swal.fire({
        icon: 'error',
        title: 'Eroare',
        text: 'Introduceti email-ul utilizatorului!',
        footer: '<a href="https://seosky.ro">SeoSky</a>'
      }).then(() => {setopenEditCategDialog(true)});
    }else if(editCategorySub === ""){
      setopenEditCategDialog(false);
      Swal.fire({
        icon: 'error',
        title: 'Eroare',
        text: 'Introduceti parola utilizatorului!',
        footer: '<a href="https://seosky.ro">SeoSky</a>'
      }).then(() => {setopenEditCategDialog(true)});
    } else {
      categories.map((item)=> {
        console.log(item.email)
        if(editCategoryName === item.email){
          setopenEditCategDialog(false);
          setisused2(true);
          Swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Acest email de utilizator este deja folosit!',
            footer: '<a href="https://seosky.ro">SeoSky</a>'
          }).then(() => {setopenEditCategDialog(true)});
        }
      })
      if(!isused2){
        editCategory({
          "id": editCategoryId,
          "email": editCategoryName,
          "password": editCategorySub
        });
        setopenEditCategDialog(false);
          setisused2(false);
          Swal.fire({
            icon: 'success',
            title: 'Succes!',
            text: 'Utilizatorul a fost editat cu succes!',
            footer: '<a href="https://seosky.ro">SeoSky</a>'
          }).then(()=>{resyncCategories()});
      }
    }
    
  };


  const handleDeleteCategory = (id) => {
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Doriti stergerea?',
      text: "Sunteti sigur ca doriti sa stergeti acest user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sterge',
      cancelButtonText: 'Anuleaza',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('/deleteAdminUser?id='+parseInt(id))
          .then(() => {
            resyncCategories();
          })
        swalWithBootstrapButtons.fire(
          'Sters!',
          'Userul a fost sters cu succes!',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Anulat!',
          'Userul nu a mai fost sters.',
          'info'
        )
      }
    })
    
    
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button startIcon={<AddIcon />} onClick={handleClickOpenNew}>New</Button>
        <Button startIcon={<SyncLockIcon />} onClick={handleClickOpenToken}>Token</Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  async function resyncCategories(){
    const response =  await fetch('/getAdminData');
    const data =  await response.json();
    setCategories(data)
  }

  async function getData(){
    const response2 =  await fetch('/get_A_D_M_I_NToken/?name=Alexie');
    console.log(response2);
    const data2 =  await response2.json();
    setcurrentToken(data2[0].token);
    const response =  await fetch('/getAdminData');
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
            "field":"email",
            "headerName":"Email",
            "width":300
         },
         {
            "field":"password",
            "headerName":"Parola",
            "width":280,
            "editable":false
         },
         {
          field: "action_edit",
          headerName: "Edit",
          sortable: false,
          "width":70,
          renderCell: ({ row }) => {
            return(
              <IconButton variant="outlined" color="success" onClick={() => {handleClickOpenEdit(row.email, row.password, row.id)}}>
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
        }
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
      <h3>- Setari Acces</h3>
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
        <DialogTitle>Adauga user nou</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introdu email-ul userului si parola acestuia. Toate campurile sunt obligatorii.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            fullWidth
            variant="standard"
            value={newCategoryName}
            onChange={(e) => setnewCategoryName(e.target.value)}
          />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="subcategories"
            label="Parola"
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
            Editeaza email-ul utilizatorului si parola acestuia. Toate campurile sunt obligatorii.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
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
            label="Parola"
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



      <Dialog open={openToken} onClose={handleCloseToken}>
        <DialogTitle>Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Acest tip de token este folosit pentru logarea mult mai rapida si mai sigura in Admin Panel. Il puteti modifica in orice valoare doriti.
          </DialogContentText>
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Token"
            fullWidth
            variant="standard"
            value={currentToken}
            onChange={(e) => setcurrentToken(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseToken}>Anuleaza</Button>
          <Button variant="contained" onClick={() => {handleAddEditedToken()}}>Salveaza</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}