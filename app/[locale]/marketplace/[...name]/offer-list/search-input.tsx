import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function SearchInput({
  handleSearch,
}: {
  handleSearch: (searchText: string) => void;
}) {
  const t = useTranslations("pn-Marketplace");
  const [searchText, setSearchText] = useState("");
  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleClickSearchIcon() {
    if (!isActive) {
      setSearchText("");
      setIsActive(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 1000);
    }
  }

  function handleBlur() {
    setIsActive(false);
  }

  function handleKeyPress(e: any) {
    if (e.key === "Enter") {
      handleSearch(searchText);
    }
  }

  return (
    <div className="min-w-8 flex h-8">
      <Image
        onClick={handleClickSearchIcon}
        src={isActive ? "/icons/search.svg" : "/icons/search-gray.svg"}
        width={20}
        height={20}
        alt="search"
        className="z-10 cursor-pointer"
      />
      {isActive && (
        <Input
          ref={inputRef}
          placeholder={t("pl-ItemId")}
          onBlur={handleBlur}
          value={searchText}
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearchText(e.target.value)}
          className="z-0 -ml-4 h-8 w-[100px] rounded-none border-x-0 border-t-0 border-b border-black bg-transparent pl-5"
        />
      )}
    </div>
  );
}
