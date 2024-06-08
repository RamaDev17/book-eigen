import express from 'express'
import cors from 'cors'
import app from '../routes'
import swaggerUi from 'swagger-ui-express'
import { specs } from '../config/swagger'

const appMiddleware = express()

appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
)

appMiddleware.options('*', cors())
appMiddleware.use(express.json())
appMiddleware.use(app)
appMiddleware.use('/api', swaggerUi.serve, swaggerUi.setup(specs))

export default appMiddleware