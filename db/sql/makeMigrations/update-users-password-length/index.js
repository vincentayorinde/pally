import pool from '../../../db.js'
import fs from 'fs'

const sql = fs.readFileSync('./db/sql/makeMigrations/update-users-password-length/update-users-password-length.sql', 'utf8')
await pool.query(sql)

