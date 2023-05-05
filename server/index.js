const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const {
  deflateRawSync
} = require('zlib');


const app = express();

// Local Server DB
let categories = [];
let products = [];
let products_stats = [];
let admin_token = [];
let admin_data = [];
let admin_log = [];
let access_stats = [];
const monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Junie", "Julie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
const standardYearMonths = [{
  month: "Ianuarie",
  clicks: 0
}, {
  month: "Februarie",
  clicks: 0
}, {
  month: "Martie",
  clicks: 0
}, {
  month: "Aprilie",
  clicks: 0
}, {
  month: "Mai",
  clicks: 0
}, {
  month: "Iunie",
  clicks: 0
}, {
  month: "Iulie",
  clicks: 0
}, {
  month: "August",
  clicks: 0
}, {
  month: "Septembrie",
  clicks: 0
}, {
  month: "Octombrie",
  clicks: 0
}, {
  month: "Noiembrie",
  clicks: 0
}, {
  month: "Decembrie",
  clicks: 0
}]




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

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//
//
//
//
//
//
//
//
//
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
    if (item.id == category.id) {
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
  if (categories.length == 0) {
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
  data2.splice((parseInt(id) - 1), 1)
  let i = 1;
  let data3 = [];
  data2.map((item) => {
    data3.push({
      "id": i,
      "name": item.name,
      subcategories: item.subcategories
    });
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
  data2[parseInt(id) - 1].subcategories.splice((parseInt(subid) - 1), 1)
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
  data2[parseInt(id) - 1].subcategories.push(name);
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
  data2[parseInt(id) - 1].subcategories[parseInt(subid) - 1] = name;
  fs.writeFileSync(path.join(__dirname, '/dbs/categories.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});

// ------------------------------------------------------------------------------------------CATEGORIES (API)-----------------------------------------------------------------------------
//
//
//
//
//
//
//
//
//
// ------------------------------------------------------------------------------------------PRODUCTS (API)-----------------------------------------------------------------------------
app.get("/getAllProducts", (req, res) => {
  if (products.length == 0) {
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
  
  const d = new Date();
  let currentYear = d.getFullYear();
  const products_clicks = fs.readFileSync(path.join(__dirname, '/dbs/added_products_stats.json'), 'utf8');
  let accessStats = JSON.parse(products_clicks);
  let v = [];

  if (accessStats.length > 0) {
    let ises = false;
    accessStats.map((an) => {
      if (an.an === currentYear) {
        ises = true;
      }
    });
    if (!ises) {
      accessStats.push({
        an: currentYear,
        months: standardYearMonths
      });
    }
  } else {
    accessStats.push({
      an: currentYear,
      months: standardYearMonths
    });
  }
  accessStats.map((an) => {
    if (Number(an.an) === Number(currentYear)) {
      an.months.map((month) => {
        if (month.month === monthNames[d.getMonth()]) {
          month.clicks = Number(month.clicks) + 1
        }
      })
    }
  })
  res.send(accessStats);
  access_stats = accessStats;
  fs.writeFileSync(path.join(__dirname, '/dbs/added_products_stats.json'), JSON.stringify(accessStats, getCircularReplacer()));
});

app.get("/deleteProduct", (req, res) => {
  let id = req.query.id;
  console.log(id)
  const data = fs.readFileSync(path.join(__dirname, '/dbs/products.json'), 'utf8');
  console.log("reading DB");
  let data2 = JSON.parse(data);
  data2.splice((parseInt(id) - 1), 1)
  let i = 1;
  let data3 = [];
  data2.map((item) => {
    // Add all data available in products.json
    data3.push({
      "id": i,
      "date": item.date,
      "clicks": item.clicks,
      "name": item.name,
      "subname": item.subname,
      "price": item.price,
      "image": item.image,
      "description": item.description,
      "distribuitor": item.distribuitor,
      "category": item.category,
      "subcategory": item.subcategory,
      "link": item.link
    });
    i++;
  });
  console.log(data3);
  products = data3;
  fs.writeFileSync(path.join(__dirname, '/dbs/products.json'), JSON.stringify(data3, getCircularReplacer()));
  

  const d = new Date();
  let currentYear = d.getFullYear();
  const products_clicks = fs.readFileSync(path.join(__dirname, '/dbs/deleted_products_stats.json'), 'utf8');
  let accessStats = JSON.parse(products_clicks);
  let v = [];

  if (accessStats.length > 0) {
    let ises = false;
    accessStats.map((an) => {
      if (an.an === currentYear) {
        ises = true;
      }
    });
    if (!ises) {
      accessStats.push({
        an: currentYear,
        months: standardYearMonths
      });
    }
  } else {
    accessStats.push({
      an: currentYear,
      months: standardYearMonths
    });
  }
  accessStats.map((an) => {

    if (Number(an.an) === Number(currentYear)) {
      an.months.map((month) => {
        if (month.month === monthNames[d.getMonth()]) {
          month.clicks = Number(month.clicks) + 1
        }
      })
    }
  })
  res.send(accessStats);
  access_stats = accessStats;
  fs.writeFileSync(path.join(__dirname, '/dbs/deleted_products_stats.json'), JSON.stringify(accessStats, getCircularReplacer()));
});


app.post('/editProduct', (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, '/dbs/products.json'), 'utf8');
  console.log("reading DB");

  let data2 = JSON.parse(data);
  let product = req.body
  console.log(product);
  data2.map((item) => {
    if (item.id == product.id) {
      item.date = product.date;
      item.clicks = product.clicks;
      item.name = product.name;
      item.subname = product.subname;
      item.price = product.price;
      item.image = product.image;
      item.description = product.description;
      item.distribuitor = product.distribuitor;
      item.category = product.category;
      item.subcategory = product.subcategory;
      item.link = product.link;
    }
  })
  products = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/products.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});

// ------------------------------------------------------------------------------------------PRODUCTS (API)-----------------------------------------------------------------------------
//
//
//
//
//
//
//
//
//
// ------------------------------------------------------------------------------------------ADMIN-LOGIN (API)-----------------------------------------------------------------------------
app.get("/getAdminData", (req, res) => {
  if (admin_data.length == 0) {
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

app.get("/deleteAdminUser", (req, res) => {
  let id = req.query.id;
  console.log(id)
  const data = fs.readFileSync(path.join(__dirname, '/dbs/admin_data.json'), 'utf8');
  console.log("reading DB");
  let data2 = JSON.parse(data);
  data2.splice((parseInt(id) - 1), 1)
  let i = 1;
  let data3 = [];
  data2.map((item) => {
    data3.push({
      "id": i,
      "email": item.email,
      "password": item.password
    });
    i++;
  });
  console.log(data3);
  admin_data = data3;
  fs.writeFileSync(path.join(__dirname, '/dbs/admin_data.json'), JSON.stringify(data3, getCircularReplacer()));
  res.send('record deleted from the database');
});

app.post('/editAdminUser', (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, '/dbs/admin_data.json'), 'utf8');
  console.log("reading DB");

  let data2 = JSON.parse(data);
  let category = req.body
  console.log(category);
  data2.map((item) => {
    if (item.id == category.id) {
      item.email = category.email;
      item.password = category.password;
    }
  })
  admin_data = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/admin_data.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});

app.post('/addAdminUser', (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, '/dbs/admin_data.json'), 'utf8');
  console.log("reading DB");

  let data2 = JSON.parse(data);
  console.log(data)
  data2.push(req.body);
  admin_data = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/admin_data.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});

// ------------------------------------------------------------------------------------------ADMIN-LOGIN (API)-----------------------------------------------------------------------------
//
//
//
//
//
//
//
//
//
// ------------------------------------------------------------------------------------------ADMIN-TOKEN (API)-----------------------------------------------------------------------------
app.get("/edit_A_D_M_I_NToken", (req, res) => {
  let name = req.query.name;
  let token = req.query.token;
  if (name == "Alexie") {
    let data2;
    data2 = [{
      token: token
    }];
    admin_token = data2;
    fs.writeFileSync(path.join(__dirname, '/dbs/admin_token.json'), JSON.stringify(data2, getCircularReplacer()));
    res.send('New token uploaded');
  }
});

app.get("/get_A_D_M_I_NToken", (req, res) => {
  let name = req.query.name;
  if (name == "Alexie") {
    if (admin_token.length == 0) {
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

app.post('/addAdminLog', (req, res) => {

  const data = fs.readFileSync(path.join(__dirname, '/dbs/admin_log.json'), 'utf8');
  console.log("reading DB");

  let data2 = JSON.parse(data);
  console.log(data)
  data2.push(req.body);
  admin_log = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/admin_log.json'), JSON.stringify(data2, getCircularReplacer()));
  res.send('record is added to the database');
});

app.get("/getAdminLog", (req, res) => {
  if (admin_log.length == 0) {
    try {
      const data = fs.readFileSync(path.join(__dirname, '/dbs/admin_log.json'), 'utf8');
      console.log("Uploading backup DB");
      admin_log = JSON.parse(data);

      res.send(JSON.stringify(admin_log, getCircularReplacer()));
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("DB is on server")
    res.send(JSON.stringify(admin_log, getCircularReplacer()));
  }
});

app.get('/deleteAllAdminLog', (req, res) => {
  admin_log = [];
  fs.writeFileSync(path.join(__dirname, '/dbs/admin_log.json'), JSON.stringify([]));
  res.send('record is added to the database');
});
// ------------------------------------------------------------------------------------------ADMIN-TOKEN (API)-----------------------------------------------------------------------------
//
//
//
//
//
//
//
//
//
// ------------------------------------------------------------------------------------------STATS (API)-----------------------------------------------------------------------------
app.get("/clickProduct", (req, res) => {
  let product_id = req.query.id;
  const data = fs.readFileSync(path.join(__dirname, '/dbs/products.json'), 'utf8');
  const d = new Date();
  let currentYear = d.getFullYear();
  console.log("reading DB");

  let data2 = JSON.parse(data);
  data2.map((item) => {
    if (Number(item.id) === Number(product_id)) {
      item.clicks = Number(item.clicks) + 1
    }
  });
  products = data2;
  fs.writeFileSync(path.join(__dirname, '/dbs/products.json'), JSON.stringify(data2, getCircularReplacer()));
  const products_clicks = fs.readFileSync(path.join(__dirname, '/dbs/products_clicks.json'), 'utf8');
  let clicksProd = JSON.parse(products_clicks);
  let v = [];

  if (clicksProd.length > 0) {
    let ises = false;
    clicksProd.map((an) => {
      if (an.an === currentYear) {
        ises = true;
      }
    });
    if (!ises) {
      clicksProd.push({
        an: currentYear,
        months: standardYearMonths
      });
    }
  } else {
    clicksProd.push({
      an: currentYear,
      months: standardYearMonths
    });
  }
  clicksProd.map((an) => {

    if (Number(an.an) === Number(currentYear)) {
      an.months.map((month) => {
        if (month.month === monthNames[d.getMonth()]) {
          month.clicks = Number(month.clicks) + 1
        }
      })
    }
  })
  res.send(clicksProd);
  products_stats = clicksProd;
  fs.writeFileSync(path.join(__dirname, '/dbs/products_clicks.json'), JSON.stringify(clicksProd, getCircularReplacer()));
});

app.get("/accessApp", (req, res) => {
  const d = new Date();
  let currentYear = d.getFullYear();
  const products_clicks = fs.readFileSync(path.join(__dirname, '/dbs/access_stats.json'), 'utf8');
  let accessStats = JSON.parse(products_clicks);
  let v = [];

  if (accessStats.length > 0) {
    let ises = false;
    accessStats.map((an) => {
      if (an.an === currentYear) {
        ises = true;
      }
    });
    if (!ises) {
      accessStats.push({
        an: currentYear,
        months: standardYearMonths
      });
    }
  } else {
    accessStats.push({
      an: currentYear,
      months: standardYearMonths
    });
  }
  accessStats.map((an) => {

    if (Number(an.an) === Number(currentYear)) {
      an.months.map((month) => {
        if (month.month === monthNames[d.getMonth()]) {
          month.clicks = Number(month.clicks) + 1
        }
      })
    }
  })
  res.send(accessStats);
  access_stats = accessStats;
  fs.writeFileSync(path.join(__dirname, '/dbs/access_stats.json'), JSON.stringify(accessStats, getCircularReplacer()));
});
// ------------------------------------------------------------------------------------------STATS (API)-----------------------------------------------------------------------------

// Accept all routes from ReactJS
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);