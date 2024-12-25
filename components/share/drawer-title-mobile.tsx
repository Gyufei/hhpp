import Image from "next/image";

export default function MobileDrawerTitle({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
  tag?: string;
  tagClassName?: string;
}) {
  return (
    <div className="flex h-11 items-center">
      <Image
        onClick={() => onClose()}
        src="/icons/back.svg"
        width={24}
        height={24}
        alt="back"
      />
      <div className="flex flex-1 items-center justify-center">{title}</div>
    </div>
  );
}
