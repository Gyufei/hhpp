import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

export default function SearchInput({
  handleSearch,
}: {
  handleSearch: (searchText: string) => void;
}) {
  const [searchText, setSearchText] = useState("");
  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleClickSearchIcon() {
    if (!isActive) {
      setSearchText("");
      setIsActive(true);
      setHover(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }

  function handleBlur() {
    setIsActive(false);
    setHover(false);
  }

  function handleKeyPress(e: any) {
    if (e.key === "Enter") {
      handleSearch(searchText);
    }
  }

  const [hover, setHover] = useState(false);

  return (
    <div className="flex h-8 min-w-8">
      {isActive ? (
        <Input
          ref={inputRef}
          placeholder="Search"
          onBlur={handleBlur}
          value={searchText}
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearchText(e.target.value)}
          className="z-0 h-8 w-[200px] rounded border border-[#d1d4dc] bg-transparent px-[10px] text-title-white"
        />
      ) : (
        <Image
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleClickSearchIcon}
          src={hover ? "/icons/search.svg" : "/icons/search-gray.svg"}
          width={20}
          height={20}
          alt="search"
          className="z-10 cursor-pointer"
        />
      )}
    </div>
  );
}
