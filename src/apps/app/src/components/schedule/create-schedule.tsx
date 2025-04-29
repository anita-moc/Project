'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Button } from '@helsa/ui/components/button';
import { DialogTitle } from '@helsa/ui/components/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@helsa/ui/components/sheet';
import { useState } from 'react';
import DoctorSchedule from './doctor-schedule';

export default function DoctorScheduleModal({ doctor }: { doctor: Primitives<Doctor> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
        Schedules</Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-hidden rounded-xl">
          <SheetHeader className="py-5">
            <DialogTitle className="my-3 text-xl">Modify and set your availability</DialogTitle>
            <p className="text-xs text-muted-foreground">
            Set your availability for each day of the week. You can add hours to your day and set your work schedule.
            </p>
          </SheetHeader>
          <DoctorSchedule doctorId={doctor.id} schedule={doctor.schedule!} setIsOpen={setIsOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
