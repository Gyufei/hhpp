import { isString } from "lodash";
import { useSignMessage } from "wagmi";
import { useEthersSigner } from "./ethers-helper";

export function useSignData() {
  const { signMessageAsync } = useSignMessage();
  const signer = useEthersSigner();

  async function signDataAction(data: any, isTypeData = false) {
    const isStr = isString(data);

    console.log(data);
    const signature = isTypeData
      ? await signer?.signTypedData(data.domain, data.types, data.message)
      : await signMessageAsync({
          message: JSON.stringify(data),
        });
    console.log(signature);

    return isTypeData
      ? {
          signature,
          nonce: data.message.time,
        }
      : {
          ...(isStr ? {} : data),
          signature,
        };
  }

  return { signDataAction };
}
