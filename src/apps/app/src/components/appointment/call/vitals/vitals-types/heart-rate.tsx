'use client';

import { saveVitals } from '@/src/actions/appointment/save-vitals';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart, Loader2, X } from 'lucide-react';
import { useOptimisticAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { VitalSign } from '../info';

type HearRateProps = {
  value: number;
  toggle: VoidFunction;
};
export const HeartRateInfo = ({ value, toggle }: HearRateProps) => {
  return (
    <VitalSign
      icon={<Heart className="h-5 w-5" />}
      label="Heart Rate"
      value={value}
      unit="bpm"
      max={100}
      min={60}
      toggle={toggle}
    />
  );
};

const formSchema = z.object({
  heartRate: z.string().min(1, { message: 'You must enter a valid value' }),
});

export const HeartRateForm = ({
  heartRate,
  toggle,
  appointmentId,
  execute,
}: {
  heartRate: number;
  toggle: VoidFunction;
  appointmentId: string;
  execute: any;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heartRate: heartRate.toString(),
    },
    mode: 'all',
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      await execute({ heartRate: Number(data.heartRate), appointmentId });
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
          name="heartRate"
          render={({ field }) => (
            <FormItem className="border p-4 my-0 h-full rounded-xl">
              <FormLabel className="text-sm flex justify-between">
              Heart rate
                <div onClick={toggle} className="cursor-pointer">
                  <X className="size-4" />
                </div>
              </FormLabel>
              <FormControl className="flex">
                <div>
                  <Input
                    {...field}
                    className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent"
                  ></Input>
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

export const HeartRate = ({ value, appointmentId }: { value: number; appointmentId: string }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { optimisticState, execute } = useOptimisticAction(saveVitals, {
    currentState: { heartRate: value },
    updateFn: (state, newValue) => ({ heartRate: newValue.heartRate! }),
  });

  if (isEditing) {
    return (
      <HeartRateForm
        execute={execute}
        heartRate={value}
        toggle={() => setIsEditing((current) => !current)}
        appointmentId={appointmentId}
      />
    );
  }

  return <HeartRateInfo value={optimisticState.heartRate} toggle={() => setIsEditing((current) => !current)} />;
};
