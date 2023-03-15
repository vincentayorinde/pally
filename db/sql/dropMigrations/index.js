import pool from '../../db.js'
import fs from 'fs'

const dropDb = fs.readFileSync('./db/sql/dropMigrations/dropDb.sql', 'utf8')
await pool.query(dropDb)
