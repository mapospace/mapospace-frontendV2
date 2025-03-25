import { API_ENDPOINTS } from '@/utils/api-endpoints';
import AuthServices from '@/utils/axios-api';
import React, { useState, useEffect, useRef } from 'react';
import { FaComments } from 'react-icons/fa';

const ChatBot = ({ conversationId }) => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef(null);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;
        setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
        setUserInput('');
        setIsLoading(true);

        const authService = new AuthServices();
        try {
            const response = await authService.postApiCallHandler(API_ENDPOINTS.AI.ChatWithEventData, {
                conversationId: conversationId,
                userMessage: userInput
            });

            if (response?.error) {
                setMessages(prev => [...prev, { text: 'Error: ' + response.message, sender: 'bot' }]);
            } else {
                setMessages(prev => [...prev, { text: response.data.response, sender: 'bot' }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { text: 'Error: Unable to fetch data.', sender: 'bot' }]);
        }

        setIsLoading(false);
    };

    const handleClickOutside = (event) => {
        if (chatRef.current && !chatRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div
                className='chatbot-icon fixed right-5 bottom-5 bg-gradient-to-b from-secondary-900 to-purple-600 rounded-full py-m px-xl shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-b hover:from-secondary-900 hover:to-purple-700 z-50 flex items-center gap-l'
                onClick={() => setIsVisible(!isVisible)}
            >
                <FaComments size={28} className='text-white' />
                <span className='text-f-xl font-bold text-white'>Lumo Chats</span>
            </div>

            {isVisible && (
                <div
                    ref={chatRef}
                    className='chatbot fixed right-5 bottom-20 w-96 max-h-[75vh] bg-white/70 backdrop-blur-xl shadow-2xl border border-neutral-300 rounded-2xl p-4 flex flex-col'
                >
                    <div className='font-medium text-sm text-gray-600 mb-2'>Lumo Assistant</div>

                    <div className='messages flex-1 overflow-y-auto mb-3 space-y-2 pr-1'>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`max-w-[80%] px-4 py-2 text-sm rounded-xl ${msg.sender === 'user'
                                    ? 'ml-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {isLoading && (
                            <div className='text-xs text-gray-500 italic'>Analyzing data, please wait…</div>
                        )}
                    </div>

                    <div className='flex gap-2'>
                        <input
                            type='text'
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder='Type your message…'
                            className='flex-1 px-4 py-2 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm'
                        />
                        <button
                            onClick={handleSendMessage}
                            className='bg-secondary-900 hover:bg-secondary-1000 text-white text-sm px-4 py-2 rounded-full transition'
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
