import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useState } from "react";

function validateEmail(input: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(input);
}

export default function SubscribeInput() {
  const t = useTranslations("Home");

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  function handleInput(val: string) {
    setEmail(val);
    setIsEmail(validateEmail(val));
  }

  function handleSubscribe() {
    if (!isEmail) return;
  }

  return (
    <div className="relative mt-5 flex w-full justify-center sm:w-fit">
      <Input
        className="h-10 w-full rounded-xl border border-[#303030] hover:border-green focus:border-green sm:h-12 sm:w-[480px]"
        type="email"
        placeholder={t("pl-EnterEmailAddress")}
        value={email}
        onChange={(e) => handleInput(e.target.value)}
      />
      <div
        data-active={isEmail}
        className="absolute left-[70%] top-0 flex h-10 items-center rounded-lg px-5 leading-5 text-lightgray data-[active=true]:cursor-pointer data-[active=true]:bg-yellow data-[active=true]:text-txt-white sm:top-1 sm:leading-[22px] md:left-[calc(50%+116px)]"
        onClick={handleSubscribe}
      >
        {t("btn-Subscribe")}
      </div>
    </div>
  );
}
