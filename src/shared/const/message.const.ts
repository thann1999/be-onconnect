/* eslint-disable no-unused-vars */
export enum AuthenticationMessage {
  SUCCESS = 'Register successful',
  SEND_MAIL_FAIL = 'Registration failed due to not being able to send mail',
  LOGIN_INFO_WRONG = 'Email or password is wrong',
  MISSING_TOKEN = 'Missing access token',
  WRONG_TOKEN = 'Access token is wrong',
  WRONG_CURRENT_PASSWORD = 'Current password is wrong',
  CHANGE_PASSWORD_SUCCESS = 'Change password success',
}
