import { useRpc } from "@/lib/hooks/web3/use-rpc";
import { useRpcLatency } from "@/lib/hooks/web3/use-rpc-latency";
import { ChainType } from "@/lib/types/chain";
import { useMemo } from "react";

export function LiveMs() {
  const { globalRpcs, customRpcs } = useRpc();

  const rpc = globalRpcs[ChainType.ARB] || customRpcs[ChainType.ARB];
  const { data: ms } = useRpcLatency(ChainType.ARB, rpc!);

  const msColor = useMemo(() => {
    if (!ms) return "#3DD866";
    if (ms < 100) return "#3DD866";
    if (ms > 99 && ms < 200) return "#FFA95B";
    if (ms > 200) return "#FF6262";
  }, [ms]);

  return (
    <div className="flex items-center space-x-[6px]">
      <div
        className="h-[6px] w-[6px] rounded-full"
        style={{
          backgroundColor: msColor,
        }}
      ></div>
      {ms && (
        <div
          className="text-sm leading-5"
          style={{
            color: msColor,
          }}
        >
          Live {ms}ms
        </div>
      )}
    </div>
  );
}
