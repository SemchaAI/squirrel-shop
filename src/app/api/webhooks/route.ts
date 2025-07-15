import { headers } from "next/headers";
import { NextResponse } from "next/server";
// import { buffer } from "micro";
// import prisma from "@/prismaClient";
import { stripe } from "@/utils/stripe";
import type Stripe from "stripe";
import prisma from "@/prismaClient";
import { sendOrderConfirmationMail } from "@/utils/mail";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Needed for reading raw body in App Router
export async function POST(req: Request) {
  const rawBody = await req.arrayBuffer(); // use arrayBuffer instead of body.json()
  const bodyBuffer = Buffer.from(rawBody);
  const head = await headers();
  const sig = head.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      bodyBuffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Webhook signature verification failed:", err.message);
    }
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      const userId = session.metadata?.userId;
      const paymentIntentId = session.payment_intent as string;

      if (orderId && userId) {
        const order = await prisma.order.update({
          where: { id: Number(orderId) },
          data: {
            status: "SUCCEEDED",
            paymentId: paymentIntentId,
          },
        });
        await prisma.cart.update({
          where: { userId },
          data: {
            cartProducts: {
              deleteMany: {},
            },
          },
        });
        console.log(`✅ Order ${orderId}  marked as SUCCEEDED`);
        console.log(`✅ Payment ${paymentIntentId}`);
        try {
          await sendOrderConfirmationMail(order);
          console.log(`✅ Confirmation email sent for order ${orderId}`);
        } catch (mailErr) {
          console.error("❌ Failed to send order email:", mailErr);
        }
      } else {
        console.warn("⚠️ Checkout session missing  metadata");
      }

      break;

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntentId = charge.payment_intent as string;

      const order = await prisma.order.findFirst({
        where: { paymentId: paymentIntentId },
      });
      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "REFUNDED",
          },
        });
      }
      console.log(`✅ Order ${order?.id}  marked as REFUNDED`);
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true });
}
