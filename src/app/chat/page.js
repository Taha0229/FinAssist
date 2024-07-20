"use client";

import React, { useEffect, useState, Suspense } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import Message from "../components/Chat/message";
import { Avatar } from "@nextui-org/react";
import Fallback from "../components/Chat/skeleton";

function ChatComponent() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const searchParams = useSearchParams();
  const thread_id = searchParams.get("thread_id") || "thread_H2FpGcqguKPnWEA7ljXM2Wmn"
  const [response, setResponse] = useState([]);
  useEffect(() => {
    // fetching conversation history based on thread id
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchChats?thread_id=${thread_id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const chatHist = await response.json();

        setChatHistory(chatHist.chatHistory);
      } catch (error) {
        // handle error
        console.error("Error fetching chat history:", error);
      }
    };
    fetchData();
  });

  function handleChangeMessage(e) {
    // handle input query
    setMessage(e.target.value);
  }

  async function handleSubmit() {
    // handle submit function

    setMessage("");

    //update the chat history based on the backend for human
    setChatHistory([
      ...chatHistory,
      { value: message, annotations: [], by: "human" },
    ]);

    // send POST data to the backend
    const res = await fetch("/api/chatAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage: message, thread_id }),
    });

    // setup streaming
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let responses = [];

    // completion for after streaming
    let completion = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter(Boolean); // Split by newline and filter out empty strings
      for (const line of lines) {
        const parsed = JSON.parse(line);

        // the API sends thread_id as well as the streaming completion, here we are interested only in the streaming
        if (parsed.text) {
          responses.push(parsed);
          completion += parsed.text.value;
        }

        // update completion
        setResponse([...responses]);
      }
    }

    // update chatting history when streaming is completed
    if (done === true) {
      const data = {
        value: completion,
        annotations: [],
      };
      setResponse([]);
      setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
    }
  }

  return (
    
      <div className="w-dvw border ">
        <div className="flex h-full  justify-center px-40">
          <div
            id="scrollableDiv"
            className={
              "h-full w-[60%] mt-3 flex flex-col relative border border-gray-200 overflow-y-auto p-6"
            }
          >
            <div className="sticky top-0 flex bg-white items-center gap-4 my-4 z-10">
              <p className="font-bold">Active Thread - {thread_id} </p>
            </div>
            <div className="pb-32">
              {chatHistory.map((e, i) => {
                return (
                  <div key={i} className="flex flex-col gap-2 mt-4">
                    {true && <Message message={e.value} by={e?.by} />}
                  </div>
                );
              })}
              {response.length > 0 && (
                <div className="px-4 py-2 text-lg rounded-lg flex flex-col gap-6 bg-slate-100 mt-4">
                  <div>
                    <div className="flex text-lg font-bold gap-4">
                      <Avatar
                        isBordered
                        color="primary"
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                        className="relative"
                      />
                      <p>Bot</p>
                    </div>
                    <div>{response.map((chunk) => chunk.text.value)}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-[56rem] items-center fixed bottom-6 mt-4 justify-between px-[15px]">
              <textarea
                placeholder="Ask FinAssist..."
                name="message"
                onChange={handleChangeMessage}
                value={message}
                className="bg-gray-200 outline-gray-400 outline-1 focus:text-gray-700 w-full  px-8 py-4 max-h-[25dvh] resize-none flex rounded-full"
              />
              <button
                className="ml-3 bg-blue-500 flex items-center justify-center w-10 h-10 text-white py-1 rounded-xl"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
}


export default function Chat(){
  return (
    <Suspense fallback={<Fallback/>}>
      <ChatComponent />
    </Suspense>
  );
}