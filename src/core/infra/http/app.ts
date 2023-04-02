import { billRouter } from '@bill/infra/http/routes'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { fastifySchedule } from '@fastify/schedule'
import fastifyStatic from '@fastify/static'
import { toolsRouter } from '@tools/infra/http/routes'
import { userRouter } from '@user/infra/http/routes'
import { config } from 'dotenv'
import Fastify from 'fastify'
import { resolve } from 'path'

config()

const app = Fastify()

app.register(helmet)
app.register(cors)
app.register(fastifySchedule)
app.register(fastifyStatic, {
  root: resolve(__dirname, '..', '..', '..', 'smartSheet'),
  prefix: '/v1/sheet/'
})

app.register(userRouter, { prefix: '/v1/user' })
app.register(billRouter)
app.register(toolsRouter, { prefix: '/v1/tools' })

export default app
