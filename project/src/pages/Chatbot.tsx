import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getChatbotResponse } from '../api';
import { AIMessage } from '../types';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import { motion } from 'framer-motion';

const Chatbot: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      text: `Hello${user ? ' ' + user.name : ''}! I'm your AI health assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await getChatbotResponse(inputMessage);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      toast.error('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Health Assistant</h1>
        <p className="text-gray-600">Chat with our AI to get quick answers to your health questions</p>
      </div>

      <Card className="shadow-lg h-[600px] flex flex-col">
        <CardHeader className="bg-blue-50 py-4">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Health Assistant</h2>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`rounded-full flex-shrink-0 h-8 w-8 flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-blue-100 ml-2' : 'bg-gray-200 mr-2'
                  }`}>
                    {message.sender === 'user' ? (
                      <UserIcon className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-2xl p-4 ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.text}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${
                      message.sender === 'user' ? 'text-right' : ''
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[75%]">
                  <div className="rounded-full bg-gray-200 flex-shrink-0 h-8 w-8 flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="rounded-2xl p-4 bg-gray-100 text-gray-800">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex items-end gap-2">
            <TextArea
              placeholder="Type your message..."
              className="flex-1 resize-none"
              rows={2}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              type="button"
              onClick={handleSend}
              disabled={isLoading || !inputMessage.trim()}
              variant="primary"
              className="h-10 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is an AI assistant and should not replace professional medical advice. For emergencies, please contact your doctor.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chatbot;