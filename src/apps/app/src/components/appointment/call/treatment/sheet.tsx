import { getAppointmentTreatments } from '@/src/actions/treatment/get-appointment-treatments';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Pill } from 'lucide-react';
import TreatmentContent from './content';

type Props = {
  data: Primitives<Appointment>;
};

const TreatmentSheet = async ({ data }: Props) => {
  const treatmentResponse = await getAppointmentTreatments({
    appointmentId: data?.id!,
  });
  const treatments = treatmentResponse?.data ?? [];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <Pill className="size-4" />
         Treatment
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 flex flex-col rounded-xl">
          <SheetHeader className="flex flex-row justify-between items-center gap-4 border-b mb-3">
            <div className="flex flex-row justify-start items-center gap-4">
              <div className="flex flex-col gap-2 py-2">
                <SheetTitle className="text-xl">Add Treatment</SheetTitle>
                <p className="text-muted-foreground text-xs">Add a Treatment for the patient</p>
              </div>
            </div>
          </SheetHeader>

          <TreatmentContent data={data} treatments={treatments} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TreatmentSheet;
