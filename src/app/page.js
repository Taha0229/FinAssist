"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Start a new thread");

  const initializeThread = async () => {
    setLoading(true);
    setMessage("Initializing...");
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
            console.log("exists");
            threadId = parsed.threadId;
          }
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    }
    console.log(threadId);
    setMessage("Navigating...");
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

export default page;
