const { App } = require("@slack/bolt")
require('dotenv').config()
const Receiver = require('./receiver')
const { inviteUser } = require('./slack')
const welcomeMsg = require('./messages.json')

const BOT_ICON_URL = `https://raw.githubusercontent.com/Coding-Coach/find-a-mentor/master/public/codingcoach-logo-512.png`

const SLACK_BOT_TOKEN =  process.env.SLACK_BOT_TOKEN
const SLACK_SIGNING_SECRET  =  process.env.SLACK_SIGNING_SECRET

const receiver = new Receiver({
  signingSecret: SLACK_SIGNING_SECRET,
})

const app = new App({
  token: SLACK_BOT_TOKEN,
  receiver,
})

const formatMsgForUser = (user) => {
  return JSON.stringify(welcomeMsg).replace('%user-name%', user)
}

// As of now, there is no requirement for this event, but we can use it for quick
// testing as team_join event is not easy to test
app.event("app_mention", async ({ event, context }) => {
  console.log(event)
  const welcomeMsg = formatMsgForUser(event.user)
  try {
    const result = await app.client.chat.postMessage({
      token: context.botToken,
      channel: event.user,
      as_user: true,
      link_names: true,
      icon_url:BOT_ICON_URL,
      blocks: welcomeMsg
    })
  } catch (error) {
    console.error(error)
  }
})

app.event("team_join", async ({ event, context }) => {
  console.log(event);
  const welcomeMsg = formatMsgForUser(event.user.id);
  try {
    const result = await app.client.chat.postMessage({
      token: context.botToken,
      channel: event.user.id,
      as_user: true,
      link_names: true,
      blocks: welcomeMsg
    });
  } catch (error) {
    console.error(error);
  }
});

app.message('badger', ({ say }) => say('Badgers? BADGERS? WE DON’T NEED NO STINKIN BADGERS'));

receiver.app.post('/invites', async (req, res) => {
  try {
    const response = await inviteUser({
      email: req.body.email,
      token: process.env.SLACK_USER_TOKEN
    })
    res.json(response)
  } catch (err) {
    res.json({
      ok: false,
      error: 'server_error',
      message: err.message,
    })
  }
});

(async () => {
  const server = await app.start(process.env.PORT || 3000);
  console.log('⚡️ CC app is running!', server.address());
})();

process.on('uncaughtException', function (err) {
  console.log(err);
});