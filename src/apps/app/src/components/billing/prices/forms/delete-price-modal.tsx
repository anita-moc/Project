'use client';
import { removePrice } from '@/src/actions/doctor/remove-price';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@helsa/ui/components/alert-dialog';
import { Button } from '@helsa/ui/components/button';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DeletePriceModal = ({
  isOpen,
  setOpen,
  id,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}) => {
  const router = useRouter();
  const deletePrice = useAction(removePrice, {
    onSuccess: () => {
      toast.success('Rate eliminated');
      router.refresh();
      setOpen(false);
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove the rate?</AlertDialogTitle>
          <AlertDialogDescription>
            When you delete a rate, all products related to this rate will be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={() => {
              deletePrice.execute({ id });
            }}
            disabled={deletePrice.status === 'executing'}
            className=""
            type="submit"
          >
            {deletePrice.status === 'executing' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePriceModal;
