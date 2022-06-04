import nodemailer, { TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
import { GoogleConfig } from './google-config';
import { MailOptions } from 'nodemailer/lib/json-transport';

const oAuth2Client = new google.auth.OAuth2(
  GoogleConfig.CLIENT_ID,
  process.env.CLIENT_SECRET_ID,
  GoogleConfig.REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: GoogleConfig.REFRESH_TOKEN,
});

export async function sendMail(mail: MailOptions) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transpot = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        accessToken,
        type: 'OAuth2',
        user: process.env.USER_GMAIL,
        clientId: GoogleConfig.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET_ID,
        refreshToken: GoogleConfig.REFRESH_TOKEN,
      },
    } as TransportOptions);

    return transpot.sendMail(mail);
  } catch (error) {
    return error;
  }
}

// Mail content include: Username, password
export function getMailContent(email: string, password: string): MailOptions {
  return {
    from: process.env.USER_GMAIL,
    to: email,
    subject: '[Onconnect] Đăng ký dùng thử',
    html: `
      <h2 style="text-align: center">Cảm ơn bạn đã sử dụng dịch vụ của OnConnect</h2>
      <p>Thông tin tài khoản như sau:</p>
      <p style="margin-left: 20px">Tên tài khoản: ${email}</p>
      <p style="margin-left: 20px">Mật khẩu: ${password}</p>
      <p>Click vào link dưới đây để đăng nhập</p>
      <a href="${process.env.CLIENT_URL}/login">Đăng nhập</a>
    `,
  };
}
