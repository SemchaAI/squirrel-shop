import type { IGeoResponse } from "@/models/response";
import type { User } from "@prisma/client";

export const sendActivationMailHtml = (
  user: User,
  link: string,
  code: string,
  geo?: IGeoResponse,
) => {
  const isGeoSuccess = geo && geo.success;
  return `
  <div style="font-family:Arial, sans-serif; color:#333; max-width:600px; margin:0 auto; padding:24px;">
    <h1 style="margin-bottom:8px; color:#222;">Authorize Your Account</h1>
    <p>Hi ${user.name},</p>
    <p>You recently requested to verify your email for <strong>Squirrel&nbsp;Shop</strong>. Enter the code below to confirm your address and activate your account.</p>

    ${
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
