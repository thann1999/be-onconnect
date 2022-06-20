import nodemailer, { TransportOptions } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { UpgradePackageRequest } from 'shared/types/package.type';
import { Profile } from 'shared/types/user.type';
import { Office365Config } from './offfice365-config';

export async function sendMail(mail: MailOptions) {
  try {
    const transpot = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: '587',
      secureConnection: true,
      auth: {
        user: Office365Config.username,
        pass: Office365Config.password,
      },
    } as TransportOptions);

    return transpot.sendMail(mail);
  } catch (error) {
    return error;
  }
}

// Mail content include: Username, password
export function registerMailContent(email: string, password: string): MailOptions {
  return {
    from: process.env.USER_OFFICE365,
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

export function upgradePackageMail(data: UpgradePackageRequest) {
  const { companyName, companyRegion, email, firstName, lastName, packageName, phoneNumber } = data;
  const fullName = `${firstName} ${lastName}`;
  return {
    from: process.env.USER_OFFICE365,
    to: process.env.SALES_MAIL,
    subject: '[Onconnect] Nâng cấp gói cước',
    html: `
      <h2 style="text-align: center">Yêu cầu nâng cấp gói cước của khách hàng</h2>
      <p>Thông tin khách hàng như sau:</p>
      <p style="margin-left: 20px">Họ và tên: ${fullName}</p>
      <p style="margin-left: 20px">Email: ${email}</p>
      <p style="margin-left: 20px">Số điện thoại: ${phoneNumber}</p>
      <p style="margin-left: 20px">Tên gói cước: ${packageName}</p>
      <p style="margin-left: 20px">Công ty: ${companyName}</p>
      <p style="margin-left: 20px">Địa chỉ: ${companyRegion}</p>
      <p>Vui lòng liên hệ với khách hàng sớm nhất có thể.</p>
    `,
  };
}

export function expiredDateEmail(data: Profile) {
  const { email, firstName, lastName } = data;
  const fullName = `${firstName} ${lastName}`;
  return {
    from: process.env.USER_OFFICE365,
    to: email,
    subject: '[Onconnect] Hết hạn dùng thử',
    html: `
      <h2 style="text-align: center">Thông báo gói dịch vụ dùng thử sắp hết hạn</h2>
      <p>Kính chào bạn: ${fullName}. Chúng tôi gửi mail này 
        để thông báo gói cước dùng thử của bạn sắp hết hạn</p>
      <p>Chúng tôi sẽ rất vui nếu bạn nâng cấp gói cước 
      và tiếp tục sử dụng dịch vụ của ONCONNECT.</p>
    `,
  };
}
