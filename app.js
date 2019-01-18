var createError = require('http-errors');
var express = require('express');
const router = express.Router()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')

var hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/addNew');
// Handlebars.registerPartial('header', '{{name}}')

var app = express();
const fileUpload = require('express-fileupload');

// view engine setup
hbs.registerPartials(__dirname + '/views/partial');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/addNew', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// default file upload options
// app.use(fileUpload());

// app.get('/ping', function(req, res) {
//   res.send('pong');
// });

// app.post('/addNew', function(req, res) {
//   let sampleFile;
//   let uploadPath;

//   if (Object.keys(req.files).length == 0) {
//     res.status(400).send('No files were uploaded.');
//     return;
//   }

//   console.log('req.files >>>', req.files);

//   sampleFile = req.files.sampleFile;

//   uploadPath = __dirname + '/public/images/' + sampleFile.name;

//   sampleFile.mv(uploadPath, function(err) {
//     if (err) {
//       return res.status(500).send(err);
//     }

//         return res.send('File uploaded!' + uploadPath);
//   });
// });

router.post('/addNew/', (req, res) => {
  let banInfo = req.body

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      res.send('No puppies???')
      return
    }

    let banStuff = JSON.parse(data)
    console.log(banStuff)

    bananas.name = banInfo.name
    bananas.origin = banInfo.origin

    if (banInfo.imageID != undefined) {
      puppy.image = "/images/puppy" + banInfo.imageID + ".jpg"
    }
    fs.appendFile('./data.json', JSON.stringify(banStuff), (err) => {
      if (err) {
        res.send('Something under the hood has broken :(')
        return
      }
      res.send("New profile created")
    })

  })

})

module.exports = app;
