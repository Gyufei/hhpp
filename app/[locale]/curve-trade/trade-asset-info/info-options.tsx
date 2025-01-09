import { formatNum } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";

export default function InfoOptions() {
  const info = {
    price: "3.2136",
    change: 0.00234,
    changeRate: 0.0333,
    vol: 1023131,
    cap: 2342341232131,
    contract: "0x2222222222222222222222222222222222222222",
    holders: 100,
  };

  const labelValueLayoutClx = "flex flex-col gap-y-1";
  const labelClx = "text-xs leading-[18px] text-gray underline";
  const valueClx = "text-xs leading-[18px] text-title-white";

  return (
    <div className="flex items-center gap-x-[30px]">
      <div className={labelValueLayoutClx}>
        <div className={labelClx}>Price</div>
        <div className={valueClx}>{formatNum(info.price)}</div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>24h Change</div>
        <div className={valueClx}>
          <GreenRedText
            value={info.change}
            display={formatNum(info.change) + "/"}
          />
          <GreenRedText
            value={info.changeRate}
            display={formatNum(info.changeRate * 100)}
          />
        </div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>24h Volume</div>
        <div className={valueClx}>{`$${formatNum(info.vol)}`}</div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>Market Cap</div>
        <div className={valueClx}>{`$${formatNum(info.cap)}`}</div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>Contract</div>
        <div className={valueClx}>
          {truncateAddr(info.contract, { nPrefix: 6, nSuffix: 4 })}
        </div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>Holders</div>
        <div className={valueClx}>{info.holders.toString()}</div>
      </div>
    </div>
  );
}

function GreenRedText({
  value,
  display,
}: {
  value: string | number;
  display?: string;
}) {
  if (Number(value) > 0) {
    return <span className="text-green">+{display || value}</span>;
  }

  return <span className="text-red">-{display || value}</span>;
}
