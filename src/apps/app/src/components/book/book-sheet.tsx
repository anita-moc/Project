import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentType } from '@helsa/engine/appointment/domain/appointment-type';
import { Symptom } from '@helsa/engine/appointment/domain/symptom';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@helsa/ui/components/sheet';
import DoctorAppointment from './book-form';

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  data?: Primitives<Doctor>;
  types?: Primitives<AppointmentType>[];
  symptoms: Primitives<Symptom>[];
};

const BookSheet = ({ data, isOpen, setOpen, types, symptoms }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="max-sm:w-full md:w-1/3 sm:max-w-full p-4 bg-transparent border-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll box-border flex flex-col">
          <SheetHeader>
            <SheetTitle>Schedule your appointment</SheetTitle>
          </SheetHeader>
          <DoctorAppointment doctor={data!} types={types ?? []} symptoms={symptoms} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookSheet;
