"use client"

import { Book, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const backgroundImages = [1, 2, 3, 4, 5].map((num) => `/backgrounds/${num}.webp`);

export default function Main() {
  const [lastfmStatus, setLastfmStatus] = useState("loading...");
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  useEffect(() => {
    const randomBg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBackgroundImage(randomBg);

    async function fetchData() {
      try {
        const res = await fetch(
          "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=misopog&api_key=abef0fe1fb2be45bc1736aa615dc87fb&format=json"
        );
        const { recenttracks } = await res.json();

        if (recenttracks.track && recenttracks.track.length > 0) {
          const currentTrack = recenttracks.track[0];

          if (currentTrack["@attr"]?.nowplaying) {
            setLastfmStatus(`${currentTrack.artist["#text"]} - ${currentTrack.name}`);
          } else {
            setLastfmStatus(`${currentTrack.artist["#text"]} - ${currentTrack.name}`);
          }
        } else {
          setLastfmStatus("Last.fm API error (no available tracks)");
        }
      } catch (error) {
        console.error("Error fetching Last.fm data:", error);
        setLastfmStatus("Error loading Last.fm status");
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      <Image
        src={backgroundImage}
        alt="bg"
        fill
        priority
        className="object-cover z-[-1]"
        quality={100}
      />
      <div className="flex flex-col items-center justify-center content-center bg-blur rounded-3xl p-8 w-full max-w-md mx-auto fade-in-bottom">
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
            <p className="text-sm text-neutral-400">{lastfmStatus}</p>
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
              href="https://open.spotify.com/user/wcqybgexqdu4kspw40itcan8x?si=ab717457655a46e3"
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
  );
}
