const Contenedor = require("./contenedor.js");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/productos");
app.use("/api/products", routes);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

app.get("/", (req, res)=>{
  res.send("Benvenido a nuestra tienda");
})
