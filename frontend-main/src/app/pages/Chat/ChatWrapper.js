import React, { useState, useEffect } from "react";
const axios = require("axios");
import _ from "lodash";
import {
  STATEMENT_RESPONSES,
  LABELS,
  sleep,
  isQuestion,
  INITIAL_MESSAGES_STATE,
} from "./utils";
import { Chat } from "@/app/pages/Chat/Chat";

export const ChatWrapper = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES_STATE);

  const updateTempMessage = async () => {
    await sleep(1000);
    const responseText =
      STATEMENT_RESPONSES[
        Math.floor(Math.random() * STATEMENT_RESPONSES.length)
      ];
    const updatedMessages = _.clone(messages);
    updatedMessages.pop();
    setMessages([...updatedMessages, { sender: 0, text: responseText }]);
  };

  useEffect(() => {
    const lastMessage = _.last(messages);
    if (
      lastMessage.sender === 0 &&
      lastMessage.label === LABELS.PostStatement
    ) {
      updateTempMessage();
    }
  }, [_.last(messages)]);

  const onUserStatement = async (statement) => {
    setMessages([
      ...messages,
      { sender: 1, text: statement },
      { sender: 0, text: "...", label: LABELS.PostStatement },
    ]);
    try {
      const response = await axios.post("http://127.0.0.1:5000/", {
        message: statement,
        key: "nir",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onUserQuestion = async (question) => {
    setMessages([
      ...messages,
      { sender: 1, text: question },
      {
        sender: 0,
        text: "...",
        label: LABELS.PostQuestion,
      },
    ]);
    try {
      const response = await axios.get("http://127.0.0.1:5000/", {
        params: { query: question, key: "nir" },
      });
      setMessages([
        ...messages,
        { sender: 1, text: question },
        {
          sender: 0,
          text: response.data.message,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const onNewUserMessage = (text) => {
    if (isQuestion(text)) {
      onUserQuestion(text);
    } else {
      onUserStatement(text);
    }
  };

  return <Chat messages={messages} onNewUserMessage={onNewUserMessage} />;
};
