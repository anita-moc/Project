'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Card } from '@helsa/ui/components/card';
import { Star } from 'lucide-react';
import { useQueryState } from 'nuqs';

type Props = {
  doctor: Primitives<Doctor>;
};

const DoctorCard = ({ doctor }: Props) => {
  const [doctorId, setDoctorId] = useQueryState('id');
  return (
    <Card
      className="flex flex-col items-center rounded-none gap-4 cursor-pointer hover:bg-sidebar py-3"
      onClick={() => setDoctorId(doctor.id)}
    >
      <img src={doctor.user?.image} alt="" className="object-contain h-[230px] aspect-square" />
      <div className="flex w-full justify-between px-4">
        <div>
          <p className="font-bold">{doctor.user?.name}</p>
          <p className="text-sm text-muted-foreground">{doctor.specialty?.name}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center justify-end gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`size-3 font-bold ${
                  doctor.score > index ? 'text-color-brand-primary' : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{doctor.experience} years</p>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
