import { Button } from '@helsa/ui/components/button';
import { CalendarDays } from 'lucide-react';

const ReSchedule = ({ status }: { status: string }) => {
  if (!['SCHEDULED', 'CONFIRMED', 'PAYED'].includes(status)) {
    return null;
  }
  return (
    <Button className=" h-9 gap-2" variant={'secondary'}>
      <CalendarDays className="size-4" />
      Reschedule
    </Button>
  );
};

export default ReSchedule;
