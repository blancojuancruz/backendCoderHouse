const fs = require("fs")

class Container {
    constructor(fileName) {
        this.fileName = fileName
        this.id = 0
        this.products = []
    }

    writeFiles = async () => {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.products))
        } catch (err) {
            console.log(`${err}: No se pudo completar la operacion`)
        }
    }

    save = (object) => {
        try {
            this.id++
            object["id"] = this.id
            this.products.push(object)
            this.writeFiles()

            return this.id
        } catch (err) {
            console.log(`${err}: El objeto no pudo ser guardado correctamente`)
        }
    }

    getById = (id) => {
        try {
            let result
            if (this.products !== []) {
                result = this.products.find(product => product.id === id)
                if (result === undefined) {
                    result = null
                }
            } else {
                result = "Empty File"
            }

            return result
        } catch (err) {
            console.log(`${err}: No se encontro el Id solicitado`)
        }
    }

    getAll = async () => {
        return this.products
    }

    deleteById = (id) => {
        try {
            let result
            if (this.products !== []) {
                let newProductsList = this.products.filter(product => product.id !== id)
                this.products = newProductsList
                this.writeFiles()
                result = "Producto eliminado correctamente"
            } else {
                result = "Empty file"
            }

            return result
        } catch (err) {
            console.log(`${err}: No se pudo elimiar el producto`)
        }
    }

    deleteAll = () => {
        try {
            this.products = this.products.splice(0, this.products.length)
            this.writeFiles()

            console.log("Lista eliminada")
        } catch (err) {
            console.log(`${err}: No se pudo elimiar la lista`)
        }
    }
}

const myCont = new Container("./test.txt")

myCont.save({ title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" })

myCont.save({ title: "Calculadora", price: 234.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png" })

myCont.save({ title: "Globo Terráqueo", price: 345.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png" })

myCont.getById(2)

myCont.getAll()

myCont.deleteById(1)

myCont.deleteAll()