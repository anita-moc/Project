'use client';

import { Button } from '@helsa/ui/components/button';
import { Video } from 'lucide-react';
import Link from 'next/link';

const Enter = ({ id, status }: { id: string; status: string }) => {
  if (['CONFIRMED', 'STARTED', 'PAYED', 'READY'].includes(status) === false) {
    return null;
  }

  return (
    <Link href={`/appointments/${id}`}>
      <Button className="h-9 gap-2" variant={'secondary'}>
        <Video className="size-4" />
        Enter call
      </Button>
    </Link>
  );
};

export default Enter;
