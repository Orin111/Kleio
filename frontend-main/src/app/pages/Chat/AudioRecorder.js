import React, {useEffect} from "react";
const { Deepgram } = require('@deepgram/sdk');
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { FaMicrophoneAlt } from "react-icons/fa";
import {stripComma} from "@/app/pages/Chat/utils";


const DG_KEY = '4a7d2a11518db4dc02b94d52ae1ae467882b199b';
const deepgram = new Deepgram(DG_KEY)

export const AudioRecorder = ({ onNewUserMessage }) => {
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
  } = useAudioRecorder();

  const transcript = async () => {
    const arrayBuffer = await recordingBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const audioSource = {
      buffer: buffer,
      mimetype: 'audio/mp3',
    };

    deepgram.transcription.preRecorded(
      audioSource,
      {punctuate: true, model: 'nova', language: 'en-US' },
    )
      .then((transcription) => {
        onNewUserMessage(stripComma(transcription.results.channels[0].alternatives[0].transcript));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!recordingBlob) return;
    transcript();
  }, [recordingBlob])

  return (
    <div>
      <div
        onClick={isRecording ? stopRecording : startRecording}
        className="bg-transparent px-4 py-2 rounded-xl cursor-pointer h-10"
        style={{
          backgroundImage: "radial-gradient(circle at -28px 20px, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 40px, #4ade80 40px)",
          marginLeft: "-7px",
          width: 70,
        }}
      >
        <FaMicrophoneAlt className="ml-[13px]" size={20} color={isRecording ? "red" : "white"} />
      </div>
      <div className="flex items-center justify-center">
        <p className="font-mono text-black text-sm" >{isRecording ? "Stop" : "Record"}</p>
      </div>
    </div>
  );
};
