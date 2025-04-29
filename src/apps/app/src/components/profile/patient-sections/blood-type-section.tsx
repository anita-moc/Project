'use client';

import { updateBiometric } from '@/src/actions/patient/update-biometric';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
});

type BloodTypeLevel = z.infer<typeof formSchema>;

export const BloodTypeSection = ({ bloodType, id }: BloodTypeLevel & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { bloodType },
    mode: 'all',
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit = async (data: BloodTypeLevel) => {
    try {
      await updateBiometric({ patientId: id, biometric: data });
      setIsEditing(false);
      toast.success('Blood type actualizado correctamente.');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const bloodTypeSelected = bloodTypeOptions.find((option) => option.id === form.getValues('bloodType'));

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="">
            <div>
              <CardTitle>Blood type</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                {isEditing ? 'Select your Blood type.' : 'Your blood type is important to us'}
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{bloodTypeSelected?.name}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-5">
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
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
            This information is important to us, please keep it updated.</p>
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
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Keep'}
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
