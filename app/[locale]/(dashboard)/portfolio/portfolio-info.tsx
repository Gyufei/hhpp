export default function PortfolioInfo() {
  return (
    <>
      <div className="flex flex-col items-center justify-start text-[12px] sm:flex-row sm:space-x-3">
        <div className="flex flex-col items-start justify-between object-contain">
          <div className="border-b text-gray">14 Day Volume</div>
          <div className="mt-2 flex items-center justify-center text-txt-white">
            <div>$1,000,000</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between">
          <div className="border-b text-gray">Fees (Taker / Maker)</div>
          <div className="mt-2 flex items-center justify-center  text-txt-white">
            <div>0.0350%0.0100%</div>
          </div>
        </div>
      </div>
    </>
  );
}
