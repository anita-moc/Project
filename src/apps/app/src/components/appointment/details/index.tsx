import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { CopyInput } from '@helsa/ui/components/internal/copy-input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@helsa/ui/components/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Clock,
  Download,
  ExternalLink,
  Loader2,
  MapPin,
  Paperclip,
  Shapes,
  Stethoscope,
  StickyNote,
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { DocumentsContent } from '../call/details/documents';
import { NotesContent } from '../call/details/notes';
import { StateColumn } from '../table/columns';
import Cancel from './actions/cancel';
import Confirm from './actions/confirm';
import Enter from './actions/enter';
import Pay from './actions/pay';
import ReSchedule from './actions/re-schedule';
import History from './history';
import Indications from './indications';

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  data?: Primitives<Appointment>;
};

const AppointmentDetailsSheet = ({ data, isOpen, setOpen }: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl">
          <SheetHeader className="flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row justify-start items-center gap-4">
              <Avatar className="bg-secondary">
                <AvatarImage className="object-contain" src={data?.doctor?.user?.image} />
                <AvatarFallback>{data?.doctor?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-xl flex justify-start items-center">
                  {data?.doctor?.user?.name}{' '}
                  <Link href={`/book?id=${data?.doctor?.id}`} target="_blank">
                    <ExternalLink className="size-4 ml-3" />
                  </Link>{' '}
                </SheetTitle>
                <p className="text-xs text-muted-foreground">
                  {format(data?.date ?? new Date(), 'PPPp', { locale: es })}
                </p>
              </div>
            </div>
            <StateColumn state={data?.status ?? 'SCHEDULED'} />
          </SheetHeader>
          <div className="flex justify-start w-full items-center gap-3 border-b  pb-5 mt-7">
            {data?.status !== 'CANCELLED' && (
              <>
                <ReSchedule status={data?.status ?? ''} />
                <Confirm status={data?.status ?? ''} />
                <Enter id={data?.id ?? ''} status={data?.status ?? ''} />
                <Pay id={data?.id ?? ''} status={data?.status ?? ''} />
                <Cancel status={data?.status ?? ''} />
              </>
            )}
          </div>

          <Tabs defaultValue="general">
            <TabsList className="flex justify-start items-center gap-1 bg-transparent ">
              <TabsTrigger className="data-[state=active]:bg-secondary " value="general">
                General
              </TabsTrigger>
              <TabsTrigger className="data-[state=active]:bg-secondary " value="indications">
                Indications
              </TabsTrigger>
              <TabsTrigger className="data-[state=active]:bg-secondary " value="history">
                Records
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="space-y-3 px-1 border-b py-3">
                <p className="text-sm text-muted-foreground">{data?.motive ?? ''}</p>
                <div className="flex justify-start items-center gap-2">
                  {data?.symptoms?.map((symptom) => (
                    <Badge key={symptom.id} variant={'outline'}>
                      {symptom.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-3 px-1 border-b py-3">
                <div className="flex justify-between items-center gap">
                  <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                    <Shapes className="size-4" />
                    Query type
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <div className="size-3 rounded-lg" style={{ backgroundColor: data?.type?.color }}></div>
                    <span className="">{data?.type?.name}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center gap">
                  <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                    <Clock className="size-4" />
                    Hour
                  </div>
                  <span className="">{format(data?.date ?? new Date(), 'p')}</span>
                </div>
                <div className="flex justify-between items-center gap">
                  <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                    <Stethoscope className="size-4" />
                    Specialty
                  </div>
                  <span className="">{data?.specialty?.name}</span>
                </div>
                <CopyInput value={`https://helsa.com/appointments/appointments/${data?.id}`} />
                <Link href={'https://maps.google.com'} target="_blank" className="w-full">
                  <Button className="h-9 w-full mt-3 gap-2" variant={'outline'}>
                   Nairobi,Kasarani Mwiki Town opposite ACK Church
                    <MapPin className="size-4" />
                  </Button>
                </Link>
              </div>
              <Accordion type="multiple" defaultValue={['attachments', 'notes']} className="w-full px-1">
                <AccordionItem value="attachments">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-start items-center gap-2">
                      Files and attachments <Paperclip className="size-4" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-3">
                    <DocumentsContent data={data!} documents={data?.documents ?? []} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="notes">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-start items-center gap-2">
                      Notes <StickyNote className="size-4" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-3">
                    <NotesContent data={data!} notes={data?.notes ?? []} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="indications">
              <Button className="gap-2" variant={'secondary'}>
                <Download className="" />
                Download Receipt
              </Button>
              <Suspense
                fallback={
                  <div className="flex w-full h-full items-center justify-center">
                    <Loader2 className="size-10 animate-spin" />
                  </div>
                }
              >
                <Indications data={data!} />
              </Suspense>
            </TabsContent>
            <TabsContent value="history">
              <History />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppointmentDetailsSheet;
