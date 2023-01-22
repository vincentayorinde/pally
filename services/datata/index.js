import axios from 'axios';
import util from '../../utils/util.js';
import dotenv from 'dotenv'

dotenv.config()

const baseUrl = process.env.SLACK_WEBHOOK;

const channels = {
  price_update: baseUrl + 'B0453QQGRKK/bP6tEc3cTv9pakRQM9f8jJ2I',
};

const sendToSlack = async (channel, message, res) => {
  const url = channels[channel];

  if (!url) return util.serverResponse(res, 404, false, 'Slack channel does not exist!')
  

  const blocks = [{ type: 'section', text: { type: 'mrkdwn', text: `${message}` } }];
  await axios.post(url, { blocks });
  return util.serverResponse(res, 200, true, `Message post on ${channel} successfully!`)
};

export default { sendToSlack }
