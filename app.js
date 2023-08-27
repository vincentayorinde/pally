import express from 'express'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import taskRouter from './routes/tasks.js'
import settingsRouter from './routes/settings.js'
import transactionsRouter from './routes/transactions.js'
import revenuesRouter from './routes/revenue.js'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

const corsOptions = { credential: true, origin: process.env.URL || '*' }
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(join(__dirname, 'public')))
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/datata', taskRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/transactions', transactionsRouter)
app.use('/api/revenues', revenuesRouter)

export default app
