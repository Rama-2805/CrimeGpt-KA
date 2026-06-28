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

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl h-[80vh] flex flex-col overflow-hidden">

                {/* Header */}

                <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-5 flex items-center justify-between bg-white dark:bg-slate-900 transition-colors">

                    <div>

                        <h1 className="text-2xl font-bold text-slate-808 dark:text-slate-100">

                            CrimeGPT Assistant

                        </h1>

                        <p className="text-slate-500 dark:text-slate-400 mt-1">

                            AI powered Karnataka Crime Intelligence Assistant

                        </p>

                    </div>

                    <Button
                        variant="outline"
                        onClick={clearChat}
                        className="border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300 transition"
                    >

                        <Trash2 className="w-4 h-4 mr-2" />

                        Clear Chat

                    </Button>

                </div>

                {/* Suggested Questions */}

                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-955/20">

                    <div className="flex flex-wrap gap-3">

                        <Button
                            variant="outline"
                            className="bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-slate-105 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800 transition"
                            onClick={() => setMessage("Highest crime district")}
                        >
                            Highest Crime District
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-slate-105 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800 transition"
                            onClick={() =>
                                setMessage("Cyber crime statistics")
                            }
                        >
                            Cyber Crime
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-slate-105 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800 transition"
                            onClick={() =>
                                setMessage("Today's FIR summary")
                            }
                        >
                            Today's FIRs
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-slate-105 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800 transition"
                            onClick={() =>
                                setMessage("Crime hotspots")
                            }
                        >
                            Hotspots
                        </Button>

                    </div>

                </div>

                {/* Chat Area */}

                <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/20 dark:bg-slate-955/10">
                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`flex items-end gap-3 ${msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >

                            {msg.sender === "bot" && (

                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-955/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/35 flex items-center justify-center shadow-sm">

                                    <Bot size={22} />

                                </div>

                            )}

                            <div
                                className={`max-w-[70%] rounded-2xl px-5 py-4 shadow-sm ${msg.sender === "user"
                                    ? "bg-blue-600/10 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 text-blue-950 dark:text-slate-100 shadow-[0_0_12px_rgba(59,130,246,0.1)]"
                                    : "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-202"
                                    }`}
                            >

                                <p className="whitespace-pre-line leading-7 text-sm">
                                    {msg.text}
                                </p>
                            </div>

                            {msg.sender === "user" && (

                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-605 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">

                                    <User size={20} />

                                </div>

                            )}

                        </div>

                    ))}

                    {typing && (

                        <div className="flex items-end gap-3">

                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-955/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/35 flex items-center justify-center">

                                <Bot size={22} />

                            </div>

                            <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 shadow">

                                <div className="flex gap-2">

                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>

                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]"></div>

                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]"></div>

                                </div>

                            </div>

                        </div>

                    )}

                    <div ref={bottomRef}></div>

                </div>

                {/* Input */}

                <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-5">

                    <div className="flex gap-3">

                        <Input
                            ref={inputRef}
                            className="flex-1 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-505 focus:border-blue-500"
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
                            className="px-5 bg-blue-600 hover:bg-blue-700 text-white transition font-medium cursor-pointer"
                        >

                            <SendHorizontal size={20} />

                        </Button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );
}