var express = require('express');
var multer = require('multer');
var app = express();
var morgan = require('morgan');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.warn(file);
        callback(null, './uploads');
    },
    filename: function (req , file, callback) {
        callback(null , file.fieldname + '-' + Date.now());
    }
});

var upload = multer({
    storage : storage
}).single('userPhoto');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/photo', function(req, res) {
    upload(req, res, function(err) {
        console.log(err);
        if (err) {
            return res.end('Error uploading file.');
        }
        res.end('File is uploaded');
    });
});

app.listen(3000, function() {
    console.log('http://localhost:3000');
})