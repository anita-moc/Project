'use client';
import { Button } from '@helsa/ui/components/button';
import { Textarea } from '@helsa/ui/components/textarea';
import { CornerDownLeft, Paperclip } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

const ChatInput = ({
  message,
  setMessage,
  submit,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  submit: VoidFunction;
}) => {
  return (
    <div className="w-full">
      <form
        className="relative rounded-lg border bg-background focus-visible:ring-0 focus-visible:ring-transparent p-1"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Submitted:', message);
        }}
      >
        <Textarea
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          className="min-h-12 resize-none rounded-lg bg-background border-0 border-none focus-visible:ring-transparent p-3 shadow-none focus-visible:ring-0"
          placeholder="Type your message here..."
        />
        <div className="flex items-center p-3 pt-0">
          <Button variant="ghost" size="icon" type="button">
            <Paperclip className="size-4" />
            <span className="sr-only">Attach file</span>
          </Button>

          <Button
            size="sm"
            className="ml-auto gap-1.5"
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            Send message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
