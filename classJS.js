class User {
    constructor(name = "Ingrese nombre", lastName = "Ingrese Apellido"){
        this.name = name
        this.lastName = lastName
        this.books = []
        this.pets = []
    }

    getFullName = () =>{
        console.log(`El usuario es: ${this.name} ${this.lastName}`)
    }
    addPet = (petName) =>{
        this.pets.push(petName)
    }
    getPets = () =>{
        console.log(this.pets.length)
    }
    addBook = (bookName, author) =>{
        this.books.push({
            name: bookName,
            author: author
        })
    }
    getBookNames = () =>{
        console.log(this.books.map(book => ({...book}))) 
    }
}

let firstUser = new User("Diego Armando", "Maradona")

firstUser.getFullName()

firstUser.addPet("Tigre")
firstUser.addPet("Jirafa")
firstUser.addPet("Leon")

firstUser.getPets()

firstUser.addBook("El principito", "Antoine de Saint-Exupéry")
firstUser.getBookNames()

console.log(firstUser)



