/*Proyecto realizado por Nazarena Florencia Rusin*/

//Requiero las dependencias necesarias para que la pagina funcione correctamente
var express = require('express');
var path = require('path');
var logger = require('morgan');
const request = require('request');
const bodyParser=require('body-parser')

//Declaro la url de la api para que pueda ser reutilizada
const url="https://60c697c719aa1e001769f7c8.mockapi.io/marketing/leads"

var indexRouter = require('./routes/index');

var app = express();

//Arregla el formato de lo que es enviado por el formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Muestra el css y el js de la pagina
app.use('/views', express.static(path.resolve(__dirname, 'views')));
app.use('/root', express.static(path.resolve(__dirname, 'root')));

app.use('/', indexRouter);

//Utiliza el metodo GET para poder obtener los datos de la api y mostrarlos por pantalla
//Cree la ruta /get en la cual se puede ingresar desde el navegador para poder obtener los datos de la api//
app.get('/get', (req,res)=>{
  request.get(url, {json:true}, function(err, r){
      if(err){
        alert("Error")
      }

      else{
        res.send(r.body)
      }
  })
});

//Utiliza el metodo POST para poder enviar lo que se ingresa en el formulario hacia la api
app.post('/', (req,res)=>{
      let user={
        'name': req.body.name,
        'e-mail': req.body.email,
        'subject': req.body.subject,
        'message': req.body.message,
      }

      request.post(url, {form:user, json:true}, (err,r)=>{
        if(err){
          alert("Error");
        }
        
        else{
          res.send(r.body);
        }
      })
})

//Levanta el servidor en el puerto 4000
app.listen(4000, ()=>{
  console.log("Server levantado en el puerto 4000");
})

module.exports = app;