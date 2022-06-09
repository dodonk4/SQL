const port = 8080;
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const Contenedor = require('./public/productos');
const Mensajeria = require('./public/mensajes');

const caja = new Contenedor();
const mensajeria = new Mensajeria();

// const productos = caja.obtenerTodos();
const mensajes = mensajeria.obtenerTodos();

const app = express();

app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine({defaultLayout: "index"}));
app.set('view engine', 'handlebars');
app.set("views", "./views");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'));

httpServer.listen(port, () => console.log(`App listening to port ${port}`));





app.get('/', async (req, res) => {
    
    let productos = await caja.obtenerTodos();
    res.render('inicio', { titulo: 'PRODUCTO', titulo2: 'PRECIO', titulo3: 'THUMBNAIL', productos, mensajes});
});




io.on('connection', (socket)=>{
    
    console.log('Usuario conectado: ' + socket.id);


    socket.on('prod', (data)=>{
        productos.push(data);
        console.log(productos);
        io.sockets.emit('prod', data)
    })

    socket.on('mensaje', (data)=>{
        mensajes.push(data);
        console.log(mensajes);
        io.sockets.emit('mensaje', data);

    })

})


