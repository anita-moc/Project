'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Pathology } from '@helsa/engine/diagnostic/domain/pathology';
import { Order } from '@helsa/engine/order/domain/order';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardFooter } from '@helsa/ui/components/card';
import { Separator } from '@helsa/ui/components/separator';
import { addMinutes } from 'date-fns/addMinutes';
import { format } from 'date-fns/format';
import { es } from 'date-fns/locale';
import { Calendar, Clock, MapPin, Printer } from 'lucide-react';
import { BloodPressure } from './vitals/vitals-types/blood-pressure';
import { HeartRate } from './vitals/vitals-types/heart-rate';
import { OxygenSaturation } from './vitals/vitals-types/oxygen-saturation';
import { RespiratoryRate } from './vitals/vitals-types/respiratory-rate';
import { Temperature } from './vitals/vitals-types/temperature';
import { Weight } from './vitals/vitals-types/weight';

const orderTypes = {
  TEST: 'Test',
  REMITTANCE: 'Remittance',
};

const defaultData = {
  heartRate: 72,
  temperature: 36.6,
  bloodPressure: '120/80',
  weight: 120,
  systolic: 120,
  diastolic: 80,
  respiratoryRate: 16,
  oxygenSaturation: 98,
};

const FinishDetails = ({
  appointment,
  pathologies,
  orders,
}: {
  appointment: Primitives<Appointment>;
  pathologies: Primitives<Pathology>[];
  orders: Primitives<Order>[];
}) => {
  return (
    <Card className="w-full">
      <CardContent className="space-y-6 py-5">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Date and Time</h3>
              <div className="flex items-center mt-1 gap-2">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">
                  {format(appointment.date, 'PPPP', {
                    locale: es,
                  })}{' '}
                </span>
                <Badge>Finished</Badge>
              </div>
              <div className="flex items-center mt-1 gap-2">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">
                  {appointment.hour} - {format(addMinutes(appointment.date ?? new Date(), 30), 'HH:mm')}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Location</h3>
              <div className="flex items-start mt-1">
                <MapPin className="h-4 w-4 mr-2 text-primary mt-1" />
                <div>
                  <p className="font-medium">Mwiki Medical Center</p>
                  <p className="text-sm text-muted-foreground">Mwiki Town opposite ACK Church</p>
                  <p className="text-sm text-muted-foreground">Nairobi City ,Kasarani</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Reason for Consultation</h3>
              <p className="mt-1">{appointment.motive}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Diagnosis</h3>
              <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                {appointment.diagnostics?.map((diagnostic) => (
                  <li className="mt-1" key={diagnostic.id}>
                    {pathologies.find((p) => p.id == diagnostic.pathologyId)?.name} - {diagnostic.description}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Recommended Treatment</h3>
              <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                {appointment.treatments?.map((treatment) => (
                  <li key={treatment.id}>
                    {treatment.medication?.name} cada {treatment.medication?.frequency} {treatment.description}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Referrals</h3>
              <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                {orders.map((order) => (
                  <li key={order.id}>
                    {orderTypes[order.type]}: {order.description}
                  </li>
                ))}
              </ul>
            </div>
            <Button>
              <Printer className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div>
            <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Vital signs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 py-4">
              <HeartRate
                appointmentId={appointment.id}
                value={appointment.telemetry?.heartRate ?? defaultData.heartRate}
              />
              <BloodPressure
                appointmentId={appointment.id}
                value={appointment.telemetry?.bloodPressure ?? Number(defaultData.bloodPressure.split('/')[0])}
              />
              <Temperature
                appointmentId={appointment.id}
                value={appointment.telemetry?.temperature ?? defaultData.temperature}
              />
              <Weight appointmentId={appointment.id} value={appointment.telemetry?.weight ?? defaultData.weight} />
              <RespiratoryRate
                appointmentId={appointment.id}
                value={appointment.telemetry?.respiratoryRate ?? defaultData.respiratoryRate}
              />
              <OxygenSaturation
                appointmentId={appointment.id}
                value={appointment.telemetry?.oxygenSaturation ?? defaultData.oxygenSaturation}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Next Appointment</h3>
          <div className="flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span className="font-medium">Monday, August 15, 2025  11:00</span>
          </div>
          <p className="text-sm mt-1">Blood pressure monitoring and new analysis results</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-start flex-col sm:flex-row gap-3 pt-2">
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Follow-up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FinishDetails;
