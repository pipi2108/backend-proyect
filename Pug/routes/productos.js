const Contenedor = require("../../contenedor");
const express = require("express");
const {Router} = express;
var path = require('path');

const app = express();
const router = new Router();

let prod = new Contenedor("archivo.txt");

router.get("/", (req, res) =>{
    async function getProducts(){
        try{
            let todos = await prod.getAll()
            res.render("products", {productos: todos})
        }catch(err){
            res.status(404).json({error: "No se ha encontrado los productos"},err);
        }
    }
    getProducts();
})

router.get("/:id", (req, res) => {
    async function getProduct(){
        try {
            let prodId = await prod.getById(parseInt(req.params.id));
            res.send(prodId);
        }catch(err){
            res.status(404).json({error: "No se ha encontrado el producto", err});
        }
    }
    getProduct()
})

router.post("/", (req, res) => {
    let { title, precio, thumbnail } = req.body;
    let prodNuevo = { title, precio, thumbnail };

    async function saveProdNuevo(){
        try{
            await prod.save(prodNuevo);
            res.sendfile(path.resolve("public/form.pug"));
        }catch(err){
            res.status(400).send({ error: "Datos invalidos" }, err);
        }        
    }
    saveProdNuevo();
})

router.delete("/:id", (req, res) => {
    async function deleteProduct(){
        try {
            let prodId = await prod.getById(parseInt(req.params.id));
            if(Object.keys(prodId).length === 0){
                res.send({error: 'No se encontro el producto' })
            }else {
                await prod.deleteById(parseInt(req.params.id));
                res.send(await prod.getAll());
            }
        }catch(err){
            res.status(404).send({ error: "Producto no encontrado" });;
        }
    }
    deleteProduct()
})

router.put("/:id", (req, res) =>{
    let { title, precio, thumbnail } = req.body;
  
    async function putProduct(){
      try {
        let prodModificado  = await prod.getById(parseInt(req.params.id));
        if (Object.keys(prodModificado).length === 0) {
            res.send({error: 'No se encontro el producto' })
        }
        else{
          prodModificado = {
          title,
          precio,
          thumbnail,
          id : parseInt(req.params.id)
        }
          let todos = await prod.read()
          todos = (JSON.parse(todos, null, 2));

          let aux = parseInt(req.params.id) - 1;
          todos.splice(aux, 1, prodModificado);
          await prod.write(todos, "Producto modificado correctamente");
          
          res.send(todos);
        }
      } catch(err){
        res.status(404).send({error: "Producto no encontrado"}, err);
    }
    }
    putProduct()
})

module.exports = router;
