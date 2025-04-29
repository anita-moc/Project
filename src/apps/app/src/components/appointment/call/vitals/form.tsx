'use client';
import { saveVitals } from '@/src/actions/appointment/save-vitals';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
/* eslint-disable react/jsx-no-undef */
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  temperature: z.string(),
  heartRate: z.string(),
  bloodPressure: z.string(),
  weight: z.string(),
  //height: z.string(),
  // respiratoryRate: z.string(),
  // oxygenSatur: z.string(),
});

type Props = {
  appointment: Primitives<Appointment>;
  toggle: VoidFunction;
};

const VitalsForm = ({ toggle, appointment }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      weight: '',
      //height: '',
      // respiratoryRate: '',
      // oxygenSaturation: '',
    },
    mode: 'all',
  });
  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      await saveVitals({
        appointmentId: appointment.id,
        temperature: Number(data.temperature),
        heartRate: Number(data.heartRate),
        weight: Number(data.weight),
        bloodPressure: Number(data.bloodPressure),
      });
      toggle();
      toast.success('Vital signs saved correctly');
    } catch (error) {
      toast.error('Error saving vital signs');
    }
  };
  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submit, (errors) => console.log(errors))}
        className="flex flex-col gap-4 justify-between flex-1"
      >
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Body temperature</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Heart rate</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Weight (Kg)</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="bloodPressure"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="text-sm">Blood pressure</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-none"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>
        </div>
        <div className="flex w-full gap-3">
          <Button onClick={() => toggle()} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting} className="rounded-none flex-1">
            {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Maintain vital signs'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VitalsForm;
