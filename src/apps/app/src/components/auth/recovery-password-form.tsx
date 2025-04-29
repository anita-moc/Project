'use client';
import * as successAnimation from '@/src/assets/animations/success_animation.json';
import { authClient } from '@helsa/auth/client';
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
import { PasswordInput } from '@helsa/ui/components/internal/password-input';
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
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  code: z.string().min(6, { message: 'Code must be at least 6 characters' }),
});

const RecoveryPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      code: '',
    },
  });
  const [email, setEmail] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { isSubmitting } = form.formState;

  const router = useRouter();
  const { data } = authClient.useSession();

  if (data) {
    router.push('/');
  }

  const sendVerificationCode = async () => {
    try {
      await authClient.emailOtp.sendVerificationOtp({ email, type: 'forget-password' });
      setSuccessfulCreation(true);
    } catch (error) {
      toast.error('Error sending verification code');
    }
  };

  const resetPassword = async (data: z.infer<typeof formSchema>) => {
    try {
      await authClient.emailOtp.resetPassword({
        email,
        password: data.password,
        otp: data.code,
      });
      setShowSuccessModal(true);
    } catch (error) {
      toast.error('Error changing password');
    }
  };

  if (!successfulCreation) {
    return (
      <div className="grid w-full h-full grow items-center px-20">
        <Card className="border-none shadow-none w-full">
          <CardHeader>
            <CardTitle>Password recovery</CardTitle>
            <CardDescription>Enter your email and we'll send you a verification code.</CardDescription>
          </CardHeader>
          <CardContent className="">
            <Input value={email} onChange={(event) => setEmail(event.target.value)}></Input>
          </CardContent>
          <CardFooter>
            <div className="grid w-full gap-y-4">
              <Button type="submit" disabled={isSubmitting} onClick={sendVerificationCode}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar código de verificación'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(resetPassword)}>
          <Card className="border-none shadow-none w-full">
            <CardHeader>
              <CardTitle>Welcome to Gonurse</CardTitle>
              <CardDescription>
             Gonurse is a platform that helps you keep track of your health. Get started by creating an account </CardHeader>
            <CardContent className="">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">
                    Your new password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput {...field} autoComplete="current-password"></PasswordInput>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">recovery code
                  </FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="grid w-full gap-y-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Change password'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <AlertDialog open={showSuccessModal}>
        <AlertDialogContent>
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
              You have successfully verified your email
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

export default RecoveryPasswordForm;
