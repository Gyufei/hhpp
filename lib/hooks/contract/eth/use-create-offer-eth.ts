import { ISettleMode } from "@/lib/types/offer";
import { useChainSendTx } from "../help/use-chain-send-tx";
import { useEndPoint } from "../../api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import { useDataApiTransactionRecord } from "../../api/use-transactionRecord";
import useTxStatus from "../help/use-tx-status";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { ChainType } from "@/lib/types/chain";
import { useGasEth } from "../help/use-gas-eth";

export function useCreateOfferEth({
  marketSymbol,
  chain,
}: {
  marketSymbol: string;
  chain: ChainType;
}) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx();
  const { ApiCallGas } = useGasEth();

  const { address } = useChainWallet();

  const txAction = async (args: {
    direction: "buy" | "sell";
    price: string;
    total_item_amount: number;
    payment_token: string;
    collateral_ratio: number;
    settle_mode: ISettleMode;
    trade_tax_pct: number;
  }) => {
    const reqData = {
      ...args,
      creator: address,
    };
    const res = await dataApiFetcher(
      `${dataApiEndPoint}/market/${marketSymbol}/create_offer?chain=${chain}`,
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
      txType: "createOffer",
      txData: {
        wallet: reqData.creator,
        market_symbol: marketSymbol,
        total_item_amount: reqData.total_item_amount,
      },
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
