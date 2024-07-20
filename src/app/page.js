"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState, Suspense } from "react";

const Home = () => {
  // Landing page which also initializes threads and agents

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Start a new thread");

  const initializeThread = async () => {
    // handle loading state
    setLoading(true);
    setMessage("Initializing...");

    // make a POST request to initialize thread and generate cloud summary
    const res = await fetch("/api/chatAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage: "Trigger Thread initialization" }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let threadId;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.threadId) {
            // in this case we are interested in thread_id rather than the generated completion
            threadId = parsed.threadId;
          }
        } catch (error) { // handle error
          console.error("Failed to parse JSON:", error);
        }
      }
    }
    
    setMessage("Navigating...");
    // redirect to the chatting interface
    
    router.push(`/chat?thread_id=${threadId}`);
  };

  return (
    <section className="h-screen flex items-center justify-center flex-col gap-4">
      <Button color="primary" isLoading={loading} onClick={initializeThread}>
        {message}
      </Button>
      <Button disabled>Select old conversation (soon)</Button>
    </section>
  );
};

export default Home;
