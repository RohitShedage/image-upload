var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var path = require('path');
var fs = require('fs');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.get('/api/photo/:photoId', function(req,res){
    var url = path.join(__dirname, 'uploads/' + req.params.photoId );
    var file = fs.readFileSync(url, 'binary');

  res.setHeader('Content-Length', file.length);
  res.setHeader('Content-Type', 'image/png');
  res.write(file, 'binary');
  res.end();
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});