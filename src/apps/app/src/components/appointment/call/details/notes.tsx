'use client';
import { useSession } from '@/src/components/auth/session-provider';
import { useNotes } from '@/src/hooks/appointment/use-notes';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { AppointmentNote } from '@helsa/engine/appointment/domain/note';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@helsa/ui/components/form';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardMinus, Loader2, StickyNote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const NoteList = ({
  notes,
  toggle,
  patient,
}: {
  notes: Primitives<AppointmentNote>[];
  toggle: VoidFunction;
  patient?: boolean;
}) => {
  return (
    <>
      {notes?.map((note) => (
        <div className="flex justify-start items-center gap-2 text-muted-foreground" key={note.id}>
          <StickyNote className="size-4" />
          <span>{note.description}</span>
        </div>
      ))}
      {patient && (
        <Button onClick={toggle}>
          <ClipboardMinus className="size-4" />
          Add Note
        </Button>
      )}
    </>
  );
};

const formSchema = z.object({
  description: z.string(),
});

export const NotesForm = ({ data, toggle }: { data: Primitives<Appointment>; toggle: VoidFunction }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: '' },
  });
  const { createNote } = useNotes();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createNote({ appointmentId: data.id, note: values.description });
      toast.success('Note added successfully');
      form.reset();
      router.refresh();
      toggle();
    } catch (error) {
      toast.error('Error adding note');
    }
  };

  return (
    <>
      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl>
                  <Textarea placeholder="Add a note" {...field} className="min-h-[100px]" />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className="flex w-full gap-3">
            <Button
              onClick={(e) => {
                toggle();
                form.reset();
              }}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button className=" gap-3 flex-1" variant={'secondary'} disabled={!document || form.formState.isSubmitted}>
              {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Save note'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export const NotesContent = ({
  data,
  notes,
}: {
  data: Primitives<Appointment>;
  notes: Primitives<AppointmentNote>[];
}) => {
  const { user } = useSession();
  const [editing, setEditing] = useState(false);

  const isPatient = user?.role === 'PATIENT';

  return (
    <>
      {!editing && <NoteList notes={notes} toggle={() => setEditing((current) => !current)} patient={isPatient} />}
      {editing && <NotesForm data={data} toggle={() => setEditing((current) => !current)} />}
    </>
  );
};
