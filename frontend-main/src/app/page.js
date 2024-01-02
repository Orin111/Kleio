"use client";
import React, { useState, useEffect } from "react";
import { Report } from "@/app/pages/Report/Report";
import { ChatWrapper } from "@/app/pages/Chat/ChatWrapper";
import DropdownButton from "./components/Dropdown";

export const Pages = {
  Chat: "Chat",
  Report: "Report",
};

export default function Home() {
  const [page, setPage] = useState(Pages.Chat);

  useEffect(() => {
    document.title = 'Kleio';
  }, []);

  const changePage = (nextPage) => {
    setPage(nextPage);
  };

  return (
    <main className="flex min-h-full bg-gradient-to-b from-purple-50 to-blue-50 flex-col justify-center items-center overflow-hidden">
      <div className="flex relative h-screen flex-col justify-between items-center px-1 py-2 w-[700px] bg-violet-100">
        <DropdownButton pages={Pages} handleClick={changePage} />
        {page === Pages.Chat && <ChatWrapper />}
        {page === Pages.Report && <Report />}
      </div>
    </main>
  );
}
