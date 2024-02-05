import { backendurl } from "@/src/constants/contants";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "@/src/contexts/PlayerContext";
import { Simulate } from "react-dom/test-utils";

export default function songDetail(props: any) {
  const { play, setPlay } = useContext(PlayerContext);
  const [isPlaying, setPlaying] = useState(play.song != null);
  const audioUrl = props.song.songPath;
  return (
    <div className="bg-gray-900 shadow-lg rounded p-3">
      <div className="group relative">
        <img
          className="w-full md:w-72 block rounded"
          src="https://placehold.co/600x600"
          alt=""
        />
        <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
          <button
            className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            onClick={() => {
              setPlaying(!isPlaying);
              isPlaying
                ? setPlay({ inPlay: "", song: null })
                : setPlay({ inPlay: audioUrl, song: props.song });
            }}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-pause-fill"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl text-red-500 mb-1">{props?.song?.title}</h1>
        <h1 className="text-l text-red-500">{props?.song?.album?.albumName}</h1>
      </div>
    </div>
  );
}
