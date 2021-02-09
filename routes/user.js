const express = require('express'),
  router = express.Router();

// get userss list
router.get('/list', function(req, res) {
  //retourner sous forme JSON : users {'name'....,bins:[{'bin1'},{'...'}]}
  let sql = `Select users.id_user, users.Login, users.isAdmin, users.password from users`;
  db.query(sql, function(err, data, fields) {
    res.json({
      status: 200,
      data,
      message: "Users lists retrieved successfully"
    })
  })
});

// create new users
router.post('/new', function(req, res) {
  let sql = `INSERT INTO users(login,password,isAdmin) VALUES (?)`;
  let values = [
    req.body.login,
    req.body.password,
    req.body.isAdmin,
  ];
  db.query(sql, [values], function(err, data, fields) {
    res.json({
      status: 200,
      message: "New users added successfully"
    })
  })
});


// display edit users
router.get('/edit/(:id)', function(req, res, next) {

  let id = req.params.id;
  
  db.query('Select Users.Name, Bin.Id, Bin.Name, Bin.Description, Bin.Color, Bin.Image, ModeTri.Name, BinPackaging.PackagingID, Packaging.Name from ModeTriBin, ModeTriUsers, ModeTri, Users, Bin, Packaging, BinPackaging where ModeTriBin.ModeTriID=ModeTri.Id and ModeTriBin.BinID=Bin.Id and ModeTriUsers.UsersID=Users.Id and ModeTriUsers.ModeTriID=ModeTri.Id and BinPackaging.BinID = Bin.Id and Users.Id = ' + id, function(err, rows, fields) {
       
      // if users not found
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
        message: "Users error update"
      })
  }

  // if no error
  if( !errors ) {   

      var form_data = {
        title: title,
      }
      // update query
      db.query('UPDATE Users SET ? WHERE id = ' + id, form_data, function(err, result) {
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
              message: "Users updated"
            })
          }
      })
  }
})
 
// delete book
router.delete('/delete/(:id)', function(req, res, next) {

  let id = req.params.id;
   
  db.query('DELETE FROM Users WHERE id = ' + id, function(err, result) {
      //if(err) throw err
      if (err) {
          // set flash message
          // redirect to books page
          
      } else {
          // redirect to books page
          res.json({
            status: 200,
            message: "Users successfully deleted"
          })
      }
  })
})

module.exports = router;