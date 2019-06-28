const Ad = require('../models/Ad')

class AdController {
  async index(req, res) {
    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    // const ads = await Ad.paginate(
    //   {}, // Funciona como filtro, exemplo { price: 2000 }
    //   {
    //     page: req.query.page || 1,
    //     limit: 10,
    //     populate: ['author' /*, outros */], // Usado para trazer os dados do relacionamento "join" normal seria .find.populate("")
    //     sort: '-createdAt'
    //   }
    // )

    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 10,
      populate: ['author' /*, outros */],
      sort: '-createdAt'
    })

    return res.json(ads)
  }

  async show(req, res) {
    const ad = await Ad.findById(req.params.id)
    return res.json(ad)
  }

  async store(req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })
    return res.json(ad)
  }

  async update(req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true // Retorna a instancia atualizada para a constante "ad"
    })
    return res.json(ad)
  }

  async destroy(req, res) {
    await Ad.findByIdAndDelete(req.params.id)
    return res.send()
  }
}

module.exports = new AdController()
