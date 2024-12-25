import { useLocale } from "next-intl";

export default function AskDetailBtnTip() {
  const locale = useLocale();
  const isEn = locale === "en";
  const isZh = locale === "zh";

  return (
    <div className="mt-3 text-xs leading-5 text-gray">
      {isEn && (
        <>
          You will automatically receive the{" "}
          <span className="text-black">
            equivalent amount of the protocol&apos;s tokens
          </span>{" "}
          once the Origin Offer Creator settle the offer.
        </>
      )}
      {isZh && (
        <>
          只要初始 Maker 执行了清算, 你将自动收到{" "}
          <span className="text-black">等价的协议代币</span>{" "}
        </>
      )}
    </div>
  );
}
