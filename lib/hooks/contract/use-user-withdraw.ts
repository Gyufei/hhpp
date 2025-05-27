import { useEndPoint } from "../api/use-endpoint";
import { ApiPaths, isProduction } from "@/lib/PathMap";
import { apiFetcher } from "@/lib/fetcher";
import { useSignData } from "./help/use-sign-data";
import useSWRMutation from "swr/mutation";
import { useAccountInfo } from "../api/use-account-info";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { formatDecimal } from "@/lib/utils/number";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

export function useUserWithdraw() {
  const { data: accountInfo } = useAccountInfo();
  const { apiEndPoint } = useEndPoint();
  const { signDataAction } = useSignData();
  const { checkAndSwitchChain } = useCheckSwitchChain();

  async function postApi(
    _: string,
    {
      arg,
    }: {
      arg: {
        token_address: string;
        amount: string;
      };
    },
  ) {
    if (!accountInfo) return;

    await checkAndSwitchChain();

    const { amount, token_address } = arg;

    const argsData = {
      wallet: accountInfo.dest_account,
      token_address,
      amount,
    };

    const signData = await signDataAction(argsData);

    const reqData = {
      ...argsData,
      ...signData,
    };

    const res = await apiFetcher(`${apiEndPoint}${ApiPaths.userWithdraw}`, {
      method: "POST",
      body: JSON.stringify(reqData),
    });

    return res;
  }

  const res = useSWRMutation("user withdraw", postApi);

  return res;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
