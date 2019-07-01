require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const validate = require('express-validation')
const Youch = require('youch')
const Sentry = require('@sentry/node')
const { uri } = require('./config/database')
const sentryConfig = require('./config/sentry')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception() // deve vir dps das rotas
  }

  sentry() {
    Sentry.init(sentryConfig)
  }

  database() {
    mongoose.connect(uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
  }

  middlewares() {
    this.express.use(express.json()) // Consegue ler requisições no formato json
    this.express.use(Sentry.Handlers.requestHandler())
  }

  routes() {
    this.express.use(routes)
  }

  exception() {
    if (process.env.NODE_ENV === 'production ') {
      this.express.use(Sentry.Handlers.errorHandler())
    }
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        // Usado para detalhar melhor erro mostando a linha que ocorreu, método, arquivo.. etc
        const youch = new Youch(err, req)
        // return res.send(await youch.toHTML()) // Retorna em HTML para melhor visualização
        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
