import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { ReceiptText } from 'lucide-react';
import { Suspense } from 'react';
import DetailsSheet from './sheet';

type Props = {
  data: Primitives<Appointment>;
  user: any;
};

const Treatment = ({ data, user }: Props) => {
  return (
    <>
      <Suspense
        fallback={
          <Button className="gap-2" variant={'outline'} disabled>
            <ReceiptText className="size-4" />
            Details
          </Button>
        }
      >
        <DetailsSheet data={data} user={user} />
      </Suspense>
    </>
  );
};

export default Treatment;
