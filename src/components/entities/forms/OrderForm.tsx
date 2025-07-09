"use client";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { KeyRound, Mail, MapIcon, User2Icon } from "lucide-react";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { InputField } from "@/components/features";
import { OrderCard, OrderSummary } from "@/components/entities";

import { type TOrderSchema, OrderSchema } from "@/utils/config";
import type { IOrderItem } from "@/models/orders";
import type { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/utils/api";

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

            <InputField id="email" label="Email" type="text" Icon={Mail} />
            <InputField id="name" label="Name" type="text" Icon={User2Icon} />
            <InputField
              id="address"
              label="Address"
              type="text"
              Icon={MapIcon}
            />
            <InputField id="phone" label="Phone" type="text" Icon={KeyRound} />
            <InputField
              id="comment"
              label="Comments"
              type="text"
              Icon={KeyRound}
            />
          </div>
          <OrderSummary items={items} isCheckout />
        </div>
      }
    </Form>
  );
};
