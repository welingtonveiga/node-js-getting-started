// server.js
var express = require('express')
var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()
var fileUpload = require('express-fileupload')

server.use(middlewares)
server.use(fileUpload())

server.get('/echo/:username', function (req, res) {
  console.log("aqui!");
  res.status(200);
  res.send();
}); 

app.use("/uploads", express.static(__dirname+'/public/uploads/'));

server.post('/uploads/:username', function(req, res) {
  var file;

  console.log(req.files);
  console.log(req);

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  file = req.files.file;

  // Use the mv() method to place the file somewhere on your server 
  file.mv(__dirname+'/public/uploads/'+req.params.username+'.jpg', function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(201);
      res.send('');
    }
  });
});

server.use(router)

server.listen((process.env.PORT || 5000), function () {
  console.log('Node app is running!');
})
