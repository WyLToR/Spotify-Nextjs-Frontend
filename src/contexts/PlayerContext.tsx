import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type PlayerContextType = {
  play: {
    inPlay: any;
    song: SongResponse;
  };
  setPlay?: Dispatch<
    SetStateAction<{ inPlay: string | null; song: SongResponse } | null>
  >;
};

export const PlayerContext = createContext<PlayerContextType | null>({
  play: {
    inPlay: "",
    song: {
      id: "",
      albumId: "",
      title: "",
      songPath: "",
      album: '',
    },
  },
  setPlay: undefined,
});

type PlayerProviderProps = {
  children: ReactNode;
};

export default function PlayerProvider({ children }: PlayerProviderProps) {
  const isClient = typeof window !== "undefined";
  const [play, setPlay] = useState<{ inPlay: any; song: SongResponse } | null>({
    inPlay: null,
    song: null,
  });

  return (
    <PlayerContext.Provider value={{ play, setPlay }}>
      {children}
    </PlayerContext.Provider>
  );
}
