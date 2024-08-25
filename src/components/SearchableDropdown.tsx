'use client';
import React, { useState, useRef, useEffect } from "react";

const languageShortcuts: string[] = [
    "javascript", "js", "python", "py", "java", "cpp", "cs", "html", "css",
    "typescript", "ts", "ruby", "rb", "php", "swift", "go", "rust", "rs",
    "kotlin", "scala", "sql", "shellsession", "bash", "sh", "perl", "r",
    "jsx", "tsx", "json", "xml", "yaml", "yml", "scss", "sass", "less",
    "markdown", "md", "lua", "dart", "elixir", "haskell", "hs", "groovy",
    "graphql", "gql", "dockerfile", "docker", "makefile", "cmake", "asm",
    "clojure", "clj", "coffeescript", "coffee", "fsharp", "f#", "matlab",
    "objectivec", "objc", "pascal", "powershell", "ps1", "vbnet", "verilog",
    "vhdl", "zig"
];

interface InputProps {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchableDropdown({language, setLanguage} : InputProps) {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [filteredShortcuts, setFilteredShortcuts] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (language) {
            const filtered = languageShortcuts.filter((shortcut) =>
                shortcut.toLowerCase().includes(language.toLowerCase())
            );
            setFilteredShortcuts(filtered);
        } else {
            setFilteredShortcuts(languageShortcuts);
        }
    }, [language]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (shortcut: string) => {
        console.log("Selected Shortcut:", shortcut); // Debugging
        setLanguage(shortcut);
        setShowDropdown(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLanguage(e.target.value);
        setShowDropdown(true);
    };

    const handleInputClick = () => {
        setShowDropdown(true);
    };

    return (
        <div className="sm:col-span-4 w-full sm:w-1/3 font-mono">
            <div ref={dropdownRef} className="relative flex flex-col gap-1">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={language}
                        onChange={handleInputChange}
                        placeholder="Search for a language..."
                        className="flex-1 bg-zinc-800 text-gray-300 border-2 border-gray-600 rounded p-3 shadow-sm transition focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        onClick={handleInputClick}
                    />
                    <svg
                        className="z-0 w-5 h-5 ml-2 absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>

                {showDropdown && filteredShortcuts.length > 0 && (
                    <ul className="top-16 absolute z-10 mt-1 w-full bg-gray-800 border border-gray-600 rounded shadow-lg overflow-y-auto max-h-44 text-gray-300">
                        {filteredShortcuts.map((shortcut, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 text-md hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleSelect(shortcut)}
                            >
                                {shortcut}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
