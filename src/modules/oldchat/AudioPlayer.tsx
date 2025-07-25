import React, { useRef, useState, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '../../icons/components';


interface AudioPlayerProps {
    src: string;
    title?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = (props) => {

    const { src,
        title,
        className = '',
        autoPlay = false,
        loop = false,
        onPlay,
        onPause,
        onEnded
    } = props;

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    // const [volume, setVolume] = useState<number>(1); // Volume ranges from 0 to 1
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    // Handle play/pause toggle
    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    // Update progress as the audio plays
    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        setCurrentTime(audioRef.current.currentTime);
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    };

    // Seek audio when progress bar is changed
    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newTime = (Number(e.target.value) / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(Number(e.target.value));
    };

    // Handle volume change
    // const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!audioRef.current) return;
    //     const newVolume = Number(e.target.value);
    //     audioRef.current.volume = newVolume;
    //     setVolume(newVolume);
    // };

    // Format time in mm:ss
    const formatTime = (time: number): string => {
        if (isNaN(time)) return '00:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    // Initialize audio events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Set duration once metadata is loaded
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        // Play event
        const handlePlayEvent = () => {
            setIsPlaying(true);
            if (onPlay) onPlay();
        };

        // Pause event
        const handlePauseEvent = () => {
            setIsPlaying(false);
            if (onPause) onPause();
        };

        // Ended event
        const handleEndedEvent = () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            if (onEnded) onEnded();
        };

        // Attach event listeners
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('play', handlePlayEvent);
        audio.addEventListener('pause', handlePauseEvent);
        audio.addEventListener('ended', handleEndedEvent);

        // Autoplay if specified
        if (autoPlay) {
            audio.play();
        }

        // Cleanup event listeners on unmount
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('play', handlePlayEvent);
            audio.removeEventListener('pause', handlePauseEvent);
            audio.removeEventListener('ended', handleEndedEvent);
        };

    }, [autoPlay, onPlay, onPause, onEnded]);

    return (
        <div className={`flex flex-col items-center ${className}`}>

            {title && <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>}

            <audio ref={audioRef} src={src} loop={loop} className="hidden" />
            <div className="flex items-center w-full">

                {/* Play/Pause Button */}

                <button
                    onClick={togglePlayPause}
                    className="p-2 mr-4 bg-primary-500 text-white rounded-full hover:bg-primary-600 focus:outline-none"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? (<PauseIcon />) : (<PlayIcon />)}
                </button>

                {/* Progress Bar */}

                <div className="flex flex-col flex-grow justify-center gap-1">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-full h-2 mt-1 accent-primary-400 bg-white-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

            </div>

            {/* Volume Control */}

            {/* <div className="flex items-center mt-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5l-7 7h4v7h6v-7h4l-7-7z" />
                </svg>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    aria-label="Volume"
                />
            </div> */}

        </div>
    );
};

export default AudioPlayer;