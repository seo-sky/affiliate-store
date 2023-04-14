const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { deflateRawSync } = require('zlib');


const app = express();

let categories = [];


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

// ------------------------------------------------------------------------------------------CATEGORIES----------------------------------------------------------------------------- 
app.post('/addCategory', (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, '/dbs/categories.json'), 'utf8');
  console.log("reading DB");

  let data2 = JSON.parse(data);
  console.log(data)
  data2.push(req.body);
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data2, getCircularReplacer()));
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
  console.log(data2);
  categories = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data2, getCircularReplacer()));
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
// ------------------------------------------------------------------------------------------CATEGORIES-----------------------------------------------------------------------------

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/public/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);