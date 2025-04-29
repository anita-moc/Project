'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Order } from '@helsa/engine/order/domain/order';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Ellipsis, ScrollText } from 'lucide-react';

type Props = {
  data: Primitives<Appointment>;
  orders: Primitives<Order>[];
  toggle: VoidFunction;
};
const orderStatus = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  CANCELED: 'Canceled',
};
const orderTypes = {
  TEST: 'Test',
  REMITTANCE: 'Remittance',
};
const OrdersList = ({ data, orders, toggle }: Props) => {
  return (
    <div className="flex justify-between flex-col gap-4 flex-1">
      <div className="flex flex-col gap-3">
        {orders?.map((order, index) => (
          <div
            key={`${order.id}-${index}`}
            className="flex flex-col items-start justify-between p-3 gap-2 border  rounded-lg"
          >
            <div className="flex justify-between items-center w-full">
              <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">{orderTypes[order.type]}</div>
              <p className="text-sm">{order.description}</p>
              <Badge variant={'outline'}>{orderStatus[order.status]}</Badge>
              <Ellipsis className="size-4 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <Button onClick={toggle}>
        <ScrollText className="size-4" />     
Add Order
      </Button>
    </div>
  );
};

export default OrdersList;
