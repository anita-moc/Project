import { AppointmentTypes } from '@/src/components/dashboard/doctor/appointment-types';
import { AppointmentsCalendar } from '@/src/components/dashboard/doctor/appointments-calendar';
import { PatientsList } from '@/src/components/dashboard/doctor/patient-list';
import { Revenue } from '@/src/components/dashboard/doctor/revenue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { DateRangePicker } from '@helsa/ui/components/date-range-picker';
import { Calendar, DollarSign, Stethoscope, Users } from 'lucide-react';

const Page = async () => {
  return (
    <div className="md:pl-9 w-full h-full">
      <div className="h-full flex justify-between items-center max-sm:flex-col mb-3">
        <div className="flex justify-start flex-col w-full h-full pt-5 pr-9 gap-5">
          <div className="w-full flex justify-between items-center gap-4">
            <p className="text-lg font-semibold">Welcome Back, Dr Anita</p>
            <DateRangePicker />
          </div>

          <div className="w-full flex-col gap-2 flex">
            <div className="flex justify-between items-center gap-4">
              <Card className=" w-1/4 rounded-lg bg-secondary shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3000.00</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card className=" w-1/4 rounded-lg bg-secondary shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Patients</CardTitle>
                  <Users />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">46</div>
                  <p className="text-xs text-muted-foreground">-16.4% from last month</p>
                </CardContent>
              </Card>
              <Card className=" w-1/4 rounded-lg bg-secondary shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Age</CardTitle>
                  <Calendar />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">33</div>
                  <p className="text-xs text-muted-foreground">Below 40</p>
                </CardContent>
              </Card>
              <Card className=" w-1/4 rounded-lg bg-secondary shadow-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultation Types</CardTitle>
                  <Stethoscope />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Checkup</div>
                  <p className="text-xs text-muted-foreground">Patients</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-1 glass-card rounded-lg bg-secondary shadow-none">
              <CardHeader>
                <CardTitle>Today`s Appointments</CardTitle>
                <CardDescription>You have 8 appointments scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentsCalendar />
              </CardContent>
            </Card>

            <AppointmentTypes />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Revenue />
            <Card className="lg:col-span-1 glass-card rounded-lg bg-secondary shadow-none">
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>Last 10 patient records</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientsList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
