'use client';
import { createDoctor } from '@/src/actions/doctor/create-doctor';
import * as successAnimation from '@/src/assets/animations/success_animation.json';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Specialty } from '@helsa/engine/doctor/domain/specialty';
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
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
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
  licenseMedicalNumber: z.string().min(3, { message: 'License Medical Number must be at least 3 characters long' }),
  specialtyId: z.string().min(1, { message: 'Specialty is required' }),
});

const DoctorForm = ({ userId, specialties }: { userId: string; specialties: Primitives<Specialty>[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseMedicalNumber: '',
      specialtyId: '',
    },
    mode: 'all',
  });
  const { isSubmitting } = form.formState;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createDoctor({
        doctor: {
          id: v4(),
          licenseMedicalNumber: data.licenseMedicalNumber,
          specialtyId: data.specialtyId,
          userId: userId,
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
              <FormField
                control={form.control}
                name="licenseMedicalNumber"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm">Medical license number</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-none"></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialtyId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm">Specialty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select a speciality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        {specialties.map((specialty: Primitives<Specialty>) => (
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
            <AlertDialogTitle className="text-center text-2xl">Verification!</AlertDialogTitle>
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
               Go to Dashboard
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DoctorForm;
