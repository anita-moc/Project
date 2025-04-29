import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { Pill } from 'lucide-react';
import { Suspense } from 'react';
import TreatmentSheet from './sheet';

type Props = {
  data: Primitives<Appointment>;
};

const Treatment = ({ data }: Props) => {
  return (
    <>
      <Suspense
        fallback={
          <Button className="gap-2" variant={'outline'} disabled>
            <Pill className="size-4" />
            Treatment
          </Button>
        }
      >
        <TreatmentSheet data={data} />
      </Suspense>
    </>
  );
};

export default Treatment;
