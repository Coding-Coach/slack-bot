const { App } = require('@slack/bolt');
const conf = require('./config.json');

console.log(conf);
// Initializes your app with your bot token and signing secret
const app = new App({
  token: conf.SLACK_BOT_TOKEN,
  signingSecret: conf.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say("Hey there <@${message.user}>!");
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();