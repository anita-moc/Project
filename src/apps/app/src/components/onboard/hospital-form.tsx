'use client';
import { createHospital } from '@/src/actions/hospital/create-hospital';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });


const formSchema = z.object({
  name: z.string().min(3, { message: 'The Name must have at least 3 characters' }),
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
});

const HospitalForm = ({ userId }: { userId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      street: '',
      city: '',
      country: '',
      zipCode: '',
    },
    mode: 'all',
  });
  const { isSubmitting } = form.formState;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createHospital({
        hospital: {
          adminId: userId,
          name: data.name,
          address: {
            street: data.street || '',
            city: data.city || '',
            country: data.country || '',
            zipCode: data.zipCode || '',
            coordinates: {
              latitude: 0,
              longitude: 0,
            },
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm">Address 1</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-none"></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex items-center w-full gap-3">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="my-2 flex-1">
                      <FormLabel className="text-sm">Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="my-2 flex-1">
                      <FormLabel className="text-sm">City</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center w-full gap-3">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="my-2 flex-1">
                      <FormLabel className="text-sm">
                      Country</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="my-2 flex-1">
                      <FormLabel className="text-sm">Zip code</FormLabel>
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
        <AlertDialogContent className="rounded-none">
          <Lottie
            options={{
              autoplay: true,
              loop: false,
              animationData: successAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            style={{ width: 300, height: 300 }}
          ></Lottie>
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

export default HospitalForm;
