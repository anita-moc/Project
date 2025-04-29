import { getAppointmentDiagnoses } from '@/src/actions/diagnostic/get-appointment-diagnoses';
import { getPathologies } from '@/src/actions/diagnostic/get-pathologies';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { ClipboardMinus, ExternalLink } from 'lucide-react';
import DiagnosisContent from './content';
type Props = {
  data?: Primitives<Appointment>;
};

const DiagnosisSheet = async ({ data }: Props) => {
  const [responseDiagnoses, responsePathologies] = await Promise.all([
    getAppointmentDiagnoses({ appointmentId: data?.id ?? '' }),
    getPathologies(),
  ]);
  const pathologies = responsePathologies?.data ?? [];
  const diagnoses = responseDiagnoses?.data ?? [];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ClipboardMinus className="size-4" />
          Diagnosis
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 flex flex-col rounded-xl">
          <SheetHeader className="flex flex-row justify-between items-center gap-4 border-b mb-3">
            <div className="flex flex-row justify-between w-full items-center gap-4">
              <div className="flex flex-col gap-2 py-2">
                <SheetTitle className="text-xl">Add Diagnosis</SheetTitle>
                <p className="text-muted-foreground text-xs">
                  Add a diagnosis for patient{' '}
                  <span className="font-bold capitalize">{data?.patient?.user?.name}</span>
                </p>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="rounded-full" variant={'ghost'} size={'icon'}>
                      <ExternalLink />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-none">
                    <p>View diagnosis history</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SheetHeader>
          <DiagnosisContent data={data} pathologies={pathologies} diagnoses={diagnoses} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DiagnosisSheet;
