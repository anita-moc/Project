'use client';
import { Button } from '@helsa/ui/components/button';
import { Ban } from 'lucide-react';

const Cancel = ({ status }: { status: string }) => {
  if (['STARTED', 'FINISHED'].includes(status)) {
    return null;
  }
  return (
    <Button variant={'destructive'} className="text-white h-9 gap-2">
      <Ban className="size-4" />
      Cancel
    </Button>
  );
};

export default Cancel;
