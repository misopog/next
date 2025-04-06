"use client"

import { Book, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from 'next/head';

const ANIMATION_INTERVAL = 100;
const LASTFM_REFRESH_INTERVAL = 50000;
const LASTFM_ENDPOINT = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=misopog&api_key=abef0fe1fb2be45bc1736aa615dc87fb&format=json";
const BACKGROUND_ASSETS = [1, 2, 3, 4, 5].map((num) => `/backgrounds/${num}.webp`);

interface AnimationState {
  frames: string[];
  currentIndex: number;
}

const useAnimatedDocumentTitle = (text: string): void => {
  const initializeAnimationState = (): AnimationState => ({
    frames: ['|', '/', '-', '\\'],
    currentIndex: 0
  });

  useEffect(() => {
    let currentLength = 1;
    let isForward = true;
    const animationState = initializeAnimationState();

    const renderNextFrame = () => {
      const visibleText = text.slice(0, currentLength);
      document.title = `${visibleText} ${animationState.frames[animationState.currentIndex]}`;
      
      animationState.currentIndex = (animationState.currentIndex + 1) % animationState.frames.length;
      
      if (animationState.currentIndex === 0) {
        if (isForward) {
          if (currentLength >= text.length) {
            isForward = false;
            currentLength--;
          } else {
            currentLength++;
          }
        } else {
          if (currentLength <= 1) {
            isForward = true;
            currentLength++;
          } else {
            currentLength--;
          }
        }
      }
    };

    const animationInterval = setInterval(renderNextFrame, ANIMATION_INTERVAL);
    return () => clearInterval(animationInterval);
  }, [text]);
};

const useNowPlayingStatus = (): string => {
  const [status, setStatus] = useState("loading...");

  const fetchTrackData = async (): Promise<void> => {
    try {
      const response = await fetch(LASTFM_ENDPOINT);
      const { recenttracks } = await response.json();

      if (recenttracks?.track?.[0]) {
        const track = recenttracks.track[0];
        setStatus(`${track.artist["#text"]} - ${track.name}`);
      } else {
        setStatus("No active playback");
      }
    } catch (error) {
      console.error("LastFM API Error:", error);
      setStatus("Playback status unavailable");
    }
  };

  useEffect(() => {
    fetchTrackData();
    const updateInterval = setInterval(fetchTrackData, LASTFM_REFRESH_INTERVAL);
    return () => clearInterval(updateInterval);
  }, []);

  return status;
};

const useBackgroundRotation = (): string => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * BACKGROUND_ASSETS.length);
    setBackground(BACKGROUND_ASSETS[randomIndex]);
  }, []);

  return background;
};

export default function Main() {
  const nowPlaying = useNowPlayingStatus();
  const backgroundImage = useBackgroundRotation();
  useAnimatedDocumentTitle('misopog');

  return (
    <>
      <Head>
        {BACKGROUND_ASSETS.map((bg: string) => (
          <link key={bg} rel="preload" as="image" href={bg} />
        ))}
      </Head>
      <div className="fixed inset-0 flex items-center justify-center">
        <Image
          src={backgroundImage}
          alt="bg"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
          quality={100}
        />
        <div className="relative flex flex-col items-center justify-center content-center bg-blur rounded-3xl p-8 w-full max-w-md mx-4 fade-in-bottom">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="relative profile-glow">
              <Image
                src="./profile.webp?height=120&width=120"
                alt="pfp"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-medium mb-1">misopog</h1>
              <p className="text-neutral-400">professional schizoposter</p>
              <p className="text-sm text-neutral-400">{nowPlaying}</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="https://www.youtube.com/@majkenxd"
                className="social-icon hover:scale-110"
              >
                <Image
                  src="./youtube.svg?height=24&width=24"
                  alt="youtube"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="https://x.com/@misopog"
                className="social-icon hover:scale-110"
              >
                <Image
                  src="./x.svg?height=24&width=24"
                  alt="x"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="https://t.me/misopog"
                className="social-icon hover:scale-110"
              >
                <Image
                  src="./telegram.svg?height=24&width=24"
                  alt="tg"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="https://open.spotify.com/user/31vypzm4tq35a63ljenh3fv6ynoe"
                className="social-icon hover:scale-110"
              >
                <Image
                  src="./spotify.svg?height=24&width=24"
                  alt="spotify"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="https://www.last.fm/user/misopog" className="social-icon hover:scale-110">
                <Image
                  src="./lastfm.svg?height=24&width=24"
                  alt="lastfm"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="https://github.com/misopog" className="social-icon hover:scale-110">
                <Image
                  src="./github.svg?height=24&width=24"
                  alt="github"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="https://steamcommunity.com/profiles/76561198336094257"
                className="social-icon hover:scale-110"
              >
                <Image
                  src="./steam.svg?height=24&width=24"
                  alt="steam"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
          <div className="w-full space-y-4">
            <Link
              href="https://blog.misopog.xyz"
              className="link-button flex items-center justify-between p-4 rounded-lg group bg-neutral-900/50 hover:bg-neutral-900/70 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <Book className="w-5 h-5" />
                <span>blog</span>
              </div>
              <span className="opacity-0 group-hover:opacity-100">
                <LinkIcon className="w-5 h-5" />
              </span>
            </Link>
          </div>

          <a href="https://discord.com/users/967755284984524811">
            <div className="mt-8 flex justify-center items-center gap-3 hover:scale-110 ">
              <Image
                src="./profile.webp?height=48&width=48"
                alt="discord logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <p className="text-sm text-neutral-400">@misopog</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
