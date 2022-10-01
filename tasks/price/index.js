import cron from 'node-schedule'
import dotenv from 'dotenv'
import util from '../../utils/util.js'



dotenv.config()

const time = process.env.GET_BTC_PRICE_SEC

cron.scheduleJob(`*/${time} * * * * *`, async () => {
   await util.serverRequest('post', 'http://localhost:7001/api/datata', {})
})
