'use client';

import { saveVitals } from '@/src/actions/appointment/save-vitals';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Thermometer, X } from 'lucide-react';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { VitalSign } from '../info';

type TemperatureProps = {
  value: number;
  toggle: VoidFunction;
};
const TemperatureInfo = ({ value, toggle }: TemperatureProps) => {
  return (
    <VitalSign
      icon={<Thermometer className="h-5 w-5" />}
      label="Temperature"
      value={value}
      unit="°C"
      max={37.5}
      min={36}
      toggle={toggle}
    />
  );
};

const formSchema = z.object({
  temperature: z.string().min(1, { message: 'You must enter a valid value' }),
});

const TemperatureForm = ({
  temperature,
  toggle,
  appointmentId,
  execute,
}: {
  temperature: number;
  toggle: VoidFunction;
  appointmentId: string;
  execute: any;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temperature: temperature.toString(),
    },
    mode: 'all',
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      await execute({
        appointmentId: appointmentId,
        temperature: Number(data.temperature),
      });
      toggle();
      toast.success('Vital signs saved correctly');
      router.refresh();
    } catch (error) {
      toast.error('Error saving vital signs');
    }
  };

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submit, (errors) => console.log(errors))}
        className="flex flex-col gap-4 justify-between flex-1 h-full"
      >
        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem className="border rounded-xl p-4 my-0 h-full">
              <FormLabel className="text-sm flex justify-between">
               Temperature
                <div onClick={toggle} className="cursor-pointer">
                  <X className="size-4" />
                </div>
              </FormLabel>
              <FormControl className="flex">
                <div>
                  <Input {...field} className="rounded-r-none focus-visible:ring-0"></Input>
                  <Button
                    type="submit"
                    variant={'secondary'}
                    disabled={form.formState.isSubmitting}
                    className="rounded-l-none p-0 px-2 h-10"
                  >
                    {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Keep '}
                  </Button>
                </div>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export const Temperature = ({ value, appointmentId }: { value: number; appointmentId: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { optimisticState, execute } = useOptimisticAction(saveVitals, {
    currentState: { temperature: value },
    updateFn: (state, newValue) => ({ temperature: newValue.temperature! }),
  });
  if (isEditing) {
    return (
      <TemperatureForm
        temperature={value}
        toggle={() => setIsEditing((current) => !current)}
        appointmentId={appointmentId}
        execute={execute}
      />
    );
  }

  return <TemperatureInfo value={optimisticState.temperature} toggle={() => setIsEditing((current) => !current)} />;
};
