import { ChainType } from "@/lib/types/chain";
import { useDataApiTransactionRecord } from "../../api/use-transactionRecord";
import { useEndPoint } from "../../api/use-endpoint";
import { useChainSendTx } from "../help/use-chain-send-tx";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { dataApiFetcher } from "@/lib/fetcher";
import { DataApiPaths } from "@/lib/PathMap";
import useTxStatus from "../help/use-tx-status";
import { IBalanceType } from "../use-withdraw-token";
import { useGasEth } from "../help/use-gas-eth";

export function useWithdrawTokenEth({ chain }: { chain: ChainType }) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx();
  const { ApiCallGas } = useGasEth();

  const { address } = useChainWallet();

  const txAction = async (args: {
    token_symbol: string;
    token_balance_type: IBalanceType;
  }) => {
    const reqData = {
      wallet: address,
      ...args,
    };

    const res = await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.accountWithdraw}?chain=${chain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      },
    );

    if (!res.tx_data) {
      throw new Error("Invalid transaction data");
      return null;
    }

    const callParams = {
      ...res.tx_data,
      ...ApiCallGas,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await submitTransaction({
      chain,
      txHash,
      txType: "withdraw",
      txData: null,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
