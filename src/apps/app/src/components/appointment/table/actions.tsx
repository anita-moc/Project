'use client';

import { useAppointmentStore } from '@/src/store/appointments-store';
import { Button } from '@helsa/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Ban, ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';

const AppointmentActions = () => {
  const { setRowSelection, rowSelection } = useAppointmentStore();
  const transactionIds = Object.keys(rowSelection);
  if (transactionIds.length === 0) {
    return (
      <Link href={'/book'} target="_blank">
        <Button className="h-9" variant={'outline'} size={'icon'}>
          <Plus className="size-4" />
        </Button>
      </Link>
    );
  }
  return (
    <div className="ml-auto">
      <div className="flex items-center">
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-2 rounded-none h-9">
                <span>Actions</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] rounded-none" sideOffset={8}>
              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-none gap-3" onClick={() => setRowSelection({})}>
                  <Ban className="size-4" />
                  <span>Cancel</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AppointmentActions;
