import { PlayerContext } from "@/src/contexts/PlayerContext";
import { useContext, useEffect, useRef, useState } from "react";

export default function Player() {
  const { play, setPlay } = useContext(PlayerContext);
  const [isPlaying, setPlaying] = useState(play.song != null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const audioUrl = play?.inPlay ?? "";

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setPlaying(false);
    } else {
      if (audio.src !== audioUrl) {
        audio.src = audioUrl;
        audio.load();
      }
      audio.play().catch(error => {
        console.error('Playback failed:', error);
      });
      setPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changeSong = (direction: string) => {
    const currentSongIndex = play.songs.findIndex(
      (song) => song.url === play.inPlay
    );
  
    let nextSongIndex;
    if (direction === "+") {
      nextSongIndex = currentSongIndex + 1;
    } else if (direction === "-") {
      nextSongIndex = currentSongIndex - 1;
    }
    if (nextSongIndex >= 0 && nextSongIndex < play.songs.length) {
      const nextSong = play.songs[nextSongIndex];
      setPlay({
        inPlay: nextSong.url,
        song: nextSong,
        songs: play.songs,
      });
      setCurrentTime(0);
      togglePlay();
    }
  };
  

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", changeSong);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", changeSong);
    };
  }, [play.inPlay]);

  useEffect(() => {
    if (play.inPlay !== null) {
      togglePlay();
    }
  }, [play.inPlay]);

  return (
    <>
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
                onClick={() => changeSong("-")}
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
                onClick={()=>changeSong("+")}
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
              onClick={() => setPlay({ inPlay: "", song: null, songs: null })}
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
    </>
  );
}
