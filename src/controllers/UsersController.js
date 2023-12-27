const { hash } = require('bcryptjs')
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

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    if (!user) {
      throw new AppError('usuario nao encontrado')
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este email ja esta em uso')
    }

    user.name = name
    user.email = email

    await database.run(
      `UPDATE users SET name = ?,  email = ?, updated_at = ? WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    )

    return response.json()
  }

  async index(request, response) {}

  async show(request, response) {}

  async delete(request, response) {}
}

module.exports = usersController
