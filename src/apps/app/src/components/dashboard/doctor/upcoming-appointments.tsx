'use client';

import { Calendar } from '@helsa/ui/components/calendar';
import { ChevronRight, HeartPulse } from 'lucide-react';
import { useState } from 'react';

export function UpcomingAppointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="py-5 border bg-background rounded-md w-full">
      <p className="text-center text-lg font-semibold">Agenda</p>
      <div className="w-full flex justify-center">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
      <div>
        <div className="h-[350px] no-scroll overflow-scroll">
          <div className="flex flex-col gap-4 mt-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="cursor-pointer hover:bg-accent p-3">
                <div className="flex justify-between items-center gap-3">
                  <div className="flex justify-start items-center gap-3">
                    <div className="flex justify-center items-center bg-primary text-primary-foreground rounded-none p-2">
                      <HeartPulse className="size-5" />
                    </div>
                    <div>
                      <p className="">{appointment.Specialty}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.time} {appointment.doctor}
                      </p>
                    </div>
                  </div>
                  <div>
                    <ChevronRight className="size-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const doctors = [
  {
    name: 'Dr. José Véliz',
    avatar: '/avatar/05.png',
  },
  {
    name: 'Dr. José Véliz',
    avatar: '/avatar/05.png',
  },
  {
    name: 'Dr. José Véliz',
    avatar: '/avatar/05.png',
  },
  {
    name: 'Dr. José Véliz',
    avatar: '/avatar/05.png',
  },
];

const appointments = [
  {
    doctor: 'Dr. Ana Pérez',
    date: new Date(),
    time: '9:00 AM',
    type: 'Consultation',
    Specialty: 'Dermatologist',
  },
  {
    doctor: 'Dr. Carlos López',
    date: new Date(),
    time: '10:00 AM',
    type: 'Consultation',
    Specialty: 'Pediatrician',
  },
  {
    doctor: 'Dr. María González',
    date: new Date(),
    time: '11:00 AM',
    type: 'Consultation',
    Specialty: 'Gynecologist',
  },
  {
    doctor: 'Dr. Juan Martínez',
    date: new Date(),
    time: '1:00 PM',
    type: 'Consultation',
    Specialty: 'Neurologist',
  },
];
