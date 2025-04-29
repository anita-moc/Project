'use client';
import { ScrollArea } from '@helsa/ui/components/scroll-area';
import { Textarea } from '@helsa/ui/components/textarea';
import { useEnterSubmit } from '@helsa/ui/hooks/use-enter-submit';
import { useScrollAnchor } from '@helsa/ui/hooks/use-scroll-anchor';
import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import { ChatEmpty } from './chat-empty';
import { ChatExamples } from './chat-examples';
import { ChatFooter } from './chat-footer';
import { ChatList } from './chat-list';

const Chat = ({ messages, input, setInput, handleSubmit, onNewChat, setChatId, user, showFeedback, chatId }: any) => {
  const ref = useRef(false);
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef?.current?.focus();
    });
  }, [messages]);

  const { messagesRef, scrollRef, visibilityRef, scrollToBottom } = useScrollAnchor();
  const showExamples = messages.length === 0 && !input;

  return (
    <div className="relative">
      <ScrollArea className="md:h-[445px]" ref={scrollRef}>
        <div ref={messagesRef}>
          {messages.length ? (
            <ChatList messages={messages} className="p-4 pb-8" />
          ) : (
            <ChatEmpty firstName={user?.name.split(' ').at(0)} />
          )}
          <div className="w-full h-px" ref={visibilityRef} />
        </div>
      </ScrollArea>
      <div className="fixed bottom-[1px] left-[1px] right-[1px] md:h-[88px] bg-background border-border border-t-[1px]">
        {showExamples && <ChatExamples onSubmit={handleSubmit} setInput={setInput} />}
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const newId = v4();
            if (!chatId) {
              setChatId(newId);
            }
            handleSubmit(e, {
              body: {
                chatId: chatId || newId,
                user,
              },
            });
            scrollToBottom();
          }}
        >
          <Textarea
            tabIndex={0}
            rows={1}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            value={input}
            className="h-12 min-h-12 pt-3 resize-none border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Ask Gonurse aquestion..."
            onKeyDown={onKeyDown}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
          />
        </form>
        <ChatFooter onSubmit={handleSubmit} showFeedback={showFeedback} />
      </div>
    </div>
  );
};

export default Chat;
