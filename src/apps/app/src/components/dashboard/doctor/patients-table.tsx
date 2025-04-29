'use client';
import { Button } from '@helsa/ui/components/button';
import { DataTable } from '@helsa/ui/components/data-table/data-table';
import { DataTableButtonReset } from '@helsa/ui/components/data-table/data-table-button-reset';
import { DataTableColumnHeader } from '@helsa/ui/components/data-table/data-table-column-header';
import { DataTableIdColumn } from '@helsa/ui/components/data-table/data-table-id-column';
import { DataTableIdHeader } from '@helsa/ui/components/data-table/data-table-id-header';
import { DataTablePagination } from '@helsa/ui/components/data-table/data-table-pagination';
import { DataTableSearcher } from '@helsa/ui/components/data-table/data-table-searcher';
import { DataTableViewOptions } from '@helsa/ui/components/data-table/data-table-view-options';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { AlertCircle, EyeIcon, MoreHorizontal, PencilIcon } from 'lucide-react';
import { useState } from 'react';

type Patient = {
  id: string;
  name: string;
  type: string;
  age: number;
  lastVisit: string;
};
const patientsColumns: ColumnDef<Patient>[] = [
  {
    id: 'select',
    header: ({ table }) => <DataTableIdHeader table={table} />,
    cell: ({ row }) => <DataTableIdColumn row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'age',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Age" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'lastVisit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Visit" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              View Medical History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
            <DropdownMenuItem>Request Payment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const statuses = [
  {
    value: 'Consultation',
    label: 'Consultation',
    icon: PencilIcon,
  },
  {
    value: 'Revision',
    label: 'Revision',
    icon: EyeIcon,
  },
  {
    value: 'Emergency',
    label: 'Emergency',
    icon: AlertCircle,
  },
];

const data = [
  {
    id: '1',
    name: 'Juan Perez',
    age: 23,
    lastVisit: '2022-01-01',
    type: 'Revision',
  },
  {
    id: '2',
    name: 'Maria Perez',
    age: 30,
    lastVisit: '2022-01-01',
    type: 'Consultation',
  },
  {
    id: '3',
    name: 'Jose Perez',
    age: 45,
    lastVisit: '2022-01-01',
    type: 'Revision',
  },
  {
    id: '4',
    name: 'Luis Perez',
    age: 60,
    lastVisit: '2022-01-01',
    type: 'Consultation',
  },
  {
    id: '5',
    name: 'Ana Perez',
    age: 70,
    lastVisit: '2022-01-01',
    type: 'Revision',
  },
];

const PatientsTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns: patientsColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  
  return (
    <div className="space-y-4 border bg-background rounded-md p-4">
      <div className="flex flex-col gap-1 mb-4">
        <p className="text-lg font-semibold">Patients</p>
        <p className="text-sm text-muted-foreground">Here you can view the appointment history of your patients</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-1 items-center space-x-2">
          <DataTableSearcher searchColumn="name" table={table} />
          <DataTableButtonReset table={table} />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="border rounded-md bg-background">
        <DataTable table={table} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

export default PatientsTable;
