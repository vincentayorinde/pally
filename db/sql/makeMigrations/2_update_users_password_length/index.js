import pool from '../../../db.js'
import fs from 'fs'

const sql = fs.readFileSync('./db/sql/makeMigrations/2_update_users_password_length/update-users-password-length.sql', 'utf8')
await pool.query(sql)

