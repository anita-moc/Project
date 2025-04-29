import { getAppointmentOrders } from '@/src/actions/order/get-appointment-orders';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { ExternalLink, ScrollText } from 'lucide-react';
import OrdersContent from './content';

type Props = {
  data?: Primitives<Appointment>;
};
const OrdersSheet = async ({ data }: Props) => {
  const responseOrders = await getAppointmentOrders({ appointmentId: data?.id ?? '' });
  const orders = responseOrders?.data ?? [];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ScrollText className="size-4" />
          Orders
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 flex flex-col rounded-xl">
          <SheetHeader className="flex flex-row justify-between items-center gap-4 border-b mb-3">
            <div className="flex flex-row justify-between w-full items-center gap-4">
              <div className="flex flex-col gap-2 py-2">
                <SheetTitle className="text-xl">Medical orders</SheetTitle>
                <p className="text-muted-foreground text-xs">
                Add order for patient{' '}
                  <span className="font-bold capitalize">{data?.patient?.user?.name}</span>
                </p>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="rounded-full" variant={'ghost'} size={'icon'}>
                      <ExternalLink />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-none">
                    <p>Go through all the patient's orders
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SheetHeader>
          <OrdersContent data={data} orders={orders} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrdersSheet;
