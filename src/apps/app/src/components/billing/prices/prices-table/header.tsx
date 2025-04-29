'use client';

import { Button } from '@helsa/ui/components/button';
import { Input } from '@helsa/ui/components/input';
import type { Table } from '@tanstack/react-table';
import type { Prices } from './columns';

type Props = {
  table?: Table<Prices>;
  onOpenChange?: (isOpen: boolean) => void;
};

export function Header({ onOpenChange, table }: Props) {
  return (
    <div className="flex items-center py-4 justify-between">
      <Input
        placeholder="Search..."
        value={(table?.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table?.getColumn('name')?.setFilterValue(event.target.value)}
        className="max-w-sm rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button className="h-9" variant={'secondary'} onClick={() => onOpenChange?.(true)}>  
Create your rates
      </Button>
    </div>
  );
}
