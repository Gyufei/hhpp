import { isString } from "lodash";
import { useSignMessage } from "wagmi";
import { useEthersSigner } from "./ethers-helper";

export function useSignData() {
  const { signMessageAsync } = useSignMessage();
  const signer = useEthersSigner();

  async function signDataAction(data: any, isTypeData = false) {
    const isStr = isString(data);

    let msgData = data;
    if (typeof msgData === "object" && !isTypeData) {
      msgData = Object.keys(msgData)
        .sort()
        .reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {} as Record<string, any>);
    }

    try {
      const signature = isTypeData
        ? await signer?.signTypedData(data.domain, data.types, data.message)
        : await signMessageAsync({
            message: JSON.stringify(msgData),
          });

      return isTypeData
        ? {
            signature,
            nonce: data.message.time,
          }
        : {
            ...(isStr ? {} : data),
            signature,
          };
    } catch (e) {
      console.log(e, "e");
      return {
        signature: "",
      };
    }
  }

  return { signDataAction };
}
