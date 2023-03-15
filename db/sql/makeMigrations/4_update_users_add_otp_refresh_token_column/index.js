import pool from '../../../db.js'
import fs from 'fs'

const sql = fs.readFileSync('./db/sql/makeMigrations/4_update_users_add_otp_refresh_token_column/update_users_add_otp_refresh_token_column.sql', 'utf8')
await pool.query(sql)
