'use client';
import { BetterUser } from '@helsa/auth/server';
import { Button } from '@helsa/ui/components/button';
import { Receipt } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

const Pay = ({ status, id }: { status: string; id: string }) => {
  const [user] = useLocalStorage<BetterUser | null>('user', null);
  if (user?.role !== 'PATIENT' || ['CONFIRMED', 'SCHEDULED'].includes(status) === false) {
    return null;
  }
  return (
    <Link href={`/api/payment/appointment?appointmentId=${id}`}>
      <Button className="flex-1 w-full h-9 gap-2" variant={'secondary'}>
        <Receipt className="size-4" />
        Pay
      </Button>
    </Link>
  );
};

export default Pay;
