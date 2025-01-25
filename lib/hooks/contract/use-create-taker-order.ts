import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { apiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { isProduction } from "@/lib/PathMap";
import { formatDecimal } from "@/lib/utils/number";
import NP from "number-precision";

export function useCreateTakerOrder() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  const txAction = async (args: {
    offerId: string;
    itemAmount: string;
    payTokenAmount: string;
  }) => {
    const { offerId, itemAmount, payTokenAmount } = args;

    const isPublic = accountInfo?.trading_mode === "Public";
    const isFirstTake = accountInfo?.is_active === "0";
    const payAmount = isFirstTake ? NP.plus(payTokenAmount, 1) : payTokenAmount;

    const timestamp = Date.now();

    const argsData = {
      item_amount: itemAmount,
      source_account: accountInfo?.source_account || "",
      dest_account: accountInfo?.dest_account || "",
    };

    const signData = await signDataAction(
      isPublic ? genTakerOrderTypeData(String(payAmount), timestamp) : argsData,
      isPublic,
    );

    const reqData = isPublic
      ? {
          ...argsData,
          ...signData,
        }
      : signData;

    try {
      const res = await apiFetcher(`${apiEndPoint}/offer/${offerId}/take`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });

      return res;
    } catch (e: any) {
      toast.error(e?.message || "The service is abnormal. Please try again");
      throw new Error(
        e?.message || "The service is abnormal. Please try again",
      );
    }
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}

function genTakerOrderTypeData(amount: string, timestamp: number) {
  const amountPad = formatDecimal(amount);
  const chainConfig = ChainConfigs[ChainType.HYPER];
  const chainId = "0x" + chainConfig.network.toString(16);

  const destination = chainConfig.contracts.destination;

  const types = {
    "HyperliquidTransaction:UsdSend": [
      {
        name: "hyperliquidChain",
        type: "string",
      },
      {
        name: "destination",
        type: "string",
      },
      {
        name: "amount",
        type: "string",
      },
      {
        name: "time",
        type: "uint64",
      },
    ],
  };

  const typeData = {
    domain: {
      name: "HyperliquidSignTransaction",
      version: "1",
      chainId,
      verifyingContract: "0x0000000000000000000000000000000000000000",
    },
    types: types,
    primaryType: "HyperliquidTransaction:UsdSend",
    message: {
      destination,
      amount: amountPad,
      time: timestamp,
      signatureChainId: chainId,
      hyperliquidChain: isProduction ? "Mainnet" : "Testnet",
    },
  };

  return typeData;
}
