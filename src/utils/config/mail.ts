import type { IGeoResponse } from "@/models/response";
import type { User } from "@prisma/client";

const geoTableHtml = (geo?: IGeoResponse) => {
  const isGeoSuccess = geo && geo.success;

  return `${
    isGeoSuccess
      ? `
    <table style="width:100%; border-collapse:collapse; margin:24px 0;">
      
       <tr>
        <td style="padding:8px 16px; border:1px solid #e0e0e7;">📍 Location</td>
        <td style="padding:8px 16px; border:1px solid #e0e0e7;">${geo.city}, ${geo.region}, ${geo.country}</td>
      </tr>
      <tr>
        <td style="padding:8px 16px; border:1px solid #e0e0e7;">🌐 IP Address</td>
        <td style="padding:8px 16px; border:1px solid #e0e0e7;">${geo.ip}</td>
      </tr>
      <tr>
        <td style="padding:8px 16px; border:1px solid #e0e0e7;">📅 Time</td>
        <td style="padding:8px 16px; border:1px solid #e0e0e7;">${new Date(
          geo.timezone.current_time,
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}</td>
      </tr>
         <tr>
        <td style="padding:8px 16px; border:1px solid #e0e0e7;">🌍 Provider</td>
        <td style="padding:8px 16px; border:1px solid #e0e0e7;">${geo.connection.org}</td>
      </tr>
    </table>`
      : ""
  }
`;
};

export const sendActivationMailHtml = (
  user: User,
  link: string,
  code: string,
  geo?: IGeoResponse,
) => {
  const geoHtml = geoTableHtml(geo);
  return `
  <div style="font-family:Arial, sans-serif; color:#333; max-width:600px; margin:0 auto; padding:24px;">
    <h1 style="margin-bottom:8px; color:#222;">Authorize Your Account</h1>
    <p>Hi ${user.name},</p>
    <p>You recently requested to verify your email for <strong>Squirrel&nbsp;Shop</strong>. Enter the code below to confirm your address and activate your account.</p>

    ${geoHtml}

    <div style="background:#f7f7f9; border:1px solid #e0e0e7; border-radius:4px; text-align:center; padding:16px; margin-bottom:24px;">
      <span style="font-size:32px; letter-spacing:4px; font-weight:600;">${code}</span>
    </div>

    <p style="text-align:center; margin-bottom:32px;">
      Or click <a href="${link}" style="color:#0070f3; text-decoration:none;">here to activate now</a>.
    </p>

    <p style="font-size:12px; color:#888; line-height:1.4;">
      If you did not request this, please ignore this email or <a href="#" style="color:#0070f3;">secure your account</a>.
    </p>

    <hr style="border:none; border-top:1px solid #e0e0e7; margin:32px 0;" />

    <footer style="font-size:12px; color:#aaa; text-align:center;">
      &copy; ${new Date().getFullYear()} Squirrel Shop &bull;
      <a href="${process.env.NEXTAUTH_URL}" style="color:#aaa; text-decoration:none;">Visit our site</a>
    </footer>
  </div>
  `;
};

export const sendResetPasswordMailHtml = (
  user: User,
  resetLink: string,
  geo?: IGeoResponse,
) => {
  const geoHtml = geoTableHtml(geo);
  return `
  <div style="background:#f4f4f7;padding:40px 0;font-family:Arial,sans-serif;">
    <table style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;width:100%;">
      <tr>
        <td style="padding-bottom:24px;text-align:center;">
          <h1 style="margin:0;color:#222;font-size:24px;">Reset Your Password</h1>
        </td>
      </tr>

      <tr>
        <td style="font-size:14px;color:#333;padding-bottom:16px;">
          <p>Hi ${user.name || "there"},</p>
          <p>We received a request to reset your password for <strong>Squirrel&nbsp;Shop</strong>. Click the button below to proceed.</p>
        </td>
      </tr>

      ${geoHtml}

      <tr>
        <td style="text-align:center;padding:24px 0;">
          <a href="${resetLink}" style="display:inline-block;background-color:#f35c7a;color:#fff;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:600;">Reset Password</a>
        </td>
      </tr>

      <tr>
        <td style="font-size:12px;color:#888;padding-top:8px;text-align:center;">
          If you didn’t request this, you can safely ignore this email.
        </td>
      </tr>

      <tr>
        <td style="padding-top:32px;border-top:1px solid #e0e0e7;text-align:center;font-size:12px;color:#aaa;">
          &copy; ${new Date().getFullYear()} Squirrel Shop &bull;
          <a href="${process.env.NEXTAUTH_URL}" style="color:#aaa;text-decoration:none;">Visit our site</a>
        </td>
      </tr>
    </table>
  </div>
  `;
};
