import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { ScrollText } from 'lucide-react';
import { Suspense } from 'react';
import OrdersSheet from './sheet';

type Props = {
  data: Primitives<Appointment>;
};

const Orders = ({ data }: Props) => {
  return (
    <>
      <Suspense
        fallback={
          <Button className="gap-2" variant={'outline'} disabled>
            <ScrollText className="size-4" />
            Orders
          </Button>
        }
      >
        <OrdersSheet data={data} />
      </Suspense>
    </>
  );
};

export default Orders;
