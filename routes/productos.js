const Contenedor = require("../contenedor.js");
const express = require("express");
const {Router} = express;

const app = express();
const router = new Router();
let prod = new Contenedor("archivo.txt");

router.get("/", (req, res) =>{
    async function getProducts(){
        try{
            let todos = await prod.getAll()
            res.send(todos)
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
            res.send(prodNuevo)
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


// const myProd = new Contenedor("archivo.txt");

// const random = (max) => {
//   return Math.floor(Math.random() * max);
// };

// app.get("/productos", (req,res)=>{
//   async function getAll(){
//     try{
//       let aux = await myProd.getAll();
//       aux = JSON.stringify(aux, null, 2);
//       res.send(`Estos son los productos: <br><br> ${aux} <br><br> <a href="../">Volver</a>`);
//     }
//     catch(error){
//       throw Error("Error en todos los productos")
//     }  
//   }    
// getAll();

// })

// app.get("/productoRandom", async (req, res) => {
//   let respuesta = await myProd.getAll();
//   res.json(respuesta[random(respuesta.length)]);
// });