'use client';
import React, { useState } from 'react';
import SearchableDropdown from './SearchableDropdown';

interface InputProps {
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input({ comment, setComment, language, setLanguage }: InputProps) {
    const [code, setCode] = useState<string>(''); // State to store the code input
    const [loading, setLoading] = useState<boolean>(false); // State to manage loading

    const handleSubmit = async () => {

        setLoading(true);
        
        try {
            if (code.trim().length == 0) throw new Error('No code to comment')
            const response = await fetch('/api/generate-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, language }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setComment(data.text);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center bg-zinc-800 w-full max-w-full h-full p-4">
            <div className="mb-4">
                <label htmlFor="language" className="block text-white font-bold mb-2">
                    Language
                </label>
                <SearchableDropdown language={language} setLanguage={setLanguage}/>
            </div>
            <div className="mb-4">
                <label htmlFor="code" className="block text-white font-bold mb-2">
                    Code
                </label>
                <textarea
                    id="code"
                    className="flex-grow bg-zinc-900 text-white border-none p-2 rounded-lg outline-none text-sm w-full resize-none font-mono"
                    placeholder="Enter your code here..."
                    rows={10}
                    spellCheck={false}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Generate Comment'}
            </button>
        </div>
    );
}
