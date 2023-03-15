import app from './app.js'

import db from './db/models/index.js'

const port = process.env.PORT || 7001
db.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log(`live on port ${port} (^__^)`)
    })
})
