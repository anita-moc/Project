'use client';
import { Dialog, DialogContent, DialogTitle } from '@helsa/ui/components/dialog';
import { useHotkeys } from 'react-hotkeys-hook';
import Assistant from '.';
import { useAssistantStore } from '../../store/assistant/assistant-store';
const ModalAssistant = () => {
  const { isOpen, setOpen } = useAssistantStore();
  useHotkeys('ctrl+i', (evt) => {
    evt.preventDefault();
    setOpen();
  });
  return (
    <Dialog open={isOpen} onOpenChange={setOpen as any}>
      <DialogContent className="overflow-hidden sm:rounded-none p-0 max-w-full w-full h-full md:max-w-[60%] md:h-[600px] m-0 select-text focus-visible:outline-none focus-visible:ring-0">
        <DialogTitle className="sr-only">AI Assistant Dialog</DialogTitle>
        <Assistant />
      </DialogContent>
    </Dialog>
  );
};

export default ModalAssistant;
