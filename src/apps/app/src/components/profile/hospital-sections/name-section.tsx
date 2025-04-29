'use client';

import { updateHospital } from '@/src/actions/hospital/update-hospital';
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
  name: z.string().min(3, { message: 'El Name no puede estar vació' }),
});

type NameSectionValue = z.infer<typeof formSchema>;

export const NameSection = ({ name, id }: NameSectionValue & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
    mode: 'all',
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit = async (data: NameSectionValue) => {
    try {
      await updateHospital({ hospitalId: id, hospital: data });
      setIsEditing(false);
      toast.success('Name actualizado correctamente');
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
                Este es el Name que se mostrará en el perfil del hospital.
              </p>
              {!isEditing ? (
                <p className="text-primary font-bold mt-3">{form.getValues('name')}</p>
              ) : (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-5">
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
            <p className="text-muted-foreground text-xs">El Name es obligatorio y público.</p>
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

const civilStatusOptions = [
  {
    id: 'SINGLE',
    name: 'Single/a',
  },
  {
    id: 'MARRIED',
    name: 'Married/a',
  },
  {
    id: 'DIVORCED',
    name: 'Divorced/a',
  },
  {
    id: 'WIDOWED',
    name: 'Widowed/a',
  },
];
