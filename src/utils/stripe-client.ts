"use client";
import { loadStripe } from "@stripe/stripe-js";

export const getStripe = () => {
  if (!process.env.STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Missing STRIPE_PUBLISHABLE_KEY in environment variables");
  }
  return loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
};
