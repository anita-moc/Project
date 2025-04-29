'use client';

import { removeEducation } from '@/src/actions/doctor/remove-education';
import { saveEducation } from '@/src/actions/doctor/save-education';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@helsa/ui/components/alert-dialog';
import { Button } from '@helsa/ui/components/button';
import { Calendar } from '@helsa/ui/components/calendar';
import { Card, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@helsa/ui/components/popover';
import { cn } from '@helsa/ui/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  education: z.object({
    title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
    institution: z.string().min(2, { message: 'Institution must be at least 2 characters.' }),
    graduatedAt: z.date(),
  }),
});

type EducationsValue = z.infer<typeof formSchema>;

export const EducationsSection = ({
  educations,
  id,
}: {
  educations: { title: string; institution: string; graduatedAt: Date; id: string }[];
  id: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const toggleEdit = () => setIsEditing((current) => !current);
  const toggleCreate = () => setIsCreating((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: {
        title: '',
        institution: '',
        graduatedAt: new Date(),
      },
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const setEditData = (education: { title: string; institution: string; graduatedAt: Date; id: string }) => {
    setEditingEducationId(education.id);
    form.setValue('education.title', education.title);
    form.setValue('education.institution', education.institution);
    form.setValue('education.graduatedAt', education.graduatedAt);
  };

  const onSubmit = async (data: EducationsValue) => {
    try {
      await saveEducation({
        doctorId: id,
        education: {
          title: data.education.title,
          institution: data.education.institution,
          graduatedAt: data.education.graduatedAt,
          id: editingEducationId ?? undefined,
        },
      });
      toast.success('Education edited successfully.');
      setIsEditing(false);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const deleteEducation = async (educationId: string) => {
    try {
      await removeEducation({
        doctorId: id,
        educationId,
      });
      toast.success('Education deleted successfully.');
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
              <CardTitle>Studies</CardTitle>
              <p className="text-muted-foreground text-sm mt-5">
              Your education and certifications are important to patients. Add your education and certifications.
              </p>
              <div className="flex flex-col w-full gap-2 mt-2">
                {educations.map((education, index) => (
                  <div key={index} className="flex justify-between items-center gap-2 rounded-none border p-3">
                    <p className="flex items-center gap-3 text-sm text-muted-foreground">
                      {education.title} - {format(education.graduatedAt, 'PP')}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <Button
                        className="rounded-none bg-sidebar"
                        size="icon"
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEditing(true);
                          setEditData(education);
                        }}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="rounded-none bg-sidebar" size="icon" variant="outline" type="button">
                            <Trash2 className="size-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:rounded-none">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="">Careful!</AlertDialogTitle>
                            <AlertDialogDescription className="">
                            Are you sure you want to delete the Records?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex w-full justify-end items-center">
                            <AlertDialogCancel className="rounded-none max-sm:w-full">Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild className="bg-destructive text-primary">
                              <Button
                                variant="destructive"
                                className="rounded-none max-sm:w-full"
                                onClick={() => deleteEducation(education.id)}
                              >
                                Delete
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
              {(isEditing || isCreating) && (
                <div className="flex gap-2 items-center p-3 border mt-2">
                  <FormField
                    control={form.control}
                    name={`education.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Qualification</FormLabel>
                        <FormControl>
                          <Input {...field} className="rounded-none"></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education.institution"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input {...field} className="rounded-none"></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education.graduatedAt"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col">
                        <FormLabel className="mb-2">Graduation date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal rounded-none',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardFooter className="border-t pt-4 flex justify-between items-start gap-2 md:items-center flex-col md:flex-row">
            <p className="text-muted-foreground text-xs">
              Add your education and certifications so patients can learn more about you.
            </p>
            {isEditing || isCreating ? (
              <div className="flex justify-end items-center gap-3">
                <Button
                  onClick={() => {
                    form.reset();
                    setEditingEducationId(null);
                    isEditing && toggleEdit();
                    isCreating && toggleCreate();
                  }}
                  className="rounded-none"
                  type="button"
                >
                  Cancel
                </Button>
                <Button disabled={!isValid || isSubmitting} type="submit" className="rounded-none">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Keep'}
                </Button>
              </div>
            ) : (
              <Button onClick={toggleCreate} className="rounded-none">
                Add
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
