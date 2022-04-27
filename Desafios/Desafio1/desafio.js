class Usuario{
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        console.log(`Nombre completo: ${this.nombre} ${this.apellido}`)
    }

    addMascotas (mascota) {
        console.log(this.mascotas.push(mascota))
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook = (nombre, autor) => {
        console.log(this.libros.push({nombre, autor}))
    }

    getBooksName = () =>{
        return this.libros.map (libros => libros.nombre)  
    }

    getMascotasName = () =>{
        return this.mascotas
    }

}

const javier = new Usuario('Javier', 'Ambrosio',[{nombre:"El principito", autor: "Antoine de Saint-Exupéry"}], ["Oliver", "Sashi"])


javier.getFullName()
console.log(javier.getBooksName())
console.log(javier.countMascotas())
javier.addMascotas("Bono")
javier.addBook("Don quijote de la Mancha", "Miguel de Cervantes")
console.log(javier.getBooksName())
console.log(javier.getMascotasName())