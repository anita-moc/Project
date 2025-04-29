'use client';

import { Button } from '@helsa/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { ColumnDef, TableMeta } from '@tanstack/react-table';
import * as React from 'react';
import { EditPriceModal } from '../forms/edit-price-modal';

interface CustomTableMeta {
  remove: (id: string) => Promise<void>;
  types: { id: string; name: string; color: string }[];
  doctorId: string;
}

type ExtendedTableMeta = TableMeta<Prices> & CustomTableMeta;

export type Prices = {
  id: string;
  amount: number;
  duration: number;
  currency: string;
  typeId: string;
  name: string;
};

export const columns: ColumnDef<Prices>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => row.original.name,
  },
  {
    header: 'Price',
    accessorKey: 'amount',
    cell: ({ row }) => (
      <div className="flex space-x-2 items-center">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-default">${row.original.amount}</span>
            </TooltipTrigger>
            {row.original?.currency && (
              <TooltipContent className="px-3 py-1.5 text-xs rounded-none" side="right" sideOffset={10}>
                {row.original.currency}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
  {
    header: 'Currency',
    accessorKey: 'currency',
    cell: ({ row }) => row.original.currency ?? '-',
  },
  {
    header: 'Duration',
    accessorKey: 'duration',
    cell: ({ row }) =>
      row.getValue('duration')
        ? `${
            (row.getValue('duration') as number) >= 60
              ? `${Math.floor((row.getValue('duration') as number) / 60)}h ${
                  (row.getValue('duration') as number) % 60 > 0 ? `${(row.getValue('duration') as number) % 60}m` : ''
                }`
              : `${row.getValue('duration')}m`
          }`
        : '-',
  },
  {
    header: 'Query type',
    accessorKey: 'type',
    cell: ({ row, table }) => {
      const type = (table.options.meta as ExtendedTableMeta).types.find((t) => t.id === row.original.typeId);
      return (
        <div className="flex justify-start items-center gap-3">
          <div className="size-4 rounded-full" style={{ backgroundColor: type?.color }}></div>
          {type?.name}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const [isOpen, setOpen] = React.useState(false);
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none">
              <DropdownMenuItem className="rounded-none" onClick={() => setOpen(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-none"
                onClick={async () => {
                  await (table.options.meta as ExtendedTableMeta).remove(row.id);
                }}
              >
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditPriceModal
            doctorId={(table.options.meta as ExtendedTableMeta)?.doctorId}
            id={row.id}
            defaultValue={row.original}
            isOpen={isOpen}
            onOpenChange={setOpen}
            types={(table.options.meta as ExtendedTableMeta).types}
          />
        </div>
      );
    },
  },
];
