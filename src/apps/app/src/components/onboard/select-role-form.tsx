'use client';

import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { cn } from '@helsa/ui/lib/utils';
import { Hospital, Stethoscope, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SelectRoleForm = ({ userId }: { userId: string }) => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const onContinue = () => {
    console.log(role);
    // if (!role) return;

    router.push(`/onboarding?role=${role}&userId=${userId}`);
  };

  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Card className="border-none shadow-none w-full">
        <CardHeader className="text-center">
          <CardTitle>Choose your role</CardTitle>
          <CardDescription>Please choose your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="my-5">
          <div className="flex flex-col items-center justify-around gap-4 w-full">
            <div
              className={cn(
                'flex items-center justify-start gap-4 p-4 w-2/3 border rounded-none cursor-pointer transition-all duration-500 group',
                {
                  'ring-2 ring-color-brand-primary': role === 'PATIENT',
                },
              )}
              onClick={() => setRole('PATIENT')}
            >
              <User className="mb-2 h-8 w-8" />
              <div className="gap-2">
                <p className="text-lg font-semibold">Patient</p>
                <p className="">If you are seeking medical attention, this is your option</p>
              </div>
            </div>
            <div
              className={cn(
                'flex items-center justify-start gap-4 p-4 w-2/3 border rounded-none cursor-pointer transition-all duration-500 group',
                {
                  'ring-2 ring-color-brand-primary': role === 'DOCTOR',
                },
              )}
              onClick={() => setRole('DOCTOR')}
            >
              <Stethoscope className="mb-2 h-8 w-8" />
              <div className="gap-2">
                <p className="text-lg font-semibold">Doctor</p>
                <p className="">If you are a healthcare professional looking for patients, this is your option</p>
              </div>
            </div>
            <div
              className={cn(
                'flex items-center justify-start gap-4 p-4 w-2/3 border rounded-none cursor-pointer transition-all duration-500 group',
                {
                  'ring-2 ring-color-brand-primary': role === 'HOSPITAL',
                },
              )}
              onClick={() => setRole('HOSPITAL')}
            >
              <Hospital className="mb-2 h-8 w-8" />
              <div className="gap-2">
                <p className="text-lg font-semibold">Hospital</p>
                <p className="">If you are a hospital looking for patients, this is your option</p>
              </div>
            </div>
            <Button className="w-2/3" onClick={onContinue}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectRoleForm;
