import { Activities } from '@/src/components/dashboard/patient/activities';
import BloodPressure from '@/src/components/dashboard/patient/blood-pressure';
import Glucose from '@/src/components/dashboard/patient/glucose';
import { HealthAverage } from '@/src/components/dashboard/patient/health-average';
import HeartRate from '@/src/components/dashboard/patient/heart-rate';
import Temperature from '@/src/components/dashboard/patient/temperature';
import { UpcomingAppointments } from '@/src/components/dashboard/patient/upcoming-appointments';
import { Button } from '@helsa/ui/components/button';
import { Calendar, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="md:pl-9 w-full h-full">
      <div className="h-full flex justify-between items-center max-sm:flex-col">
        <div className="flex justify-start flex-col w-full h-full pt-5 pr-9 gap-5">
          <div className="w-full flex items-center gap-4">
            <Link href={'/book'}>
              <Button className="rounded-none gap-2" variant="outline">
                Schedule <Calendar />
              </Button>
            </Link>
            <Button className="rounded-none gap-2" variant="outline">
              Report <PlusCircle />{' '}
            </Button>
          </div>
          <div className="w-full flex-col gap-2 flex">
            <p className="text-lg font-semibold mb-5">Indicators</p>
            <div className="flex justify-between items-center gap-4">
              <BloodPressure />
              <Glucose />
              <HeartRate />
              <Temperature />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-5">
            <HealthAverage />
            <Activities />
          </div>
        </div>
        <div className="max-sm:w-full border-l px-3 h-full justify-center">
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  );
};

export default Page;
