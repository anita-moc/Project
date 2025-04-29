'use client';

import { authClient } from '@helsa/auth/client';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useSession } from '../../auth/session-provider';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
});

type NameFormValues = z.infer<typeof formSchema>;

export const NameSection = () => {
  const { user } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: user.name },
  });
  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (data: NameFormValues) => {
    try {
      await authClient.updateUser({
        name: data.name,
      });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="">
            <div>
              <CardTitle>Name</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
              This is the name that will be displayed on your profile. You can change it.
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{form.getValues('name')}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-none"></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
            Please enter your full name, or a display name you feel comfortable with.
            </p>
            {isEditing ? (
              <div className="flex justify-end items-center gap-3">
                <Button onClick={toggleEdit} className="rounded-none">
                  Cancel
                </Button>
                <Button disabled={!isValid || isSubmitting} type="submit" className="rounded-none">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
              </div>
            ) : (
              <Button onClick={toggleEdit} className="rounded-none">
               Edit
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
