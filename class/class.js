class User {
  constructor (name = '', lastName = '', books = [], pets = []) {
    this.name = name
    this.lastName = lastName
    this.books = books
    this.pets = pets
  }

  getFullName = () => {
    return `El usuario es: ${this.name} ${this.lastName}`
  }

  addPet = (petName = '') => {
    this.pets.push(petName)
  }

  getPets = () => {
    return this.pets.length
  }

  addBook = (bookName, author) => {
    this.books.push({
      name: bookName,
      author
    })
  }

  getBookNames = () => {
    return this.books.map(book => book.name)
  }
}

const firstUser = new User('Diego Armando', 'Maradona', [{ name: 'El Señor de los Anillos', author: 'J.R.R Tolkien' }], ['Perro', 'Gato'])

firstUser.getFullName()

firstUser.addPet('Tigre')
firstUser.addPet('Jirafa')
firstUser.addPet('Leon')

firstUser.getPets()

firstUser.addBook('El principito', 'Antoine de Saint-Exupéry')
firstUser.getBookNames()
