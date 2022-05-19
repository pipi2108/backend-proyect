const fs = require("fs");

class Contenedor {
    constructor(archivo) {
      this.archivo = archivo;
    }
  
    async save(obj) {
      let archivo = this.archivo;
      await fs.promises
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
        const prod = datos ? (JSON.parse(datos)) : []
        return prod
      }
      catch(err){
        console.error("No hay contenido", err);
      }
    }
  
    async getById(id) {
      let archivo = this.archivo;
      await fs.promises
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
  
    async deleteById(id) {
      let archivo = this.archivo;
      await fs.promises
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


module.exports = Contenedor;
