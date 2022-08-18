import pool from '../../../db.js'
import fs from 'fs'

const sql = fs.readFileSync('./db/sql/makeMigrations/update-wallet-add-active-column/drop-wallet-add-active-column.sql', 'utf8')
await pool.query(sql)
