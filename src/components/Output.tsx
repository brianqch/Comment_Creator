'use client';
import React, { useState } from 'react';
import { GoCopy } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import CodeBlock from "../components/CodeBlock";

interface InputProps {
    comment: string;
    language: string;
}

export default function Output({ comment, language }: InputProps) {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(comment)
            .then(() => {
                setCopied(true); 
                setTimeout(() => setCopied(false), 2000); // Reset the state after 2 seconds
            });
    };

    return (
        <div className="flex flex-col rounded-lg w-full max-w-full h-full">
            <div className="flex w-full justify-between bg-zinc-700 text-white px-4 py-2 border-r-2 border-gray-600">
                <span className="w-full font-bold">
                    Code
                </span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 hover:bg-zinc-600 focus:outline-none text-nowrap transition-all"
                >
                    {copied ? <FaCheck/> : <GoCopy />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
            </div>
            <CodeBlock code={comment} language={language}/>
        </div>
    );
}
