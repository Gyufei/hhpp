import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/icons/logo.svg" width={100} height={20} alt="logo" />
    </Link>
  );
}
