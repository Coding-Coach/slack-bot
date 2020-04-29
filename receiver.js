const { ExpressReceiver } = require('@slack/bolt')
const bodyParser = require('body-parser')
const cors = require('cors')

class Receiver extends ExpressReceiver {
  constructor(options) {
    super(options)
    this.app.use(bodyParser.json())
    const corsOrigins = process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.trim().replace(/\s+/g, '').split(',')
      : '*'
    const corsOptions = {
      origin: corsOrigins
    }
    this.app.use(cors(corsOptions))
  }
}

module.exports = Receiver
