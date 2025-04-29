import { getDocuments } from '@/src/actions/appointment/get-documents';
import { getNotes } from '@/src/actions/appointment/get-notes';
import { getPathologies } from '@/src/actions/diagnostic/get-pathologies';
import { getPatientDiagnoses } from '@/src/actions/diagnostic/get-patient-diagnoses';
import { getPatientTreatments } from '@/src/actions/treatment/get-patient-treatments';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { TreatmentStatusValues } from '@helsa/engine/treatment/domain/treatment-status';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetTrigger } from '@helsa/ui/components/sheet';
import { cn } from '@helsa/ui/lib/utils';
import { Ellipsis, Paperclip, Pill, ReceiptText, Stethoscope, StickyNote } from 'lucide-react';
import { DocumentsContent } from './documents';
import { HeaderDoctor, HeaderPatient } from './headers';
import { NotesContent } from './notes';

const typesDiagnosis = {
  ALLERGY: 'Allergy',
  DISEASE: 'Disease',
  CHRONIC_DISEASE: 'Chronic Disease',
  SYMPTOM: 'Symptoms',
};

const typesTreatments = {
  MEDICATION: 'Medication',
  THERAPY: 'Therapy',
  PROCEDURE: 'Procedure',
};

const DetailsSheet = async ({ data, user }: { data: Primitives<Appointment>; user: any }) => {
  const [responseDocuments, responseNotes, responseDiagnoses, responseTreatments, responsePathologies] =
    await Promise.all([
      getDocuments({ appointmentId: data.id }),
      getNotes({ appointmentId: data.id }),
      getPatientDiagnoses({ patientId: data.patientId }),
      getPatientTreatments({ patientId: data.patientId }),
      getPathologies(),
    ]);
  const documents = responseDocuments?.data ?? [];
  const notes = responseNotes?.data ?? [];
  const diagnoses = responseDiagnoses?.data ?? [];
  const pathologies = responsePathologies?.data ?? [];
  const treatments = responseTreatments?.data ?? [];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Details
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 rounded-xl">
          {user.role === 'DOCTOR' && <HeaderDoctor data={data} />}
          {user.role === 'PATIENT' && <HeaderPatient data={data} />}

          <div className="space-y-3 px-1 py-3">
            <p className="text-lg ">Details</p>
            <p className="text-sm text-muted-foreground">{data?.motive ?? ''}</p>
          </div>
          <div className="space-y-3 px-1 py-3">
            <p className="text-lg ">Symptoms</p>
            <div className="flex justify-start items-center gap-2">
              {data?.symptoms?.map((symptom) => (
                <Badge key={symptom.id} variant={'outline'}>
                  {symptom.name}
                </Badge>
              ))}
            </div>
          </div>
          <Accordion type="multiple" defaultValue={['attachments']} className="w-full px-1">
            <AccordionItem value="attachments">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Files and Attachments <Paperclip className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <DocumentsContent data={data} documents={documents} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notes">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Notes <StickyNote className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <NotesContent data={data} notes={notes} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="diagnoses">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Patient Diagnoses <Stethoscope className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                {diagnoses?.map((diagnosis, index) => (
                  <div
                    key={`${diagnosis.id}-${index}`}
                    className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">I70.173</div>
                      <Ellipsis className="size-4" />
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-sm">{pathologies.find((c) => c.id === diagnosis.pathologyId)?.name!}</p>
                      <Badge className="" variant={'default'}>
                        {typesDiagnosis[diagnosis.type]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="treatments">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Patient Treatments <Pill className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                {treatments?.map((treatment, index) => (
                  <div
                    key={`${treatment.id}-${index}`}
                    className="flex flex-col items-start justify-between p-3 gap-2 border rounded-lg"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-start items-center gap-2">
                        <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">
                          {typesTreatments[treatment.type]}
                        </div>
                        <div
                          className={cn('text-xs py-1 px-2 rounded-sm', {
                            'bg-green-600': treatment.status === TreatmentStatusValues.IN_PROGRESS,
                            'bg-blue-600': treatment.status === TreatmentStatusValues.COMPLETED,
                          })}
                        >
                          {treatment.type === 'MEDICATION' && treatment.medication?.name}
                          {treatment.type === 'THERAPY' && treatment.therapy?.description}
                          {treatment.type === 'PROCEDURE' && treatment.procedure?.description}
                        </div>
                        <div>
                          <span className="text-sm font-bold">
                            {new Date(treatment.endDate).toLocaleDateString()}
                            {treatment.type !== 'PROCEDURE' &&
                              ' - ' + new Date(treatment.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Ellipsis className="size-4" />
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailsSheet;
