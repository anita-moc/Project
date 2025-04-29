'use client';
import { savePrice } from '@/src/actions/doctor/save-price';
import { Button } from '@helsa/ui/components/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@helsa/ui/components/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';

type Props = {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
  doctorId: string;
  types: any[];
};

const formSchema = z.object({
  name: z.string(),
  amount: z.string(),
  duration: z.string(),
  typeId: z.string(),
  currency: z.string(),
});

const durations = [
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '45 minutes', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '1 hour 30 minutes', value: 70 },
  { label: '2 hours', value: 120 },
];

const currencies = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'JPY', value: 'JPY' },
];

const CreatePriceModal = ({ isOpen, onOpenChange, doctorId, types }: Props) => {
  const router = useRouter();
  const createType = useAction(savePrice, {
    onSuccess: () => {
      onOpenChange(false);
      toast.success('Created rate');
      router.refresh();
    },
    onError: () => {
      toast.error('Error creating rate');
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '0',
      duration: '30',
      typeId: '',
      currency: 'USD',
      name: '',
    },
  });

  useEffect(() => {
    form.reset({
      amount: undefined,
      duration: undefined,
      typeId: undefined,
      currency: 'USD',
    });
  }, [isOpen]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    createType.execute({
      name: data.name,
      amount: parseFloat(data.amount),
      duration: parseInt(data.duration),
      typeId: data.typeId,
      doctorId,
      currency: data.currency,
      id: v4(),
    });
  }
  return (
    <DialogContent className="max-w-[555px] sm:rounded-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}>
          <div className="p-4">
            <DialogHeader className="mb-4">
              <DialogTitle>Create rate</DialogTitle>
              <DialogDescription>Create your rates here</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col space-y-6 max-h-[400px] overflow-auto">
              <div className="flex flex-col space-y-2">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                  <FormField
                    control={form.control}
                    name={`name`}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Rate name"
                            className="rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`amount`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Price"
                            className="rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            type="number"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`currency`}
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full rounded-none focus:outline-none focus:ring-0 focus:ring-transparent">
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-none">
                            {currencies.map((currency) => (
                              <SelectItem
                                key={currency.value}
                                value={currency.value.toString()}
                                className="rounded-none"
                              >
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="typeId"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full rounded-none focus:outline-none focus:ring-0 focus:ring-transparent">
                              <SelectValue placeholder="Query type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-none">
                            {types.map((type) => (
                              <SelectItem key={type.id} value={type.id} className="rounded-none">
                                <div className="flex justify-start items-center gap-3">
                                  <div className="size-3" style={{ backgroundColor: type.color }}></div>
                                  {type.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="flex-1 ">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full rounded-none focus:outline-none focus:ring-0 focus:ring-transparent">
                              <SelectValue placeholder="Duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-none">
                            {durations.map((duration) => (
                              <SelectItem
                                key={duration.value}
                                value={duration.value.toString()}
                                className="rounded-none"
                              >
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className=" pt-4 mt-8 items-center !justify-between">
              <div>
                {Object.values(form.formState.errors).length > 0 && (
                  <span className="text-sm text-destructive">Please complete the fields above.</span>
                )}
              </div>
              <Button type="submit" disabled={createType.status === 'executing'}>
                {createType.status === 'executing' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create'}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreatePriceModal;
