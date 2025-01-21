export default function BlockChain() {
  return (
    <div className="flex h-[916px] items-center justify-center bg-bg-black">
      <div className=" relative flex h-[748px] w-[748px] items-center justify-center rounded-full border-[2px] border-border-black">
        <div className="relative flex h-[480px] w-[480px] flex-col items-center justify-center rounded-full border-[2px] border-border-black">
          <div className="font-sf text-[120px] font-light leading-[120px] text-title-white">
            69M+
          </div>
          <div className="text-[18px] font-semibold leading-6 text-title-white">
            Deposit
          </div>
          <div className="mt-5 flex h-10 cursor-pointer items-center justify-center rounded-full bg-main px-[34px] text-bg-black hover:bg-main-hover">
            HypeTrade
          </div>
          <div className="absolute left-0 top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-main"></div>
        </div>

        <div className="absolute left-0 top-0 flex -translate-x-1/2 flex-col items-center">
          <div className="font-sf text-[80px] font-light leading-[120px] text-title-white">
            $10B+
          </div>
          <div className="text-[18px] leading-6 text-title-white">
            Trading Volume
          </div>
        </div>

        <div className="absolute right-0 top-[10px] flex translate-x-1/2 flex-col items-center">
          <div className="font-sf text-[80px] font-light leading-[120px] text-title-white">
            2.5M+
          </div>
          <div className="text-[18px] leading-6 text-title-white">
            Transactions
          </div>
        </div>

        <div className="absolute bottom-0 left-0 flex -translate-x-full flex-col items-center">
          <div className="font-sf text-[80px] font-light leading-[120px] text-title-white">
            1.3M+
          </div>
          <div className="text-[18px] leading-6 text-title-white">
            Active Users
          </div>
        </div>

        <div className="absolute -right-[110px] bottom-0 flex translate-x-full flex-col items-center">
          <div className="font-sf text-[80px] font-light leading-[120px] text-title-white">
            75
          </div>
          <div className="text-[18px] leading-6 text-title-white">Tokens</div>
        </div>
      </div>
    </div>
  );
}
