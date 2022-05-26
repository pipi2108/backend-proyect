const express = require("express");
const routes = require("../routes/productos");
const handlebars = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "index.hbs",
    partialsDir: "./views/partials",
  })
);

app.use("/api/products", routes);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

app.get("/", (req, res) => {
  res.send("Benvenido a nuestra tienda");
});
