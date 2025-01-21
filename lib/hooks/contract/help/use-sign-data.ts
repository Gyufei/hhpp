import { isString } from "lodash";
import { useConfig, useSignMessage, useSignTypedData } from "wagmi";
import { verifyTypedData } from "@wagmi/core";

export function useSignData() {
  const { signMessageAsync } = useSignMessage();
  const { signTypedDataAsync } = useSignTypedData();
  const config = useConfig();

  async function signDataAction(data: any, isTypeData = false) {
    const isStr = isString(data);

    const signature = isTypeData
      ? await signTypedDataAsync(data)
      : await signMessageAsync({
          message: isStr ? data : JSON.stringify(data),
        });

    console.log(signature);

    const res = await verifyTypedData(config, {
      ...data,
      address: "0xf60132e5Cb6A7319dF1524dc8aC6176987a5fE34",
      signature,
    });
    console.log("verify", res);

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
