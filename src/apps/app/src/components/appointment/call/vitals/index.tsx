import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { ReceiptText } from 'lucide-react';
import { BloodPressure } from './vitals-types/blood-pressure';
import { HeartRate } from './vitals-types/heart-rate';
import { OxygenSaturation } from './vitals-types/oxygen-saturation';
import { RespiratoryRate } from './vitals-types/respiratory-rate';
import { Temperature } from './vitals-types/temperature';
import { Weight } from './vitals-types/weight';
type Props = {
  appointment: Primitives<Appointment>;
};
type PatientVitals = {
  heartRate: number;
  temperature: number;
  bloodPressure: string;
  weight: number;
  systolic: number;
  diastolic: number;
  respiratoryRate: number;
  oxygenSaturation: number;
};

const defaultData: PatientVitals = {
  heartRate: 72,
  temperature: 36.6,
  bloodPressure: '120/80',
  weight: 120,
  systolic: 120,
  diastolic: 80,
  respiratoryRate: 16,
  oxygenSaturation: 98,
};
const Vitals = ({ appointment }: Props) => {
  const { telemetry } = appointment;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Vital signs
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 border-none focus-visible:outline-none bg-transparent">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 flex flex-col rounded-xl">
          <SheetHeader className="flex flex-row justify-between items-center gap-4 border-b mb-3">
            <div className="flex flex-row justify-start items-center gap-4">
              <div className="flex flex-col gap-2 py-2">
                <SheetTitle className="text-xl">Vital signs</SheetTitle>
                <p className="text-muted-foreground text-xs">Add or modify the patient's Vital signs</p>
              </div>
            </div>
          </SheetHeader>
          <div className="flex  flex-col gap-4 flex-1">
            <div className="grid grid-cols-2 gap-4 py-4">
              <HeartRate appointmentId={appointment.id} value={telemetry?.heartRate ?? defaultData.heartRate} />
              <BloodPressure
                appointmentId={appointment.id}
                value={telemetry?.bloodPressure ?? Number(defaultData.bloodPressure.split('/')[0])}
              />
              <Temperature appointmentId={appointment.id} value={telemetry?.temperature ?? defaultData.temperature} />
              <Weight appointmentId={appointment.id} value={telemetry?.weight ?? defaultData.weight} />
              <RespiratoryRate
                appointmentId={appointment.id}
                value={telemetry?.respiratoryRate ?? defaultData.respiratoryRate}
              />
              <OxygenSaturation
                appointmentId={appointment.id}
                value={telemetry?.oxygenSaturation ?? defaultData.oxygenSaturation}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Vitals;
