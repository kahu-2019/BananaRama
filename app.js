var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
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
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/addNew', function(req, res) {
  let sampleFile;
  let uploadPath;
  let id = req.params.id;
  let banInfo = req.body;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files);

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/public/images/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

        return res.send('File uploaded!' + uploadPath);

        // fs.readFile('./data.json', 'utf8', (err, data) => {
        //   if (err) {
        //     res.send('No puppies???')
        //     return
        //   }
      
        //   let pupStuff = JSON.parse(data)
      
        //   let pup = pupStuff.puppies.find((aPup) => aPup.id == id)
      
      
        //   pup.name = pupInfo.name
        //   pup.breed = pupInfo.breed
        //   pup.owner = pupInfo.owner
      
        //   if (pupInfo.imageID != undefined) {
        //     puppy.image = "/images/puppy" + pupInfo.imageID + ".jpg"
        //   }
        //   fs.writeFile('./data.json', JSON.stringify(pupStuff), (err) => {
        //     if (err) {
        //       res.send('Something under the hood has broken :(')
        //       return
        //     }
        //     res.redirect("/puppies/" + id)
        //   })
      
        // })
  });
});

module.exports = app;
