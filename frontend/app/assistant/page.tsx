"use client";

import { useState, useEffect, useRef } from "react";

import api from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    SendHorizontal,
    Trash2,
    Bot,
    User,
} from "lucide-react";

interface ChatMessage {
    sender: "user" | "bot";
    text: string;
}

export default function AssistantPage() {

    const [messages, setMessages] = useState<ChatMessage[]>(([
        {
            sender: "bot",
            text: "Hello! I'm CrimeGPT 👋\n\nAsk me anything about Karnataka crime intelligence.",
        },
    ]));

    const [message, setMessage] = useState("");

    const [typing, setTyping] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, typing]);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = message;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage,
            },
        ]);

        setMessage("");

        setTyping(true);

        try {

            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            const response = await api.post("/assistant/chat", {
                message: userMessage,
            });

            setTyping(false);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: response.data.reply,
                },
            ]);

            inputRef.current?.focus();

        } catch (error) {

            console.error(error);

            setTyping(false);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Unable to connect to backend.",
                },
            ]);
        }
    };

    const clearChat = () => {

        setMessages([
            {
                sender: "bot",
                text: "Hello! I'm CrimeGPT 👋\n\nAsk me anything about Karnataka crime intelligence.",
            },
        ]);
    };

    return (

        <DashboardLayout>

            <div className="bg-white rounded-xl shadow border h-[80vh] flex flex-col">

                {/* Header */}

                <div className="border-b px-6 py-5 flex items-center justify-between">

                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">

                            CrimeGPT Assistant

                        </h1>

                        <p className="text-gray-500 mt-1">

                            AI powered Karnataka Crime Intelligence Assistant

                        </p>

                    </div>

                    <Button
                        variant="outline"
                        onClick={clearChat}
                    >

                        <Trash2 className="w-4 h-4 mr-2" />

                        Clear Chat

                    </Button>

                </div>

                {/* Suggested Questions */}

                <div className="px-6 py-4 border-b">

                    <div className="flex flex-wrap gap-3">

                        <Button
                            variant="outline"
                            className="bg-white text-gray-900 hover:bg-blue-600 hover:text-white border-gray-300"
                            onClick={() => setMessage("Highest crime district")}
                        >
                            Highest Crime District
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setMessage("Cyber crime statistics")
                            }
                        >
                            Cyber Crime
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setMessage("Today's FIR summary")
                            }
                        >
                            Today's FIRs
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setMessage("Crime hotspots")
                            }
                        >
                            Hotspots
                        </Button>

                    </div>

                </div>

                {/* Chat Area */}

                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`flex items-end gap-3 ${msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >

                            {msg.sender === "bot" && (

                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">

                                    <Bot size={22} />

                                </div>

                            )}

                            <div
                                className={`max-w-[70%] rounded-2xl px-5 py-4 shadow ${msg.sender === "user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border border-gray-200 text-gray-900"
                                    }`}
                            >

                                <p className="whitespace-pre-line leading-7">
                                    {msg.text}
                                </p>
                            </div>

                            {msg.sender === "user" && (

                                <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center shadow">

                                    <User size={20} />

                                </div>

                            )}

                        </div>

                    ))}

                    {typing && (

                        <div className="flex items-end gap-3">

                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">

                                <Bot size={22} />

                            </div>

                            <div className="bg-gray-100 rounded-2xl px-5 py-4 shadow">

                                <div className="flex gap-2">

                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>

                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:150ms]"></div>

                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:300ms]"></div>

                                </div>

                            </div>

                        </div>

                    )}

                    <div ref={bottomRef}></div>

                </div>

                {/* Input */}

                <div className="border-t bg-white p-5">

                    <div className="flex gap-3">

                        <Input
                            ref={inputRef}
                            className="flex-1 bg-white text-black placeholder:text-gray-400"
                            placeholder="Ask CrimeGPT..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />

                        <Button
                            onClick={sendMessage}
                            className="px-5"
                        >

                            <SendHorizontal size={20} />

                        </Button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );
}