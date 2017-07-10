const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const rmdir = require('rimraf');

const port = process.env.PORT || 3500;

const upload = multer({ dest: 'uploads/' });
const app = express();

app.use(morgan());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index');
});

 app.post('/', upload.single('myfile'), (request, response) => {
  const fileSize = request.file.size;

  rmdir('./uploads/*', error => console.log(error));
  response.json({size: fileSize});
});

app.listen(port);
