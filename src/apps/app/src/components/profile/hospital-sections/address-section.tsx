'use client';

import { updateHospital } from '@/src/actions/hospital/update-hospital';
import { Button } from '@helsa/ui/components/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  address: z.object({
    city: z.string().min(2, {
      message: 'The city must have at least 2 characters.',
    }),
    street: z.string().min(2, {
      message: 'The street must have at least 2 characters.',
    }),
    country: z.string().min(2, {
      message: 'The country must have at least 2 characters.',
    }),
    zipCode: z.string().min(2, {
      message: 'The postal code must have at least 2 characters.',
    }),
  }),
});

type AddressFormValues = z.infer<typeof formSchema>;

export const AddressSection = ({ address, id }: AddressFormValues & { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { address },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const onSubmit = async (data: AddressFormValues) => {
    try {
      await updateHospital({
        hospitalId: id,
        hospital: {
          address: data.address,
        },
      });
      setIsEditing(false);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Error updating consulting room');
    }
  };

  return (
    <Card className="rounded-none bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <CardHeader>
            <div>
              <CardTitle>Dirección</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {isEditing
                  ? 'Edit your hospital address so patients can find you.'
                  : 'Your hospital address is important so patients can find you.'}
              </p>
              {!isEditing ? (
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4"></MapPin>
                    <p>
                      {address.street}, {address.city}, {address.country}, {address.zipCode}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center gap-3 mt-3">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-3 mt-3">
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Zip code</FormLabel>
                          <FormControl>
                            <Input {...field} className="outline-none rounded-none"></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              {isEditing
                ? 'Make sure the address is correct so patients can find you.'
                : 'Your hospital address is important so patients can find you.'}
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
