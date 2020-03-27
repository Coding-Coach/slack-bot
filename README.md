# cc-slack-bot

A bot for Coding Coach slack workspace

## Getting Started

### Setting up the Slack App

1. [Create a new Slack team](https://slack.com/get-started#create)
2. [Create a new Slack App](https://api.slack.com/apps?new_app=1)
3. Navigate to **OAuth & Permissions** on the left sidebar of your app page
4. Scroll to the **Scopes** section. Add `chat:write`, `chat:write.public`, `users:read`, `channels:history`, and `app_mentions:read` OAuth scopes to the Bot token scopes and add `admin` to the User token scopes (You need a user token to invite users to the team)
5. Scroll up to the top of the **OAuth & Permissions** page and click the **Install App to Workspace** button. You’ll be led through Slack’s OAuth UI, where you should allow your app to be installed to your workspace. Once this is done, you should be taken back to the **OAuth & Permissions** page and you should be able to find the user and bot OAuth access tokens. We will need these both in a while

### Development

1. Fork and clone the project
2. Run `yarn` to install dependencies
3. Run `cp .env.example .env`
4. Populate `SLACK_TEAM_URL` in `.env` with the team URL (e.g. https://<TEAM_NAME>.slack.com)
5. Go to your Slack app (from https://api.slack.com/apps/) and grab the **Signing Secret** from the **Basic Information** page. Populate `SLACK_SIGNING_SECRET` in `.env` with the copied signing secret
6. Navigate to **OAuth & Permissions** on the left sidebar of your app page. Populate `.env` with the tokens

```
SLACK_USER_TOKEN=<OAuth Access Token>
SLACK_BOT_TOKEN=<Bot User OAuth Access Token>
```

6. Install [ngrok](https://ngrok.com/)
7. Run `yarn start:dev`
8. Run `ngrok http <PORT>` in another tab
9. Set up Event Subscriptions

    Follow https://slack.dev/bolt/tutorial/getting-started#setting-up-events until the URL verification step. Once the URL is verified, add the following **bot** events
      - `app_mention`
      - `message.channels`
      - `team_join`

    Save the changes.

10. You're done :tada: Start hacking :computer:

## Setting up auto-invites

To invite users via `users.admin.invite` method, you need a user token with the `client` scope. Without it, you will receive the following error response when trying to invite a user.

```json
{"ok":false,"error":"missing_scope","needed":"client","provided":"admin,identify"}
```

Since the `client` scope is deprecated (legacy), visit https://slack.com/oauth/authorize?&client_id=CLIENT_ID&team=TEAM_ID&install_redirect=install-on-team&scope=admin+client in your browser and authorize your app.

- `TEAM_ID` is the subdomain for your slack team, e.g. coding-coach.slack.com - your `TEAM_ID` is **coding-coach**
- `CLIENT_ID` can be found in **Basic Information** section for your app

## References

- [Getting started with Bolt](https://slack.dev/bolt/tutorial/getting-started)
- [Slack Invite Automation](https://github.com/outsideris/slack-invite-automation)
- [slackApiDoc for `users.admin.invite`](https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.md)
