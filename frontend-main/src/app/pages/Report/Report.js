import React from "react";
import { data } from "../../data/mockData";
import { ReportCard } from "./ReportCard";
import { GraphsCard } from "@/app/pages/Report/GraphsCard";
import Image from "next/image";
import { motion as m } from "framer-motion";

export const Report = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 }}
      exit={{ opacity: 0, duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col text-center p-4 justify-between max-h-screen">
          <div className="flex flex-row justify-center">
            <Image
              src="logo.svg"
              alt=""
              width={120}
              height={30}
              className="mr-[10px] mt-[2px]"
            />
            <p className="text-4xl font-bold text-neutral-950">REPORT</p>
          </div>
          <div className="flex flex-row justify-center">
            <p className="text-black mt-2 font-mono">May 2023 to June 2023</p>
          </div>
          <div className="overflow-y-auto ">
            <m.div
              initial={{ opacity: 0, y: "10%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                delay: 0.25,
              }}
            >
              <div className="flex flex-col rounded-xl text-center p-2 max-h-48 bg-orange-200 justify-between m-6">
                <div className="flex flex-row justify-evenly align-middle">
                  <div className="flex">
                    <span className="font-bold text-neutral-950 text-lg">
                      Name:
                    </span>
                    <p className="ml-2 text-lg text-neutral-950">John Doe</p>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-neutral-950 text-lg">
                      Age:
                    </span>
                    <p className="ml-2 text-lg text-neutral-950">75</p>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-neutral-950 text-lg">
                      FAST:
                    </span>
                    <p className="ml-2 text-lg text-neutral-950">stage 5</p>
                  </div>
                </div>
                <p className="text-neutral-950 p-4">
                  John, diagnosed with dementia three years ago, experiences
                  progressive cognitive decline and difficulty with daily
                  activities. He receives care from a geriatrician and a
                  specialized dementia team while living with his spouse. John's
                  family notes occasional confusion, forgetfulness, changes in
                  personality, and mood swings.
                </p>
              </div>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: "10%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                delay: 0.35,
              }}
            >
              <GraphsCard />
            </m.div>
            <m.div
              initial={{ opacity: 0, y: "10%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                delay: 0.5,
              }}
            >
              {data.map((item, index) => (
                <ReportCard
                  key={index}
                  title={item.title}
                  metrics={item.metrics}
                ></ReportCard>
              ))}
            </m.div>
          </div>
        </div>
      </div>
    </m.div>
  );
};
