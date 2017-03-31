var express = require('express');
var multer = require('multer');
var app = express();
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser')

// var storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         // console.warn(file);
//         callback(null, './uploads');
//     },
//     filename: function (req , file, callback) {
//         callback(null , file.fieldname + '-' + Date.now());
//     }
// });
var storage = multer.memoryStorage()
var upload = multer({
    storage : storage
})
// .fields([
//   { name: 'userPhoto', maxCount: 1 },
//   { name: 'userPhoto2', maxCount: 1 }
// ]);
.any();
// var upload = multer({ storage: multer.memoryStorage({}) }).fields([
//   { name: 'userPhoto', maxCount: 1 },
//   { name: 'userPhoto2', maxCount: 1 }
// ]);

app.use(morgan('dev'));

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer({
//     dest: './uploads/',
//     inMemory: true
// }));
// // parse application/json
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//     next();
// })
// app.use(multer({ dest: './uploads/'}));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/upload', function(req, res) {
    // console.warn(req.files);
    upload(req, res, function(err) {
        // console.log/(err);
        console.log(req.body)
        console.log(req.files)
        if (err) {
            return res.end('Error uploading file.');
        }
        res.end('File is uploaded');
    });
});

app.listen(3000, function() {
    console.log('http://localhost:3000');
})