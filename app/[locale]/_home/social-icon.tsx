import Image from "next/image";
import { Link } from "@/i18n/routing";
import { TgLink, TwitterLink } from "@/lib/utils/social";

export default function SocialIcon() {
  return (
    <>
      <Link href={TwitterLink}>
        <Image
          src="/icons/twitter-white.svg"
          width={36}
          height={36}
          alt="twitter"
          className="cursor-pointer"
        />
      </Link>
      <Link href={TgLink}>
        <Image
          src="/icons/tg-white.svg"
          width={36}
          height={36}
          alt="telegram"
          className="cursor-pointer"
        />
      </Link>
    </>
  );
}
