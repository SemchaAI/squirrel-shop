"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { KeyRound, Mail, MapIcon, User2Icon } from "lucide-react";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { InputField } from "@/components/features/fields/InputField";
import { TextAreaField } from "@/components/features/fields/TextAreaField";
import { OrderCard } from "@/components/entities/order/OrderCard";
import { OrderSummary } from "@/components/entities/order/OrderSummary";
import { createCheckoutSession } from "@/utils/api";

import { type TOrderSchema, OrderSchema } from "@/utils/config";
import type { IOrderItem } from "@/models/orders";
import type { User } from "@prisma/client";

export const OrderForm = ({
  items,
  user,
}: {
  items: IOrderItem[];
  user: User;
}) => {
  const form = useForm({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone ? user.phone : undefined,
      address: user.address ? user.address : undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TOrderSchema) =>
      createCheckoutSession({ ...data, items, userId: user.id }),
    onSuccess: ({ data }) => {
      window.location.href = data.url ? data.url : "";
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong!");
    },
  });

  const submitHandler = async (data: TOrderSchema) => {
    mutation.mutate(data);
  };

  return (
    <Form className="max-w-full" form={form} onSubmit={submitHandler}>
      {
        // inputs
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex-1">
            <h1 className="mb-4 text-2xl font-bold">Billing Details</h1>
            <ul className="my-5 flex flex-col gap-2 rounded-md bg-ui p-2">
              {items.map((item) => (
                <OrderCard key={item.productVariant.id} item={item} />
              ))}
            </ul>

            <InputField
              id="email"
              label="Email"
              type="text"
              Icon={Mail}
              autoComplete="email"
            />
            <InputField
              id="name"
              label="Name"
              type="text"
              Icon={User2Icon}
              autoComplete="name"
            />
            <InputField
              id="address"
              label="Address"
              type="text"
              Icon={MapIcon}
              autoComplete="street-address"
            />
            <InputField id="phone" label="Phone" type="text" Icon={KeyRound} />
            <TextAreaField
              id="comment"
              placeholder="Write some comments here"
              autoComplete="off"
            />
          </div>
          <OrderSummary items={items} isCheckout />
        </div>
      }
    </Form>
  );
};
