const { App } = require('@slack/bolt');
const conf = require('./config.json');
const template = require('./template.json');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
// When a user joins the team, send a message in a predefined channel asking them to introduce themselves
app.event('team_join', async ({ event, context }) => {
  try {
      const result = await app.client.chat.postMessage({
      token: context.botToken,
        channel: event.user.id,
        text: 'Welcome to the team, <@${event.user.id}>! 🎉 You can introduce yourself in this channel.',
        attachments : JSON.stringify(template),
        as_user: true
      });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});
(async () => {
  // Start your app
  await app.start(process.env.PORT || 5000);

  console.log('⚡️ bot app is running!');
})();