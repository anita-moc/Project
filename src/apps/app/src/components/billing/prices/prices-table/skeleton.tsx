import { Skeleton } from '@helsa/ui/components/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@helsa/ui/components/table';
import { Header } from './header';

export function TypesSkeleton() {
  return (
    <div className="w-full">
      <Header />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Query type</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(15)].map((_, index) => (
            <TableRow key={index.toString()} className="hover:bg-transparent h-[49px]">
              <TableCell className="w-[50px] border">
                <Skeleton className="size-4 rounded-md" />
              </TableCell>
              <TableCell className="border">
                <Skeleton className="w-[20%] h-2" />
              </TableCell>
              <TableCell className="w-[65px] border">
                <Skeleton className="w-5 h-1" />
              </TableCell>
              <TableCell className="w-[65px] border">
                <Skeleton className="w-5 h-1" />
              </TableCell>
              <TableCell className="w-[65px] border">
                <Skeleton className="w-5 h-1" />
              </TableCell>
              <TableCell className="w-[65px] border">
                <Skeleton className="w-5 h-1" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
