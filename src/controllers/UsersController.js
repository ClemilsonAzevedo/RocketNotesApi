const AppError = require("../utils/AppError")

class usersController {
  async create(request, response) {
    const { name, email, password } = request.body

    if(!name){
      throw new AppError('nome e obrigatorio')
    }
    return response.status(201).json({
      name,
      email,
      password,
    })
  }

  async index(reques, response) {}

  async show(reques, response) {}

  async update(reques, response) {}

  async delete(reques, response) {}
}

module.exports = usersController
