import pool from '../../../db.js'
import fs from 'fs'

const sql = fs.readFileSync('./db/sql/makeMigrations/1_update_transactions_add_status_column/update-transactions-add-status-column.sql', 'utf8')
await pool.query(sql)
