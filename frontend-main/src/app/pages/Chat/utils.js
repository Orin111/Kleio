import { useRef, useEffect } from "react";
export const INITIAL_MESSAGES_STATE = [
  {
    sender: 0,
    text: "Hi ,John. How can I help?",
  },
];

export const LABELS = {
  PostStatement: "PostStatement",
  PostQuestion: "PostQuestion",
};

export const STATEMENT_RESPONSES = [
  "Got it",
  "Ok",
  "Understood",
  "Noted, I'll remember that.",
  "Absolutely, it's on my mind now.",
  "Got it, I'll make sure to remember.",
  "Understood, I'll keep that in mind.",
  "Sure thing, I won't forget.",
  "Affirmative, it's logged in my memory.",
  "Roger that, I'll retain the information.",
  "I hear you, I'll commit it to memory.",
  "Consider it remembered, thanks for letting me know.",
];

export const isQuestion = (message) => message.slice(-1) === "?";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const stripComma = (text) => {
  if (text.slice(-1) === ",") {
    return text.slice(0, -1);
  }
  return text;
};

export function useChatScroll(dep) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);

  return ref;
}
