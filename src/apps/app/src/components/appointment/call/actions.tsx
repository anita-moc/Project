import Diagnosis from '@/src/components/appointment/call/diagnosis';
import Treatment from '@/src/components/appointment/call/treatment';
import Vitals from '@/src/components/appointment/call/vitals';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@helsa/ui/components/dropdown-menu';
import { PlusCircle } from 'lucide-react';

const Actions = ({ data }: { data: Primitives<Appointment> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="gap-2">
         Medicine
          <PlusCircle />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none flex flex-col gap-1" align="end">
        <Vitals appointment={data} />
        <Diagnosis data={data} />
        <Treatment data={data} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
