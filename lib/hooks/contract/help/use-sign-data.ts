import { isString } from "lodash";
import { useSignMessage } from "wagmi";
import { useEthersSigner } from "./ethers-helper";

export function useSignData() {
  const { signMessageAsync } = useSignMessage();
  const signer = useEthersSigner();

  async function signDataAction(data: any, isTypeData = false) {
    const isStr = isString(data);

    const signature = isTypeData
      ? await signer?.signTypedData(data.domain, data.types, data.message)
      : await signMessageAsync({
          message: isStr ? data : JSON.stringify(data),
        });

    if (isStr) {
      return { signature };
    }

    return isTypeData
      ? {
          signature,
          nonce: data.message.time,
        }
      : {
          ...data,
          signature,
        };
  }

  return { signDataAction };
}
