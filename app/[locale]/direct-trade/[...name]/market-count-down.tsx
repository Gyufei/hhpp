import Image from "next/image";
import { IMarketplace } from "@/lib/types/marketplace";
import { useCallback, useEffect, useState } from "react";
import {
  millisecondsInHour,
  millisecondsInMinute,
  millisecondsInSecond,
} from "date-fns";

export default function MarketCountDown({
  marketplace,
  onCountEnd,
}: {
  marketplace: IMarketplace;
  onCountEnd: () => void;
}) {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const calculateTime = useCallback(() => {
    const startsAt = Number(marketplace.trading_starts_at) * 1000;
    const difference = startsAt - Date.now();
    setDays(Math.floor(difference / (millisecondsInHour * 24)));
    setHours(Math.floor((difference / millisecondsInHour) % 24));
    setMinutes(Math.floor((difference / millisecondsInMinute) % 60));
    setSeconds(Math.floor((difference / millisecondsInSecond) % 60));

    if (difference <= 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      onCountEnd();
    }
  }, [onCountEnd, marketplace.trading_starts_at]);

  useEffect(() => {
    calculateTime();

    const interval = setInterval(() => {
      calculateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTime]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        src={marketplace.projectLogo}
        width={48}
        height={48}
        alt="logo"
        className="rounded-full"
      />
      <div className="mt-[10px] text-sm leading-5 text-title-white">
        {marketplace.item_name}/USDC
      </div>
      <div className="mt-[5px] w-[200px] text-center text-xs leading-[18px] text-txt-white">
        Call auction will begin after the countdown ends.
      </div>
      <TimeContainer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </div>
  );
}

function TimeContainer({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  return (
    <div className="mt-[15px] flex items-center justify-between space-x-[10px]">
      <NumberBox num={days} unit="Days" />
      <Colon />
      <NumberBox num={hours} unit="Hours" />
      <Colon />
      <NumberBox num={minutes} unit="Mins" />
      <Colon />
      <NumberBox num={seconds} unit="Secs" />
    </div>
  );
}

function Colon() {
  return (
    <span className="-mt-[30px] inline-block text-xl text-title-white">:</span>
  );
}

function NumberBox({ num, unit }: { num: number; unit: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#303030] text-xl leading-[30px] text-title-white">
        {num}
      </div>
      <p className="mt-[10px] text-xs leading-[18px] text-gray">{unit}</p>
    </div>
  );
}
