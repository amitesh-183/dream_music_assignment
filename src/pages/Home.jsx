import React, { useEffect, useState } from "react";
import List from "../components/common/list";
import MusicPlayer from "../components/common/MusicPlayer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { Howl } from "howler";

const popularPlaylist = [
  {
    musicId: 1,
    title: "Billie Jean",
    imageUrl: "./assets/svg/1.svg",
    plays: "1.040.811.084",
    duration: "4:53",
    album: "Thriller 25 Sup...",
    active: false,
    audioUrl: "./assets/audio/Billie_Jean.mp3",
  },
  {
    musicId: 2,
    title: "Beat It",
    imageUrl: "./assets/svg/1.svg",
    plays: "643.786.045",
    duration: "4:18",
    album: "Thriller 25 Sup...",
    active: false,
    audioUrl: "./assets/audio/Beat_It.mp3",
  },
  {
    musicId: 3,
    title: "Smooth Criminal - 2012 Rema...",
    imageUrl: "./assets/svg/3.svg",
    plays: "407.234.004",
    duration: "4:17",
    album: "Thriller 25 Sup...",
    active: false,
    audioUrl: "./assets/audio/SmoothCriminal.mp3",
  },
  {
    musicId: 4,
    title: "Don't Stop 'Til You Get Enough",
    imageUrl: "./assets/svg/4.svg",
    plays: "316.391.952",
    duration: "6:05",
    album: "Bad 25th Anni...",
    active: false,
    audioUrl: "./assets/audio/dontStoptilYouGetEnough.mp3",
  },
  {
    musicId: 5,
    title: "Rock with You - Single Version",
    imageUrl: "./assets/svg/4.svg",
    plays: "268.187.218",
    duration: "3:40",
    album: "Off the Wall",
    active: false,
    audioUrl: "./assets/audio/Rock_With_You.mp3",
  },
];

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [playlist, setPlaylist] = useState(popularPlaylist);
  const [currentTrack, setCurrentTrack] = useState(popularPlaylist[1]);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const shufflePlaylist = () => {
    if (isShuffled) {
      setPlaylist([...popularPlaylist]);
    } else {
      const shuffledList = [...playlist]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setPlaylist(shuffledList);
    }
    setIsShuffled(!isShuffled);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPlaylist((items) => {
      const oldIndex = items.findIndex((item) => item.musicId === active.id);
      const newIndex = items.findIndex((item) => item.musicId === over.id);

      const newItems = [...items];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);
      return newItems;
    });
  };

  useEffect(() => {
    const defaultTrack = popularPlaylist[1]; // Second track
    setPlaylist((prevPlaylist) =>
      prevPlaylist.map((item) => ({
        ...item,
        active: item.musicId === defaultTrack.musicId,
      }))
    );

    const initialSound = new Howl({
      src: [defaultTrack.audioUrl],
      html5: true,
      loop: isLooped,
      autoplay: false,
      onload: () => {
        setSound(initialSound);
      },
      onplay: () => {
        setIsPlaying(true);
        setShowMusicPlayer(true);
      },
      onpause: () => setIsPlaying(false),
      onend: () => {
        if (!isLooped) {
          handleTrackEnd();
        }
      },
    });
  }, []);

  const playTrack = (track) => {
    if (sound) {
      sound.stop();
      sound.unload();
    }

    const newSound = new Howl({
      src: [track.audioUrl],
      html5: true,
      loop: isLooped,
      autoplay: true,
      onload: () => {
        setCurrentTrack(track);
        setPlaylist((prevPlaylist) =>
          prevPlaylist.map((item) => ({
            ...item,
            active: item.musicId === track.musicId,
          }))
        );
      },
      onplay: () => {
        setIsPlaying(true);
        setShowMusicPlayer(true);
      },
      onpause: () => setIsPlaying(false),
      onend: () => {
        if (!isLooped) {
          handleTrackEnd();
        }
      },
    });

    setSound(newSound);
  };

  const handleTrackEnd = () => {
    const currentIndex = playlist.findIndex(
      (track) => track.musicId === currentTrack.musicId
    );
    const nextTrack = isShuffled
      ? playlist[Math.floor(Math.random() * playlist.length)]
      : playlist[currentIndex + 1] || playlist[0];

    if (nextTrack) playTrack(nextTrack);
  };

  return (
    <>
      <div className="flex w-full">
        {/* Sidebar */}
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          setIsSidebarVisible={setIsSidebarVisible}
        />
        {/* Main Section */}
        <main className="bg-gradient-to-b from-[#4C0000] to-black h-screen max-w-8xl mx-auto md:w-full w-full">
          <Header
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
          />
          <div className="h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden">
            {/* Hero section */}
            <section className="relative hero-container md:px-20 px-4 mt-6">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="hero-sec mt-20 relative bg-[url('/assets/svg/Background.svg')] bg-contain bg-no-repeat">
                  {/* <img
                    src="./assets/svg/Background.svg"
                    alt="hero-bg"
                    className="w-[100%] object-cover scale-[1.6]"
                  /> */}
                  <img
                    src="./assets/svg/Michael.svg"
                    alt="Michael-poster"
                    className="absolute top-0 right-0 -translate-y-[70px] micheal"
                  />
                  <div className="absolute xl:top-14 lg:top-10 sm:top-10 top-8 md:left-12 left-4 w-full">
                    <div className="flex items-center gap-2">
                      <img
                        src="./assets/svg/verify.svg"
                        alt="verify-icon"
                        className="md:w-auto md:h-auto w-4 h-4"
                      />
                      <span className="md:text-sm text-xs">
                        Verified Artist
                      </span>
                    </div>
                    <h1 className="pt-2 font-bold md:text-4xl sm:text-xl text-base">
                      Michael Jackson
                    </h1>
                    <p className="md:py-6 py-2 md:text-base sm:text-sm text-xs">
                      27.852.501 monthly listeners
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* Popular playlist */}
            <section>
              <div className="flex justify-between md:px-20 px-4 pb-4">
                <h4 className="font-bold text-xl">Popular</h4>
                <p className="text-sm">See All</p>
              </div>
              <div className="relative">
                <div className="flex w-full md:px-20 px-4 py-3 text-base">
                  <div className="uppercase w-[4%] pl-2">#</div>
                  <div className="uppercase md:w-[46%] w-[91%] pl-20">
                    Title
                  </div>
                  <div className="uppercase w-[20%] md:block hidden">
                    Playing
                  </div>
                  <div className="uppercase w-[5%] flex md:justify-start justify-end">
                    Time
                  </div>
                  <div className="uppercase w-[25%] md:flex justify-end hidden">
                    Album
                  </div>
                </div>
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={playlist.map((item) => item.musicId)}
                    strategy={verticalListSortingStrategy}
                  >
                    {playlist.map((track) => (
                      <List
                        key={track.musicId}
                        track={track}
                        onPlay={() => playTrack(track)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </section>
          </div>
        </main>
        {/* Music Player */}
        <section className="lg:bg-gradient-to-b from-[#2b0e0e] to-black md:h-screen lg:w-[20%] lg:static absolute bottom-0 right-0 flex justify-center items-end px-10">
          <MusicPlayer
            track={currentTrack}
            sound={sound}
            isPlaying={isPlaying}
            isShuffled={isShuffled}
            isLooped={isLooped}
            onPlay={() => sound?.play()}
            onPause={() => sound?.pause()}
            onNext={() => {
              const currentIndex = playlist.findIndex(
                (track) => track.musicId === currentTrack.musicId
              );
              const nextTrack = isShuffled
                ? playlist[Math.floor(Math.random() * playlist.length)]
                : playlist[currentIndex + 1];
              if (nextTrack) playTrack(nextTrack);
            }}
            onPrevious={() => {
              const currentIndex = playlist.findIndex(
                (track) => track.musicId === currentTrack.musicId
              );
              const prevTrack = playlist[currentIndex - 1];
              if (prevTrack) playTrack(prevTrack);
            }}
            onShuffle={shufflePlaylist}
            onLoop={() => {
              setIsLooped(!isLooped);
              if (sound) {
                sound.loop(!isLooped);
              }
            }}
          />
        </section>
      </div>
    </>
  );
};

export default Home;
