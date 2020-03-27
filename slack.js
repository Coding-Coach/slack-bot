const axios = require('axios').default
const qs = require('qs')

const errorMessages = {
  // Ref: https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.md
  // When you try to send an invite to an already invited user, Slack returns
  // "already_in_team_invited_user" error and not "already_invited". Not sure
  // about the case where it is returned but adding it here just in case.
  already_invited: 'You have already been invited to join the Slack team. Please check your inbox',
  already_in_team_invited_user: 'You have already been invited to join the Slack team. Please check your inbox',
  already_in_team: `You are already a member. Log in to ${process.env.SLACK_TEAM_URL}`,
  invalid_email: 'Invalid email address',
  user_disabled: 'Your account has been deactivated',
}

const inviteUser = async ({
  email,
  token,
}) => {
  const url = `${process.env.SLACK_TEAM_URL}/api/users.admin.invite`
  const { data } = await axios.post(url, qs.stringify({ email, token }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })

  if (data.ok) {
    return { ...data, message: 'Success! Check your email inbox for an invitation' }
  }

  return { ...data, message: errorMessages[data.error] || data.error }
}

module.exports = {
  inviteUser,
}
