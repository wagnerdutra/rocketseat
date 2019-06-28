const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler') // Para que erros que acontecem dentros
// das promises sejam disparados para o metodo de tratamento de erro
// caso contrario seria necessario colocar um try catch e chamar next(), no metodo
// assincrono

const authMiddleware = require('./app/middlewares/auth')

const {
  UserController,
  SessionController,
  AdController,
  PurchaseController
} = require('./app/controllers')

const { Ad, Purchase, Session, User } = require('./app/validators')

const routes = express.Router()

routes.post('/users', validate(User), handle(UserController.store))

routes.post('/sessions', validate(Session), handle(SessionController.store))

// Todas as rotas daqui para baixo vai usar esse middleware
routes.use(authMiddleware)

/**
 * Ads
 */
routes.get('/ads', handle(AdController.index))
routes.get('/ads/:id', handle(AdController.show))
routes.post('/ads', validate(Ad), handle(AdController.store))
routes.put('/ads/:id', validate(Ad), handle(AdController.update))
routes.delete('/ads/:id', handle(AdController.destroy))

/**
 * Purchase
 */
routes.post('/purchases', validate(Purchase), handle(PurchaseController.store))

module.exports = routes
