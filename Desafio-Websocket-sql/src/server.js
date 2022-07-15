
const express = require("express");
const app = express();
const path = require("path");
const { Server: IOServer } = require("socket.io");

const expressServer = app.listen(8080, (req, res) =>
console.log(`Servidor escuchando`)
);

const io = new IOServer(expressServer);

const Contenedor = require("../api");
const dbconnection = require("./database"); //coneccion para data base productos
const prod = new Contenedor(dbconnection, "products"); //clase con parametros de database y el nomrbre de la tabla

const MsjClass = require("../apimsj");
const dbsqlite = require("./databasesqlite");
const chat = new MsjClass(dbsqlite, "msj");

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", async (socket) => {
  console.log(`Se conecto un usuario, ID: ${socket.id}`);
  let products = await prod.getAll();
  socket.emit("server:productos", products);
  socket.on("cliente:producto", async (producto) => {
    await prod.save(producto);
    setTimeout(async () => {
      let products = await prod.getAll();
      io.emit("server:productos", products);
    }, 200);
  });

  // let arrChat = await chat.getAll()
  // console.log(chat)
  socket.emit("server:chat",await chat.getAll());

  socket.on("cliente:emailMensaje", async (emailMensaje) => {
    // console.log(emailMensaje)
    await chat.save(emailMensaje);
    setTimeout(async () => {
      let arrChat = await chat.getAll().then((res) => {
        return res;
      });
      io.emit("server:chat", arrChat);
    }, 200);
  });
});
