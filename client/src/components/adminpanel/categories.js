import * as React from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDemoData } from '@mui/x-data-grid-generator';
import Dialog from '@mui/material/Dialog';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomLocaleTextGrid() {

  const [open, setOpen] = React.useState(false);
  const [titleModalView, settitleModalView] = React.useState("");
  const [subcategoriesModalView, setSubcategoriesModalView] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const data =
    {
      "columns":[
         {
            "field":"id",
            "width":180
         },
         {
            "field":"name",
            "headerName":"Nume",
            "width":180
         },
         {
            "field":"subcategories",
            "headerName":"Subcategorii",
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
              <IconButton variant="outlined" color="success" onClick={() => console.log("clicked -> ", row.name)}>
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
            <IconButton variant="outlined" color="error" onClick={() => console.log("clicked -> ", row.name)}>
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
            <IconButton variant="outlined" color="primary" onClick={() => {settitleModalView(row.name); setSubcategoriesModalView(row.subcategories); handleClickOpen(); console.log(row.subcategories)}}>
              <VisibilityIcon />
            </IconButton>
            )
            },
        },
      ],
      "rows":[{"id":"charts","name":"Charts","subcategories":["Modifiedfdsfdfddddddddddd","Modified2","Modified","Modified2","Modified","Modified2","Modified","Modified2","Modified","Modified2","Modified","Modified2"]},{"id":"documentation","name":"Documentation","subcategories":[]},{"id":"tech","name":"Tech","subcategories":["Webcam"]}],
      "initialState":{
         "columns":{
            "columnVisibilityModel":{
               "id":false
            }
         }
      }
   }
  return (
    <div style={{ height: '100%', width: '100%' }}>
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
          toolbar: GridToolbar,
        }}
      />

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
            <Grid container spacing={2} style={{marginLeft: 5}}>

          {subcategoriesModalView.map(item => {
            return(
              <Grid item xs={4}>
                <Chip label={item} variant="outlined" onClick={() => {alert(item)}}/>
              </Grid>
            )
            })}
            </Grid>


        </List>
      </Dialog>
    </div>
  );
}