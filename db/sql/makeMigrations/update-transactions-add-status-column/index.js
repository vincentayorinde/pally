import pool from '../../../db.js'
import fs from 'fs'

const sql = fs.readFileSync('./db/sql/makeMigrations/update-transactions-add-status-column/update-transactions-add-status-column.sql', 'utf8')
await pool.query(sql)
