'use client';
import { createPatient } from '@/src/actions/patient/create-patient';
import * as successAnimation from '@/src/assets/animations/success_animation.json';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@helsa/ui/components/alert-dialog';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

// Create a mutable copy of the animation data
const defaultOptions = {
  animationData: JSON.parse(JSON.stringify(successAnimation)),
  autoplay: true,
  loop: false,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const formSchema = z.object({
  demographic: z.object({
    civilStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
    occupation: z.string().min(3, { message: 'Occupation must be at least 3 characters long' }),
    educativeLevel: z.string().min(3, { message: 'Educative Level must be at least 3 characters long' }),
  }),
  biometric: z.object({
    height: z.string().min(0, { message: 'Height must be a positive number' }),
    organDonor: z.enum(['Yes', 'No']),
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  }),
});

const PatientForm = ({ userId }: { userId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      demographic: {
        civilStatus: 'SINGLE',
        occupation: '',
        educativeLevel: '',
      },
      biometric: {
        height: '',
        organDonor: 'No',
        bloodType: 'A+',
      },
    },
    mode: 'all',
  });
  const { isSubmitting } = form.formState;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createPatient({
        patient: {
          userId: userId,
          demographic: data.demographic,
          biometric: {
            ...data.biometric,
            height: parseFloat(data.biometric.height),
          },
        },
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-none shadow-none w-full">
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
              <CardDescription>
              Please complete the following fields to continue with the Records process
              </CardDescription>
            </CardHeader>
            <CardContent className="k">
              <Label className="font-semibold text-xl my-3">Demographics</Label>
              <div className="flex items-center w-full gap-3">
                <FormField
                  control={form.control}
                  name="demographic.civilStatus"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">Status civil</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {civilStatusOptions.map((specialty) => (
                            <SelectItem key={specialty.id} value={specialty.id} className="rounded-none">
                              <span className="flex w-full justify-between items-center gap-3">{specialty.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="demographic.educativeLevel"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">Education</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {educationLevels.map((specialty) => (
                            <SelectItem key={specialty.id} value={specialty.id} className="rounded-none">
                              <span className="flex w-full justify-between items-center gap-3">{specialty.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="demographic.occupation"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel className="text-sm">Ocupación</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Label className="font-semibold text-xl my-3">Medical data</Label>
              <div className="flex items-center w-full gap-3">
                <FormField
                  control={form.control}
                  name="biometric.bloodType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">Blood type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {bloodTypeOptions.map((specialty) => (
                            <SelectItem key={specialty.id} value={specialty.id} className="rounded-none">
                              <span className="flex w-full justify-between items-center gap-3">{specialty.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="biometric.organDonor"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">organ donor?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {organDonorOptions.map((specialty) => (
                            <SelectItem key={specialty.id} value={specialty.id} className="rounded-none">
                              <span className="flex w-full justify-between items-center gap-3">{specialty.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="biometric.height"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel className="text-sm">Height</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid w-full gap-y-4">
                <Button type="submit" className="rounded-none">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <AlertDialog open={showSuccessModal}>
        <AlertDialogContent className="sm:rounded-none">
          <Lottie
            options={defaultOptions}
            style={{ width: 300, height: 300 }}
          />
          <AlertDialogHeader className="my-0">
            <AlertDialogTitle className="text-center text-2xl">Verified!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              You have successfully completed the Records process
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex w-full sm:justify-center items-center">
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/dashboard');
                }}
                size="lg"
                className="rounded-none"
              >
                Go To Dashboard
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PatientForm;

const organDonorOptions = [
  {
    id: 'Yes',
    name: 'Sí',
  },
  {
    id: 'No',
    name: 'No',
  },
];

const bloodTypeOptions = [
  {
    id: 'A+',
    name: 'A+',
  },
  {
    id: 'A-',
    name: 'A-',
  },
  {
    id: 'B+',
    name: 'B+',
  },
  {
    id: 'B-',
    name: 'B-',
  },
  {
    id: 'AB+',
    name: 'AB+',
  },
  {
    id: 'AB-',
    name: 'AB-',
  },
  {
    id: 'O+',
    name: 'O+',
  },
  {
    id: 'O-',
    name: 'O-',
  },
];

const civilStatusOptions = [
  {
    id: 'SINGLE',
    name: 'Single',
  },
  {
    id: 'MARRIED',
    name: 'Married',
  },
  {
    id: 'DIVORCED',
    name: 'Divorced',
  },
  {
    id: 'WIDOWED',
    name: 'Widowed',
  },
];


const educationLevels = [
  {
    id: 'PRIMARY',
    name: 'Primary',
  },
  {
    id: 'SECONDARY',
    name: 'Secondary',
  },
  {
    id: 'TECHNICAL',
    name: 'Technical',
  },
  {
    id: 'UNIVERSITY',
    name: 'University',
  },
];
