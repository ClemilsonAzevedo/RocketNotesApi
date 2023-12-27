const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppError')

class usersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUsersExist = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUsersExist) {
      throw new AppError('Este usuario ja existe')
    }

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    )

    return response.status(201).json()
  }

  async index(request, response) {}

  async show(request, response) {}

  async update(request, response) {}

  async delete(request, response) {}
}

module.exports = usersController
