import { ApiPaths, DataApiPaths } from "@/lib/PathMap";
import { useEndPoint } from "./use-endpoint";
import { apiFetcher, dataApiFetcher } from "@/lib/fetcher";
import { ChainType } from "@/lib/types/chain";

export function useTransactionRecord(chain: ChainType) {
  const { apiEndPoint } = useEndPoint();

  async function recordTransaction({
    txHash,
    note,
  }: {
    txHash: string;
    note: string;
  }) {
    const addParams = {
      tx_hash: txHash,
      transaction_note: note,
    };

    await apiFetcher(`${apiEndPoint}/${chain}${ApiPaths.addTransaction}`, {
      method: "post",
      body: JSON.stringify(addParams),
    });

    return true;
  }

  return {
    recordTransaction,
  };
}

export function useDataApiTransactionRecord() {
  const { dataApiEndPoint } = useEndPoint();

  async function submitTransaction({
    chain,
    txHash,
    txType,
    txData,
  }: {
    chain: ChainType;
    txHash: string;
    txType: string;
    txData: any;
  }) {
    const addParams = {
      transaction_hash: txHash,
      transaction_type: txType,
      data: txData,
    };

    await dataApiFetcher(
      `${dataApiEndPoint}${DataApiPaths.transactionSubmit}?chain=${chain}`,
      {
        method: "post",
        body: JSON.stringify(addParams),
      },
    );

    return true;
  }

  return {
    submitTransaction,
  };
}
