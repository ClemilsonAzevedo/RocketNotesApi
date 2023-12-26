class usersController {
  async create(request, response) {
    const { name, email, password } = request.body

    return response.json({
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
