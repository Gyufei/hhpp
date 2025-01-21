import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { apiFetcher } from "@/lib/fetcher";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { useSignData } from "./help/use-sign-data";
import { toast } from "react-hot-toast";
import { useAccountInfo } from "../api/use-account-info";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { isProduction } from "@/lib/PathMap";

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

    const timestamp = Date.now();

    const argsData = {
      item_amount: itemAmount,
      source_account: accountInfo?.source_account || "",
      dest_account: accountInfo?.dest_account || "",
    };

    const signData = await signDataAction(
      isPublic ? genTakerOrderTypeData(payTokenAmount, timestamp) : argsData,
      isPublic,
    );
    // throw new Error("test");

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
  const amountSplit = amount.split(".");
  const integer = amountSplit[0];
  const decimal = amountSplit[1]
    ? amountSplit[1].length > 6
      ? amountSplit[1].slice(0, 6)
      : amountSplit[1].padEnd(6, "0")
    : "";
  const amountPad = integer + "." + decimal;
  const chainConfig = ChainConfigs[ChainType.HYPER];

  const destination = chainConfig.contracts.destination;
  const chainId = "0x" + chainConfig.network.toString(16);

  const a = {
    domain: {
      name: "HyperliquidSignTransaction",
      version: "1",
      chainId: "0x66eee",
      verifyingContract: "0x0000000000000000000000000000000000000000",
    },
    types: {
      "HyperliquidTransaction:UsdSend": [
        { name: "hyperliquidChain", type: "string" },
        { name: "destination", type: "string" },
        { name: "amount", type: "string" },
        { name: "time", type: "uint64" },
      ],
    },
    primaryType: "HyperliquidTransaction:UsdSend",
    message: {
      type: "usdSend",
      destination: "0xa53902eda4816e7b5c63DA1C8a6f76640F4AD883",
      amount: "0.673200",
      time: 1737443587350,
      signatureChainId: "0x66eee",
      hyperliquidChain: "Testnet",
    },
  };

  const b = {
    domain: {
      name: "HyperliquidSignTransaction",
      version: "1",
      chainId: "0x66eee",
      verifyingContract: "0x0000000000000000000000000000000000000000",
    },
    types: {
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
    },
    primaryType: "HyperliquidTransaction:UsdSend",
    message: {
      type: "usdSend",
      destination: "0xa53902eda4816e7b5c63DA1C8a6f76640F4AD883",
      amount: "0.673200",
      time: 1737443587350,
      signatureChainId: "0x66eee",
      hyperliquidChain: "Testnet",
    },
  };

  return a;

  const typeData = {
    domain: {
      name: "HyperliquidSignTransaction",
      version: "1",
      chainId,
      verifyingContract: "0x0000000000000000000000000000000000000000",
    },
    types: {
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
    },
    primaryType: "HyperliquidTransaction:UsdSend",
    message: {
      type: "usdSend",
      destination,
      amount: amountPad,
      time: timestamp,
      signatureChainId: chainId,
      hyperliquidChain: isProduction ? "Mainnet" : "Testnet",
    },
  };

  return typeData;
}
