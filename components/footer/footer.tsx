import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "@/src/contexts/PlayerContext";
import { backendurl } from "@/src/constants/contants";
import { Simulate } from "react-dom/test-utils";
import { log } from "console";
import { getStorage, ref } from "firebase/storage";

export default function Footer() {
  const { play, setPlay } = useContext(PlayerContext);
  const [isPlaying, setPlaying] = useState(play.song != null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(
    typeof window !== "undefined" ? new window.Audio() : null
  );
  const audioUrl = play?.inPlay ?? "";

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
      setPlaying(false);
    } else if (audio) {
      audio.src = audioUrl;
      if (currentTime > 0) {
        audio.currentTime = currentTime;
      }
      audio.addEventListener("loadedmetadata", () => {
        if (!isNaN(audio.duration)) {
          audio.play();
          setPlaying(true);
        }
      });
    }
  };
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime ?? 0);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.current?.duration ?? 0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("durationchange", handleDurationChange);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("durationchange", handleDurationChange);
      };
    }
  }, []);
  useEffect(() => {
    if (play.inPlay !== null) {
      togglePlay();
    }
  }, [play.inPlay]);
  return (
    <>
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow flex flex-col item dark:bg-gray-800 dark:border-gray-600">
        {play.song != null ? (
          <div className="w-full mt-5">
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-xl text-red-500 mb-1">{play?.song?.title}</h1>
              <h1 className="text-l text-red-500">
                {play?.song?.album?.albumName}
              </h1>
              <div className="flex gap-2">
                <button
                  className="hover:scale-110 z-30 text-white transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                  onClick={() => {}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                  </svg>
                </button>
                <button
                  className="hover:scale-110 z-30 text-white transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                  onClick={togglePlay}
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
                <button
                  className="hover:scale-110 z-30 text-white transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                  onClick={() => {}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                </button>
              </div>
              <button
                className="hover:scale-110 z-30 text-white transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                onClick={() => setPlay({ inPlay: "", song: null })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-stop-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5" />
                </svg>
              </button>
            </div>
            <div className="mt-6 bg-gray-200 h-2 rounded-full relative">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSliderChange}
                className="absolute w-full h-2 cursor-pointer appearance-none player"
              />
              <div
                className="h-2 rounded-full bg-red-500"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="md:flex md:items-center md:justify-between md:p-6">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023
            <a href="/" className="hover:underline">
              SoCloud™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
