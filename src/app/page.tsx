import { Book, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BioPage() {
  return (
    <div className="flex flex-col items-center justify-center content-center bg-blur rounded-3xl p-8 w-full max-w-md mx-auto">
      <div className="flex flex-col items-center gap-6 mb-12">
        <div className="relative profile-glow">
          <Image
            src="/profile.jpg?height=120&width=120"
            alt="pfp"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-1">misopog</h1>
          <p className="text-neutral-400">professional dumbass</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="https://open.spotify.com/user/wcqybgexqdu4kspw40itcan8x?si=ab717457655a46e3"
            className="social-icon hover:scale-110"
          >
            <Image
              src="/spotify.svg?height=24&width=24"
              alt="spotify"
              width={24}
              height={24}
            />
          </Link>
          <Link href="https://www.last.fm/user/misopog" className="social-icon hover:scale-110">
            <Image
              src="/lastfm.svg?height=24&width=24"
              alt="lastfm"
              width={24}
              height={24}
            />
          </Link>
          <Link
            href="https://steamcommunity.com/profiles/76561198336094257"
            className="social-icon hover:scale-110"
          >
            <Image
              src="/steam.svg?height=24&width=24"
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
        <div className="mt-8 flex items-center gap-3 hover:scale-110">
          <Image
            src="/profile.jpg?height=48&width=48"
            alt="discord pfp"
            width={48}
            height={48}
            className="rounded-full"
          />
          <p className="text-sm text-neutral-400">@misopog</p>
        </div>
      </a>
    </div>
  );
}
