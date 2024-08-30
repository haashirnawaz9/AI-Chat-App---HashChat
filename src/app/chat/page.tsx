"use client";
import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/footer';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';

// Define types for message structure
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function Chatbot() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi I am HashBot, how can I help you today?' },
  ]);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    setMessage('');
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' }
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader?.read() || { done: true, value: new Uint8Array() };
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const otherMessages = prevMessages.slice(0, prevMessages.length - 1);
          return [...otherMessages, { ...lastMessage, content: lastMessage.content + text }];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." }
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) sendMessage();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    document.title = "Chat | HashBot AI";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow overflow-y-auto p-4 max-w-6xl mx-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`text-left ${
              message.role === 'user' ? 'bg-gray-200' : 'bg-blue-100'
            } p-4 rounded-lg mb-2`}
          >
            {message.role === 'user' ? 'User: ' : 'HashBot: '}
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <div className="bg-white border-t border-gray-200">
        <div className="flex items-center p-4 max-w-4xl mx-auto mb-20">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask HashBot..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            type="button"
            onClick={sendMessage}
            disabled={isLoading}
            className="ml-3"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
