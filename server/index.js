const express = require('express');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, '/../client/public')))

app.get("/api", (req, res) => {
  res.json({ message: "Hello!" });
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/public/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);