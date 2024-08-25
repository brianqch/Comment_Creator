"use client";
import { useState } from "react";
import Input from "../components/Input";
import Output from "../components/Output";
import Credit from "../components/Credit";

export default function Home() {
  const [comment, setComment] = useState<string>('');
  const [language, setLanguage] = useState<string>('');


  return (
    <main className="flex min-h-screen flex-col items-center p-5 sm:p-24">
      <div className="flex justify-center items-center pb-10 flex-col">
        <h1 className="text-4xl font-mono mb-1">Code Comment Generator</h1>
        <span>A simple tool for effortlessly creating comments for your code.</span>
      </div>
      <Credit />
      <br />
      <section id="input-output" className="flex flex-col w-full gap-10 h-screen">
        <Input comment={comment} setComment={setComment} language={language} setLanguage={setLanguage} />
        <Output comment={comment} language={language} />
      </section>
    </main>
  );
}
