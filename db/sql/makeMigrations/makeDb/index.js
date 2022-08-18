import pool from '../../../db.js'
import fs from 'fs'

const sql = fs.readFileSync('./db/sql/makeMigrations/makeDb/makeDb.sql', 'utf8')
await pool.query(sql)
