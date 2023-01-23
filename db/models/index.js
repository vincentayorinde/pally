import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import configDB from '../config/config.js'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = configDB[env]

const db = {}

let sequelize
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    )
}
console.log('the db config', config)
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        )
    })
    .forEach(async(file) => {
        let model = () => {
            path.join(__dirname, file)
        }
        await model(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    console.log('the >><<<', db[modelName](db))
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize


export default db
