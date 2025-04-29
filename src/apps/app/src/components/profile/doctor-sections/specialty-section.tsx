'use client';

import { updateDoctor } from '@/src/actions/doctor/update-doctor';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Specialty } from '@helsa/engine/doctor/domain/specialty';
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
  specialtyId: z.string(),
});

type SpecialtyValue = z.infer<typeof formSchema>;

export const SpecialtySection = ({
  specialtyId,
  id,
  specialties,
}: SpecialtyValue & { id: string; specialties: Primitives<Specialty>[] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { specialtyId },
    mode: 'all',
  });
  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (data: SpecialtyValue) => {
    try {
      await updateDoctor({
        doctorId: id,
        doctor: {
          specialtyId: data.specialtyId,
        },
      });
      setIsEditing(false);
      toast.success('Specialty updated successfully');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };
  const selectedSpecialty = specialties.find(
    (specialty: { id: string; name: string }) => specialty.id === form.getValues('specialtyId'),
  );

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="">
            <div>
              <CardTitle>Specialty medica</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
                {isEditing
                  ? 'Selecciona la Specialty médica en la que te especializas.'
                  : 'Esta información es importante para los Patients.'}
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{selectedSpecialty?.name}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="specialtyId"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-5">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialties.map((specialty: { id: string; name: string }) => (
                            <SelectItem key={specialty.id} value={specialty.id}>
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
            Without a Specialty you cannot start treating patients.
            </p>
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
