// import { useSignMessage } from "wagmi";

export function useSignData() {
  // const { signMessageAsync } = useSignMessage();

  async function signDataAction(data: any) {
    // const signature = await signMessageAsync({
    //   message: JSON.stringify(data),
    // });
    return {
      ...data,
      // signature,
    };
  }

  return { signDataAction };
}
