if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}

const express = require('express'); //el framework minimalista que utilizaremos
const morgan = require('morgan'); //para ver las peticiones
const multer = require('multer'); //para subir las imagenes sin picar todo el código
const path = require('path'); //para ayuda en directorios

//inicialitions
const app = express();
require('./dastabase');

//settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req,file,cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
        }
    })
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.use('/api/books', require('./routes/books'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'));
})