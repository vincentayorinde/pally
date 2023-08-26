import cron from 'node-schedule'
import dotenv from 'dotenv'
import { handleBTCJob, handleETHJob } from '../price/index.js'

import util from '../../utils/util.js'

dotenv.config()

const btCtime = process.env.GET_BTC_PRICE_MIN
const etHtime = process.env.GET_ETH_PRICE_MIN


cron.scheduleJob(`*/${btCtime} * * * *`, async () => {
    util.logger.info('Start running BTC job...');
    await handleBTCJob()
    util.logger.info('Completed running BTC job...');
})


cron.scheduleJob(`*/${etHtime} * * * *`, async () => {
    util.logger.info('Start running ETH job...');
    await handleETHJob()
    util.logger.info('Complete running ETH job...');

})