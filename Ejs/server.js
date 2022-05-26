const express = require("express");
const Contenedor = require("../contenedor.js")
const routes = require("../routes/productos");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routes);

app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

app.get("/", (req, res) => {
  res.send("Benvenido a nuestra tienda");
});