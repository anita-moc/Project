'use client';

import { updateBiometric } from '@/src/actions/patient/update-biometric';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  height: z.string(),
});

type HeightValue = z.infer<typeof formSchema>;

export const HeightSection = ({ height, id }: HeightValue & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { height },
    mode: 'all',
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const onSubmit = async (data: HeightValue) => {
    try {
      await updateBiometric({
        patientId: id,
        biometric: {
          height: parseFloat(data.height),
        },
      });
      setIsEditing(false);
      toast.success('Height updated successfully');
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
              <CardTitle>Height</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                {isEditing ? 'Enter your height. This number is public.' : 'Your height is public information.'}
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{form.getValues('height')} mts</p>
              ) : (
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-5">
                      <FormControl>
                        <Input {...field} className="rounded-none" type="number"></Input>
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
            This information is so that doctors can have a better understanding of your health.</p>
            {isEditing ? (
              <div className="flex justify-end items-center gap-3">
                <Button
                  onClick={() => {
                    form.reset();
                    toggleEdit();
                  }}
                  className="rounded-none"
                >
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
