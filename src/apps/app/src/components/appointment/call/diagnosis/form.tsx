'use client';
import { createDiagnosis } from '@/src/actions/diagnostic/create-diagnosis';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Symptom } from '@helsa/engine/appointment/domain/symptom';
import { Pathology } from '@helsa/engine/diagnostic/domain/pathology';
import { Button } from '@helsa/ui/components/button';
import { Combobox } from '@helsa/ui/components/combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { RadioGroup, RadioGroupItem } from '@helsa/ui/components/radio-group';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';
const formSchema = z.object({
  diagnosis: z.string(),
  symptoms: z.string(),
  notes: z.string(),
  type: z.enum(['ALLERGY', 'DISEASE', 'CHRONIC_DISEASE', 'SYMPTOM']),
});
function transformOption(specialty: { id: string; name: string }) {
  return {
    value: specialty.name,
    label: specialty.name,
  };
}

type Props = {
  pathologies: Primitives<Pathology>[];
  symptoms: Primitives<Symptom>[];
  appointment: Primitives<Appointment>;
  toggle: VoidFunction;
};
const DiagnosisForm = ({ pathologies, toggle, symptoms, appointment }: Props) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diagnosis: '',
      symptoms: '',
      notes: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = v4();
      await createDiagnosis({
        id,
        type: values.type,
        description: values.notes,
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        appointmentId: appointment.id,
        pathologyId: pathologies.find((d) => d.name === values.diagnosis)?.id!,
      });
      toast.success('Diagnosis added successfully');
      toggle();
    } catch (error) {
      console.log(error);
      toast.error('Error adding diagnosis');
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-between flex-1">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Type of diagnosis</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-between items-center"
                  >
                    <FormItem className="flex  items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="ALLERGY" />
                      </FormControl>
                      <FormLabel className="font-normal">Allergy</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="DISEASE" />
                      </FormControl>
                      <FormLabel className="font-normal">Disease</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="CHRONIC_DISEASE" />
                      </FormControl>
                      <FormLabel className="font-normal">Chronic</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Combobox
            onChange={(v) => {
              const value = v as string;
              const symptom = symptoms?.find((s) => s.name == value);
              if (!symptom) return;
              setSelectedSymptoms((current) =>
                current.includes(symptom.name) ? current.filter((s) => s !== symptom.name) : [...current, symptom.name],
              );
            }}
            options={(symptoms || []).map(transformOption)}
            placeholder="Related present symptoms"
          />
          <div className="flex items-center gap-2 flex-wrap my-3">
            {selectedSymptoms.map((symptom, index) => (
              <Button
                key={index}
                className="rounded-full h-8 px-3 bg-secondary hover:bg-secondary font-normal text-[#878787] flex justify-start group "
                onClick={() => setSelectedSymptoms((current) => current.filter((s) => s !== symptom))}
              >
                <X className="scale-0 group-hover:scale-100 transition-all w-0 group-hover:w-4" />
                <span>{symptom}</span>
              </Button>
            ))}
          </div>
          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Diagnosis</FormLabel>
                <FormControl>
                  <Combobox
                    onChange={(v) => {
                      field.onChange({ target: { value: v } });
                    }}
                    options={pathologies.map(transformOption)}
                    placeholder="Diagnosis"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Additional Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} className=""></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-3">
          <Button onClick={toggle} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting} className="flex-1">
            {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Diagnosis'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DiagnosisForm;
