const express = require('express'),
  router = express.Router();

// get choiceusers list
router.get('/list', function(req, res) {
  //retourner sous forme JSON : choiceuser {'name'....,bins:[{'bin1'},{'...'}]}
  let sql = `Select ChoiceUser.ChoiceID, ChoiceUser.UserID from ChoiceUser`;
  db.query(sql, function(err, data, fields) {
    res.json({
      status: 200,
      data,
      message: "choiceuser lists retrieved successfully"
    })
  })
});

// create new choiceuser
router.post('/new', function(req, res) {
  let sql = `INSERT INTO ChoiceUser(ChoiceID,UserID) VALUES (?)`;
  let values = [
    req.body.choiceID,
    req.body.userID,
  ];
  db.query(sql, [values], function(err, data, fields) {
    res.json({
      status: 200,
      message: "New choiceuser added successfully"
    })
  })
});


// display edit choiceuser
router.get('/edit/(:id)', function(req, res, next) {

  let id = req.params.id;
  
  db.query('Select choiceuser.Name, Bin.Id, Bin.Name, Bin.Description, Bin.Color, Bin.Image, ModeTri.Name, BinPackaging.PackagingID, Packaging.Name from ModeTriBin, ModeTrichoiceuser, ModeTri, choiceuser, Bin, Packaging, BinPackaging where ModeTriBin.ModeTriID=ModeTri.Id and ModeTriBin.BinID=Bin.Id and ModeTrichoiceuser.choiceuserID=choiceuser.Id and ModeTrichoiceuser.ModeTriID=ModeTri.Id and BinPackaging.BinID = Bin.Id and choiceuser.Id = ' + id, function(err, rows, fields) {
       
      // if choiceuser not found
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
router.post('/update/:choiceID/:userID', function(req, res, next) {

  let choiceid = req.params.choiceID;
  let userid = req.params.userID;
  let errors = false;

  if(choiceid === 0) {
      errors = true;
      
      // set flash message
      // render to add.ejs with flash message
      res.json({
        status: 500,
        message: "choiceuser error update"
      })
  }

  // if no error
  if( !errors ) {   

      var form_data = {
        choiceid: choiceid,
        userid: userid
      }
      // update query
      db.query('UPDATE ChoiceUser SET ? WHERE UserID = '+ userid, form_data, function(err, result) {
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
              message: "choiceuser updated"
            })
          }
      })
  }
})
 
// delete book
router.delete('/delete/(:id)', function(req, res, next) {

  let id = req.params.id;
   
  db.query('DELETE FROM ChoiceUser WHERE UserID = ' + id, function(err, result) {
      //if(err) throw err
      if (err) {
          // set flash message
          // redirect to books page
          
      } else {
          // redirect to books page
          res.json({
            status: 200,
            message: "choiceuser successfully deleted"
          })
      }
  })
})

module.exports = router;