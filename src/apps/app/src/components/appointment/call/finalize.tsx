'use client';
import { useFinalizeAppointment } from '@/src/hooks/appointment/use-appointment';
import { Button } from '@helsa/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@helsa/ui/components/dialog';
import { CircleCheck } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

const apiKey = process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY!;

const Finalize = () => {
  const params = useParams();
  const { finalizeAppointment } = useFinalizeAppointment(params.id as string);
  const finalizeCall = useCallback(async () => {
    try {
      const id = params.id as string;
      await finalizeAppointment();
    } catch (error) {
      console.log(error);
      toast.error('Error finalizing appointment');
    }
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="gap-2">
          <CircleCheck />
          End
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>End Call</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-muted-foreground text-sm mt-5">
          You're about to end the call. Once you do, you won't be able to access this consultation again.</p>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" className="bg-emerald-400 text-white hover:text-background" onClick={finalizeCall}>
            End
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Finalize;
