import React from "react";
import {
  FiRepeat,
  FiAlertCircle,
  FiSmile,
  FiBook,
  FiClock,
  FiHeart,
  FiFrown,
  FiActivity,
  FiThumbsUp,
  TfiTimer,
  FiRefreshCcw,
  FiUserCheck,
} from "react-icons/fi";
import { BiSolidLike } from "react-icons";

export const data = [
  {
    title: "Symptoms and Behaviors",
    metrics: [
      ["Repetitive Speech", "7", FiRepeat],
      ["Disorientation", "20", FiAlertCircle],
      ["Changes In Mood", "3", FiRefreshCcw],
    ],
  },
  {
    title: "Cognitive Assessment",
    metrics: [
      ["Comprehension", "15", FiBook],
      ["Memory", "90%", FiUserCheck],
      ["Response Time", "2.38 sec", FiClock],
    ],
  },
  {
    title: "Emotional and Psychological State",
    metrics: [
      ["Depression", "27%", FiFrown],
      ["Overall Mood", "85%", FiSmile],
      ["Engagement", "45%", FiThumbsUp],
    ],
  },
];
