import React, { useState, useEffect } from "react";
import CustomSlider from "../CustomSlide";

const MusicPlayer = ({
  track,
  sound,
  isPlaying,
  isShuffled,
  isLooped,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onShuffle,
  onLoop,
}) => {
  const [progress, setProgress] = useState(0);
  const [peekValue, setPeekValue] = useState(null);

  useEffect(() => {
    let progressInterval;
    if (sound && isPlaying) {
      progressInterval = setInterval(() => {
        setProgress((sound.seek() / sound.duration()) * 100);
      }, 100);
    }
    return () => clearInterval(progressInterval);
  }, [sound, isPlaying]);

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * sound.duration();
    sound.seek(seekTime);
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const peekPercent = (x / rect.width) * 100;
    setPeekValue(Math.min(Math.max(peekPercent, 0), 100));
  };

  const handleMouseLeave = () => {
    setPeekValue(null);
  };

  return (
    <>
      {/* mobile layout */}
      <div className="bg-[#6B0000] p-2  text-center w-full fixed left-0 bottom-0 md:hidden block">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2 items-center">
            <img
              src={track?.imageUrl ? track?.imageUrl : "./assets/svg/Pic.svg"}
              alt="poster-img"
              className="w-[60px] h-[60px] max-w-full object-cover object-top"
            />
            <div className="text-start">
              <h2 className="font-bold text-sm">{track?.title}</h2>
              <p className="text-xs">Micheal Jackson</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-center gap-2 py-1">
              <p className="text-xs">
                {sound ? formatTime(sound.seek()) : "0:00"}
              </p>
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full"
              >
                <CustomSlider
                  value={progress}
                  onChange={handleSeek}
                  peekValue={peekValue}
                />
              </div>
              <p className="text-xs">
                {sound ? formatTime(sound.duration()) : "0:00"}
              </p>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <button onClick={onLoop} className="p-0 bg-transparent">
                <img
                  src="./assets/svg/Repeat.svg"
                  alt="Repeat-icon"
                  className="w-4 h-4"
                />
              </button>
              <button onClick={onPrevious} className="p-0 bg-transparent">
                <img
                  src="./assets/svg/Back.svg"
                  alt="back-icon"
                  className="w-5 h-5"
                />
              </button>
              <button
                onClick={isPlaying ? onPause : onPlay}
                className="p-1 bg-[#480000] rounded-md"
              >
                <img
                  src={`./assets/svg/${isPlaying ? "pause" : "Play"}.svg`}
                  alt="Play-icon"
                  className="w-5 h-5"
                />
              </button>
              <button onClick={onNext} className="p-0 bg-transparent">
                <img
                  src="./assets/svg/Next.svg"
                  alt="Next-icon"
                  className="w-5 h-5"
                />
              </button>
              <button onClick={onShuffle} className="p-0 bg-transparent">
                <img
                  src="./assets/svg/Random.svg"
                  alt="Random-icon"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop layout */}
      <div className="bg-[#6B0000] pt-6 pb-4 px-4 rounded-2xl mb-6 text-center min-w-[260px] hidden md:block">
        <h6 className="text-sm hidden lg:block">Now Playing</h6>

        <div className="py-3">
          <img
            src={track?.imageUrl ? track?.imageUrl : "./assets/svg/Pic.svg"}
            alt="poster-img"
            className="w-full h-[120px] max-w-full object-cover object-top"
          />
        </div>
        <h2 className="font-bold text-sm">{track?.title}</h2>
        <p className="text-xs">Micheal Jackson</p>

        <div className="flex items-center justify-center gap-2 py-4">
          <p className="text-xs">{sound ? formatTime(sound.seek()) : "0:00"}</p>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full"
          >
            <CustomSlider
              value={progress}
              onChange={handleSeek}
              peekValue={peekValue}
            />
          </div>
          <p className="text-xs">
            {sound ? formatTime(sound.duration()) : "0:00"}
          </p>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <button onClick={onLoop} className="p-0 bg-transparent">
            <img
              src="./assets/svg/Repeat.svg"
              alt="Repeat-icon"
              className="w-4 h-4"
            />
          </button>
          <button onClick={onPrevious} className="p-0 bg-transparent">
            <img
              src="./assets/svg/Back.svg"
              alt="back-icon"
              className="w-5 h-5"
            />
          </button>
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="p-1 bg-[#480000] rounded-md"
          >
            <img
              src={`./assets/svg/${isPlaying ? "pause" : "Play"}.svg`}
              alt="Play-icon"
              className="w-5 h-5"
            />
          </button>
          <button onClick={onNext} className="p-0 bg-transparent">
            <img
              src="./assets/svg/Next.svg"
              alt="Next-icon"
              className="w-5 h-5"
            />
          </button>
          <button onClick={onShuffle} className="p-0 bg-transparent">
            <img
              src="./assets/svg/Random.svg"
              alt="Random-icon"
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default MusicPlayer;
