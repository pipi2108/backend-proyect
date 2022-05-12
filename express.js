const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log("Servidor corriendo en " + PORT);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

app.get("/", (req, res) => {
  res.send(`
    <div style='height: 50vh; width: 100vw;'>
    <ul style='text-align:center;'>
      <li ><h2><a href="/productos">Todos los Productos</a></h2></li>
      <li ><h2><a href="/productoRandom">Producto random</a></h2></li>
    </ul>
    </div>
    `);
});

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  save(obj) {
    let archivo = this.archivo;
    fs.promises
      .readFile(`${archivo}`, "utf-8")
      .then((contenido) => {
        if (contenido.length) {
          let cont = JSON.parse(contenido).length;
          obj.id = JSON.parse(contenido)[cont - 1].id + 1;
          async function agregarProd() {
            try {
              let nuevosProd = JSON.parse(contenido);
              nuevosProd.push(obj);
              await fs.promises.writeFile(
                `./${archivo}`,
                JSON.stringify(nuevosProd, null, 2)
              );
              console.log(`Se cargo el producto, numero de id: ${obj.id}`);
            } catch (e) {
              console.error(e);
            }
          }
          agregarProd();
        } else {
          obj.id = 1;
          async function iniciarJson() {
            try {
              let nuevosProd = [obj];
              await fs.promises.writeFile(
                `./${archivo}`,
                JSON.stringify(nuevosProd, null, 2)
              );
              console.log(`Se cargo el producto, numero de id: ${obj.id}`);
            } catch (err) {
              console.error("Hubo un error", err);
            }
          }
          iniciarJson();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async getAll() {
    try {
      const datos = await fs.promises.readFile(`./${this.archivo}`, "utf-8")
      const prod = await datos ? (JSON.parse(datos)) : []
      return prod
    }
    catch(err){
      console.error("No hay contenido", err);
    }
  }

  getById(id) {
    let archivo = this.archivo;
    fs.promises
      .readFile(`./${archivo}`, "utf-8")
      .then((respuesta) => {
        const resultado = JSON.parse(respuesta).find((e) => e.id === id);
        if (resultado) {
          console.log(resultado);
        } else {
          console.log("Id no encontrada");
        }
      })
      .catch((err) => {
        console.error("No se encontraron id", err);
      });
  }

  deleteById(id) {
    let archivo = this.archivo;
    fs.promises
      .readFile(`./${archivo}`, "utf-8")
      .then((respuesta) => {
        let respuestaFiltrada = JSON.parse(respuesta).filter(
          (e) => e.id !== id
        );
        async function eliminar() {
          try {
            await fs.promises.writeFile(
              `./${archivo}`,
              JSON.stringify(respuestaFiltrada, null, 2)
            );
            !JSON.parse(respuesta).some((e) => e.id === id)
              ? console.log("No se encontro la id de el producto")
              : console.log("Producto borrado");
          } catch (err) {
            console.error("No se ha podido eliminar", err);
          }
        }
        eliminar();
      })
      .catch((err) => {
        console.log("Algo falló", err);
      });
  }

  deleteAll() {
    let archivo = this.archivo;
    async function borrarTodo() {
      try {
        await fs.promises.writeFile(`./${archivo}`, "");
        console.log("Todos los productos fueron eliminados");
      } catch (err) {
        console.error("No se pudo eliminar", err);
      }
    }
    borrarTodo();
  }
}

const myProd = new Contenedor("archivo.txt");

const random = (max) => {
  return Math.floor(Math.random() * max);
};

app.get("/productos", (req,res)=>{
  async function getAll(){
    try{
      let aux = await myProd.getAll();
      aux = JSON.stringify(aux, null, 2);
      res.send(`Estos son los productos: <br><br> ${aux} <br><br> <a href="../">Volver</a>`);
    }
    catch(error){
      throw Error("Error en todos los productos")
    }  
  }    
getAll();

})

app.get("/productoRandom", async (req, res) => {
  let respuesta = await myProd.getAll();
  res.json(respuesta[random(respuesta.length)]);
});
