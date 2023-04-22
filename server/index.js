const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { deflateRawSync } = require('zlib');


const app = express();

// Server DB
let categories = [];
let products = [];
let admin_token = [];

let admin_data = [];


const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

app.use(cors());

app.use(express.static(path.join(__dirname, '/../client/public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ------------------------------------------------------------------------------------------CATEGORIES (API)----------------------------------------------------------------------------- 
app.post('/addCategory', (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, '/dbs/categories.json'), 'utf8');
  console.log("reading DB");

  let data2 = JSON.parse(data);
  console.log(data)
  data2.push(req.body);
  categories = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});


app.post('/editCategory', (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, '/dbs/categories.json'), 'utf8');
  console.log("reading DB");

  let data2 = JSON.parse(data);
  let category = req.body
  console.log(category);
  data2.map((item) => {
    if(item.id == category.id){
      item.name = category.name;
      item.subcategories = category.subcategories;
    }
  })
  categories = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});

app.post('/resyncCategories', (req, res) => {
  try {
    let resync = JSON.parse(req.body);
    fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(resync, getCircularReplacer()));
  } catch (err) {
    console.error(err);
  }
  res.send('record is added to the database');
});

app.get("/getAllCategories", (req, res) => {
  if(categories.length == 0){
    try {
      const data = fs.readFileSync(path.join(__dirname, '/dbs/categories.json'), 'utf8');
      console.log("Uploading backup DB");
      categories = JSON.parse(data);
      
      res.send(JSON.stringify(categories, getCircularReplacer()));
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("DB is on server")
    res.send(JSON.stringify(categories, getCircularReplacer()));
  }
});

app.get("/deleteCategory", (req, res) => {
  let id = req.query.id;
  console.log(id)
  const data = fs.readFileSync(path.join(__dirname, '/dbs/categories.json'), 'utf8');
  console.log("reading DB");
  let data2 = JSON.parse(data);
  data2.splice((parseInt(id)-1), 1)
  let i = 1;
  let data3 = [];
  data2.map((item) => {
    data3.push({"id": i, "name": item.name, subcategories: item.subcategories});
    i++;
  });
  console.log(data3);
  categories = data3;
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data3, getCircularReplacer()));
  res.send('record deleted from the database');
});


app.get("/deleteSubCategory", (req, res) => {
  let id = req.query.category_id;
  let subid = req.query.subcategory_id;
  console.log(id)
  const data = fs.readFileSync(path.join(__dirname, '/dbs/categories.json'), 'utf8');
  console.log("reading DB");
  let data2 = JSON.parse(data);
  data2[parseInt(id)-1].subcategories.splice((parseInt(subid)-1), 1)
  console.log(data2);
  categories = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record deleted from the database');
});

app.get('/addSubCategory', (req, res) => {
  let id = req.query.category_id;
  let name = req.query.name;
  const data = fs.readFileSync(path.join(__dirname, '/dbs/categories.json'), 'utf8');
  console.log("reading DB");
  let data2 = JSON.parse(data);
  data2[parseInt(id)-1].subcategories.push(name);
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});

app.get('/editSubCategory', (req, res) => {
  let id = req.query.category_id;
  let subid = req.query.subcategory_id;
  let name = req.query.name;
  const data = fs.readFileSync(path.join(__dirname, '/dbs/categories.json'), 'utf8');
  console.log("reading DB");
  let data2 = JSON.parse(data);
  data2[parseInt(id)-1].subcategories[parseInt(subid)-1] = name;
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});







// NEED TO MAKE EDIT FOR CATEGORY with post json array (object)













// ------------------------------------------------------------------------------------------CATEGORIES (API)-----------------------------------------------------------------------------




// ------------------------------------------------------------------------------------------PRODUCTS (API)-----------------------------------------------------------------------------
app.get("/getAllProducts", (req, res) => {
  if(products.length == 0){
    try {
      const data = fs.readFileSync(path.join(__dirname, '/dbs/products.json'), 'utf8');
      console.log("Uploading backup DB");
      products = JSON.parse(data);
      
      res.send(JSON.stringify(products, getCircularReplacer()));
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("DB is on server")
    res.send(JSON.stringify(products, getCircularReplacer()));
  }
});


app.post('/addProduct', (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, '/dbs/products.json'), 'utf8');
  console.log("reading DB");

  let data2 = JSON.parse(data);
  console.log(data)
  data2.push(req.body);
  products = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/products.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});

app.get("/deleteProduct", (req, res) => {
  let id = req.query.id;
  console.log(id)
  const data = fs.readFileSync(path.join(__dirname, '/dbs/products.json'), 'utf8');
  console.log("reading DB");
  let data2 = JSON.parse(data);
  data2.splice((parseInt(id)-1), 1)
  let i = 1;
  let data3 = [];
  data2.map((item) => {
    // Add all data available in products.json
    data3.push({"id": i, "name": item.name, subcategories: item.subcategories});
    i++;
  });
  console.log(data3);
  product = data3;
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data3, getCircularReplacer()));
  res.send('record deleted from the database');
});

// ------------------------------------------------------------------------------------------PRODUCTS (API)-----------------------------------------------------------------------------





// ------------------------------------------------------------------------------------------ADMIN-LOGIN (API)-----------------------------------------------------------------------------
app.get("/getAdminData", (req, res) => {
  if(admin_data.length == 0){
    try {
      const data = fs.readFileSync(path.join(__dirname, '/dbs/admin_data.json'), 'utf8');
      console.log("Uploading backup DB");
      admin_data = JSON.parse(data);
      
      res.send(JSON.stringify(admin_data, getCircularReplacer()));
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("DB is on server")
    res.send(JSON.stringify(admin_data, getCircularReplacer()));
  }
});
// ------------------------------------------------------------------------------------------ADMIN-LOGIN (API)-----------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------ADMIN-TOKEN (API)-----------------------------------------------------------------------------
app.get("/edit_A_D_M_I_NToken", (req, res) => {
  let name = req.query.name;
  let token = req.query.token;
  if(name == "Alexie"){
    let data2;
    data2 = [{token: token}];
    fs.writeFileSync(path.join(__dirname, '/dbs/admin_token.json'), JSON.stringify(data2, getCircularReplacer()));
    res.send('New token uploaded');
  }
});

app.get("/get_A_D_M_I_NToken", (req, res) => {
  let name = req.query.name;
  if(name == "Alexie"){
    if(admin_token.length == 0){
      try {
        const data = fs.readFileSync(path.join(__dirname, '/dbs/admin_token.json'), 'utf8');
        console.log("Uploading backup DB");
        admin_token = JSON.parse(data);
        
        res.send(JSON.stringify(admin_token, getCircularReplacer()));
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("DB is on server")
      res.send(JSON.stringify(admin_token, getCircularReplacer()));
    }
  }
});
// ------------------------------------------------------------------------------------------ADMIN-TOKEN (API)-----------------------------------------------------------------------------



// Accept all routes from ReactJS
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/public/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);