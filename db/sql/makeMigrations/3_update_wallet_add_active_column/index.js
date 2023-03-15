import pool from '../../../db.js'
import fs from 'fs'

const sql = fs.readFileSync('./db/sql/makeMigrations/3_update_wallet_add_active_column/update-wallet-add-active-column.sql', 'utf8')
await pool.query(sql)
