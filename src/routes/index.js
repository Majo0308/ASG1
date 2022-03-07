const { Router } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const json_favs = fs.readFileSync('src/favs.json', 'utf-8');
let favs = JSON.parse(json_favs);


router.get('/', (req, res) => {
  console.log(req.body.entrada);
  res.render('index', 
  { favs, 
    entrada : req.body.entrada,
    
  });
});

router

router.post('/',(req, res) => {
  console.log(req.body.entrada);
  res.render('index', 
  { favs, 
    entrada : req.body.entrada,
    
  });
});


router.post('/:hacerPost', (req, res) => {

  const { text, id_str, name, screen_name} = req.body;
  let date = new Date();
    let fecha = String(date.getDate()) + String(date.getMonth()) +  + date.getFullYear();
  if (!text || !id_str) {
    res.status(400).send("Entries must have a title and body");
    
    return;
  }
  var user={
    id:0,
    name:"",
    screen_name:"",
  };
  var newfav = {
    id:parseInt(req.body.id_str),
    id_str,
    user,
    text,
    created_at: date
  };

    console.log(parseInt(req.body.id));

  // add a new book to the array
  favs.push(newfav);

  // saving the array in a file
  const json_favs = JSON.stringify(favs);
  fs.writeFileSync('src/favs.json', json_favs, 'utf-8');

  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
  favs = favs.filter(fav => fav.id != req.params.id);

  // saving data
  const json_favs = JSON.stringify(favs);
  fs.writeFileSync('src/favs.json', json_favs, 'utf-8');

  res.redirect('/')
});

module.exports = router;