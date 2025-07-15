"use server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { sendActivationMailHtml } from "./config";
import { OrderItemsSchema } from "./config/schemas";

import type { Order, User } from "@prisma/client";
import type { IGeoResponse } from "@/models/response";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
} as SMTPTransport.Options);
export const sendActivationMail = async (
  user: User,
  link: string,
  code: string,
  geo?: IGeoResponse,
) => {
  if (!process.env.SMTP_USER || !process.env.NEXTAUTH_URL) {
    throw new Error("Missing SMTP_USER or NEXTAUTH_URL in env");
  }

  return await transporter.sendMail({
    from: `"Squirrel Shop" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: `Account Activation – ${process.env.NEXTAUTH_URL}`,
    html: sendActivationMailHtml(user, link, code, geo),
  });
};

export async function sendOrderConfirmationMail(order: Order) {
  const { email, name, id, totalAmount, address, phone, status, shippingFee } =
    order;
  if (!process.env.NEXT_PUBLIC_IMAGE_CDN_URL) {
    throw new Error("Missing SMTP_USER or PUBLIC_IMAGE_CDN_URL in env");
  }

  const parsed = OrderItemsSchema.safeParse(order.items);
  if (!parsed.success) throw new Error("Invalid order items structure");

  const rows = parsed.data
    ?.map((it) => {
      const url = it.productVariant.previewImage
        ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL + it.productVariant.previewImage
        : `${process.env.NEXTAUTH_URL}/static/images/no-image360.webp`;
      return `
          <table style="width:100%;padding:16px 0;border-bottom:1px solid #ddd;">
            <tr>
              <td style="width:72px; background-color:#ffffff;">
                <img src="${url}"  width="64" height="64" style="background-color:#ffffff;border-radius:8px;display:block;" />
              </td>
              <td style="padding-left:12px;vertical-align:top;">
                ${it.productVariant.title}<br/>
                Qty: ${it.quantity}
              </td>
              <td style="text-align:right;font-weight:600;">
                ${(it.productVariant.price * it.quantity).toFixed(2)}MDL
              </td>
            </tr>
          </table>
          `;
    })
    .join("");

  const html = `
  <div style="background:#f4f4f7;padding:40px 0;font-family:Arial,sans-serif;">
    <table style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;width:100%;">
      <tr>
        <td style="text-align:center;padding-bottom:24px;">
          <h1 style="color:#1a1a1a;font-size:24px;margin:0;">Order confirmation</h1>
          <p style="color:#444;margin:4px 0;">Hi <strong>${name}</strong>,</p>
          <p style="color:#444;margin:4px 0;">
            Thank you for shopping with us! We have received your order 
            <span style="color:#0052cc;">№: <a href="#" style="color:#0052cc;text-decoration:none;">${id}</a></span>. 
            We will notify you when we send it.
          </p>
        </td>
      </tr>

      <tr>
        <td>
          <h3 style="color:#1a1a1a;border-bottom:1px solid #ddd;">Items</h3>
          ${rows}
        </td>
      </tr>

      <tr>
        <td style="padding-bottom:8px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td valign="top" width="50%" style="padding-right:10px;">
                <table width="100%">
                  <tr>
                    <td>Subtotal</td>
                    <td align="right">${totalAmount} MDL</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td align="right">${shippingFee} MDL</td>
                  </tr>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td align="right"><strong>${totalAmount + shippingFee} MDL</strong></td>
                  </tr>
                </table>
              </td>
              <td valign="top" width="50%" style="padding-left:10px;">
                <table width="100%">
                  <tr>
                    <td>📦 Status:</td>
                    <td align="right">${status}</td>
                  </tr>
                  <tr>
                    <td>📍 Address:</td>
                    <td align="right">${address}</td>
                  </tr>
                  <tr>
                    <td>📞 Phone:</td>
                    <td align="right">${phone}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>


      <tr>
        <td style="padding:32px 24px 16px;text-align:center;font-size:12px;color:#999;">
          <p>This message was sent from <strong>Squirrel Shop</strong>. If you didn't make this order, please contact support.</p>
        </td>
      </tr>
    </table>
  </div>
`;

  return transporter.sendMail({
    from: `"Squirrel Shop" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Your order #${id} is confirmed!`,
    html,
  });
}
