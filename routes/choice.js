const express = require('express'),
  router = express.Router();

// get choices list
router.get('/list', function(req, res) {
  //retourner sous forme JSON : choice {'name'....,bins:[{'bin1'},{'...'}]}
  let sql = `Select Choice.ID, Choice.Title from choices Choice`;
  db.query(sql, function(err, data, fields) {
    res.json({
      status: 200,
      data,
      message: "Choice lists retrieved successfully"
    })
  })
});

// create new choice
router.post('/new', function(req, res) {
  let sql = `INSERT INTO choice(Title) VALUES (?)`;
  let values = [
    req.body.title,
  ];
  db.query(sql, [values], function(err, data, fields) {
    res.json({
      status: 200,
      message: "New choice added successfully"
    })
  })
});


// display edit choice
router.get('/edit/(:id)', function(req, res, next) {

  let id = req.params.id;
  
  db.query('Select Choice.Name, Bin.Id, Bin.Name, Bin.Description, Bin.Color, Bin.Image, ModeTri.Name, BinPackaging.PackagingID, Packaging.Name from ModeTriBin, ModeTriChoice, ModeTri, Choice, Bin, Packaging, BinPackaging where ModeTriBin.ModeTriID=ModeTri.Id and ModeTriBin.BinID=Bin.Id and ModeTriChoice.ChoiceID=Choice.Id and ModeTriChoice.ModeTriID=ModeTri.Id and BinPackaging.BinID = Bin.Id and Choice.Id = ' + id, function(err, rows, fields) {
       
      // if user not found
      if (rows.length <= 0) {
        
      }
      // if book found
      else {
          // render to edit.ejs
          res.json({
            status: 200,
            message: "Bin edit"
          })
      }
  })
})

// update book data
router.post('/update/:id', function(req, res, next) {

  let id = req.params.id;
  let name = req.body.title;
  let errors = false;

  if(title.length === 0) {
      errors = true;
      
      // set flash message
      // render to add.ejs with flash message
      res.json({
        status: 500,
        message: "Choice error update"
      })
  }

  // if no error
  if( !errors ) {   

      var form_data = {
        title: title,
      }
      // update query
      db.query('UPDATE choice SET ? WHERE id = ' + id, form_data, function(err, result) {
          //if(err) throw err
          if (err) {
              // set flash message
              // render to edit.ejs
              res.json({
                status: 500,
                message: "Cannot update"
              })
          } else {
            res.json({
              status: 200,
              message: "Choice updated"
            })
          }
      })
  }
})
 
// delete book
router.delete('/delete/(:id)', function(req, res, next) {

  let id = req.params.id;
   
  db.query('DELETE FROM choice WHERE id = ' + id, function(err, result) {
      //if(err) throw err
      if (err) {
          // set flash message
          // redirect to books page
          
      } else {
          // redirect to books page
          res.json({
            status: 200,
            message: "Choice successfully deleted"
          })
      }
  })
})

module.exports = router;