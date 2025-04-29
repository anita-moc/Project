'use client';
import { authClient } from '@helsa/auth/client';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    newPassword: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
    confirmPassword: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ChangePasswordForm = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'all',
  });
  const { isValid, isSubmitting } = form.formState;
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      form.reset();
      authClient.changePassword({
        newPassword: data.newPassword,
        currentPassword: data.confirmPassword,
      });
      toast.success('Password updated successfully');
      router.push('/profile');
    } catch (error) {
      console.log(error);
      toast.error('Error updating password');
    }
  };
  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="">
            <div>
              <CardTitle>Password</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">Change your password to keep your account secure.
              </p>
              <div className="flex flex-col w-full justify-between items-center gap-3 mt-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="flex-1  w-full">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
            By clicking Keep, you agree to our Privacy Policy and Terms of Service.
            </p>
            <Button disabled={!isValid || isSubmitting} variant="destructive" type="submit" className="rounded-none">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Keep'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ChangePasswordForm;
