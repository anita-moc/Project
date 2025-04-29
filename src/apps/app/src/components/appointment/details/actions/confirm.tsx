'use client';
import { BetterUser } from '@helsa/auth/server';
import { Button } from '@helsa/ui/components/button';
import { Check } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

const Confirm = ({ status }: { status: string }) => {
  const [user] = useLocalStorage<BetterUser | null>('user', null);
  if (status !== 'SCHEDULED' || user?.role !== 'DOCTOR') {
    return null;
  }
  return (
    <Button variant={'secondary'} className="h-9 gap-2">
      <Check />
      Confirm
    </Button>
  );
};

export default Confirm;
