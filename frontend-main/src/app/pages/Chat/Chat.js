import React, { useEffect, useState, useRef } from "react";
import _ from "lodash";
import { AudioRecorder } from "@/app/pages/Chat/AudioRecorder";
import "./Chat.css";
import { motion as m } from "framer-motion";
import { useChatScroll } from "./utils";
import Image from "next/image";

export const Chat = ({ messages, onNewUserMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const ref = useChatScroll(messages);

  const speak = (text) => {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = window.speechSynthesis.getVoices()[145];
    utterThis.pitch = 0.9;
    utterThis.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterThis);
  };

  useEffect(() => {
    const lastMessage = _.last(messages);
    if (lastMessage.sender === 0 && !lastMessage.label) {
      speak(lastMessage.text);
    }
  }, [_.last(messages)]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      exit={{ opacity: 0, duration: 0.5 }}
      className="flex flex-col h-full w-full"
    >
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-row justify-center">
          <Image src="logo.svg" alt="" width={110} height={25} className="mr-[10px] mt-[1px]" />
          <p className="text-4xl font-bold text-neutral-950">CHAT</p>
        </div>

        <div className="flex flex-col h-full bg-stone-50 mx-4 rounded my-3 overflow-y-auto">
          <div ref={ref} className="flex-1 overflow-y-auto px-4 py-6">
            <div className="flex flex-col space-y-2">
              {_.map(messages, ({ sender, text }, index) => {
                if (sender === 0) {
                  return (
                    <m.div
                      key={index}
                      initial={{ opacity: 0, y: "10%" }}
                      animate={{ opacity: 1, y: "0%" }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                      exit={{ opacity: 0, y: "10%" }}
                    >
                      <div className="flex-col">
                        <div className="flex items-center justify-start">
                          <p className="font-mono text-xs	ml-[15px] text-black">
                            Kleio:
                          </p>
                        </div>
                        <div className="flex items-center justify-start">
                          <div className="bg-neutral-300 rounded-lg px-4 py-2 bubble left">
                            <p className="text-sm font-mono text-black">
                              {text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  );
                }
                return (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: "10%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    exit={{ opacity: 0, y: "10%" }}
                  >
                    <div className="flex-col">
                      <div className="flex items-center justify-end">
                        <div>
                          <p className="font-mono text-xs	ml-[15px] text-black">
                            You:
                          </p>
                          <div className="bg-violet-600 text-white rounded-lg px-4 py-2 bubble right">
                            <p className="text-sm font-mono">{text}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="px-4 py-2 border-t flex">
          <form
            className="flex items-center space-x-2 w-11/12 h-10"
            onSubmit={(event) => {
              event.preventDefault();
              onNewUserMessage(inputValue);
              setInputValue("");
            }}
          >
            <input
              type="text"
              className="flex-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-sky-950 bg-stone-50 font-mono"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </form>
          <AudioRecorder onNewUserMessage={onNewUserMessage} />
        </div>
      </div>
    </m.div>
  );
};
