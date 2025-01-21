import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths, isProduction } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";
import { useAccountInfo } from "../api/use-account-info";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { formatDecimal } from "@/lib/utils/number";

export function useUserWithdraw() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();

  async function postApi(
    _: string,
    {
      arg,
    }: {
      arg: {
        amount: string;
      };
    },
  ) {
    const isPublic = accountInfo?.trading_mode === "Public";
    const { amount } = arg;

    const timestamp = Date.now();

    const argsData = {
      amount,
      source_account: accountInfo?.source_account || "",
      dest_account: accountInfo?.dest_account || "",
    };

    const signData = await signDataAction(
      isPublic
        ? genWithdrawTypeData(
            amount,
            accountInfo?.dest_account || "",
            timestamp,
          )
        : argsData,
      isPublic,
    );

    const reqData = isPublic
      ? {
          ...argsData,
          ...signData,
        }
      : signData;

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userWithdraw}`, {
      method: "POST",
      body: JSON.stringify(reqData),
    });

    return res;
  }

  const res = useSWRMutation("user withdraw", postApi);

  return res;
}

function genWithdrawTypeData(
  amount: string,
  destAccount: string,
  timestamp: number,
) {
  const chainConfig = ChainConfigs[ChainType.HYPER];
  const chainId = "0x" + chainConfig.network.toString(16);

  const amountPad = formatDecimal(amount);

  const types = {
    "HyperliquidTransaction:Withdraw": [
      { name: "hyperliquidChain", type: "string" },
      { name: "destination", type: "string" },
      { name: "amount", type: "string" },
      { name: "time", type: "uint64" },
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
    primaryType: "HyperliquidTransaction:Withdraw",
    message: {
      amount: amountPad,
      destination: destAccount,
      time: timestamp,
      hyperliquidChain: isProduction ? "Mainnet" : "Testnet",
    },
  };

  return typeData;
}
