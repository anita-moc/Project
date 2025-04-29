import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { ClipboardMinus } from 'lucide-react';
import { Suspense } from 'react';
import DiagnosisSheet from './sheet';

const Diagnosis = ({ data }: { data: Primitives<Appointment> }) => {
  return (
    <>
      <Suspense
        fallback={
          <Button className="gap-2" variant={'outline'} disabled>
            <ClipboardMinus className="size-4" />
            Diagnosis
          </Button>
        }
      >
        <DiagnosisSheet data={data} />
      </Suspense>
    </>
  );
};

export default Diagnosis;
