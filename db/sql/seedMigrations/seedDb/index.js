import pool from '../../../db.js'
import fs from 'fs'

const seedSql = fs.readFileSync('./db/sql/seedMigrations/seedDb/seedDb.sql', 'utf8')
await pool.query(seedSql)
