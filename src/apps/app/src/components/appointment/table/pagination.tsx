'use client';

import { Meta } from '@helsa/ddd/core/collection.';
import { Button } from '@helsa/ui/components/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  meta: Meta;
};
export function AppointmentPagination({ meta }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const pageSize = searchParams.get('pageSize') ?? 10;
  const createPageQuery = useCallback(
    (currentPage: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', currentPage);

      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const createPageSizeQuery = useCallback(
    (size: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('pageSize', size);

      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  return (
    <div className="flex items-center justify-between px-2 mt-2 py-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">page size</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => createPageSizeQuery(value)}
            disabled={meta.total < 10}
          >
            <SelectTrigger className="h-8 w-[70px] ">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {meta.page} of {meta.pages}
        </div>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => createPageQuery('1')}
          disabled={meta.page === 1}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => createPageQuery(`${meta.page - 1}`)}
          disabled={meta.page === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => createPageQuery(`${meta.page + 1}`)}
          disabled={meta.page === meta.pages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => createPageQuery(`${meta.pages}`)}
          disabled={meta.page == meta.pages}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
