var createError = require('http-errors');
var express = require('express');
const router = express.Router()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')
var multer = require('multer')
var upload = multer({ dest: 'public/images' })
var uploadText = multer({ dest: './' })
var data = require('./data.json');

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
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/addNew', upload.single('sampleFile'), function (req, res, next) {
  let text = req.body

  console.log(upload.single)

  let banName = req.body.name
  let banOri = req.body.origin
  let lastId = data.bananas.length


  data.bananas.push({
    name: banName, origin: banOri, id: lastId + 1, image: "/images/" + req.file.filename
  })

  fs.writeFile(__dirname + '/data.json', JSON.stringify(data), (err) => {
    if (err) {
      res.send('Something under the hood has broken :(')
      return
    }

    res.redirect('/')
  })

})

module.exports = app;
