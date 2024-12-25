import { io } from "socket.io-client";
import { isProduction } from "@/lib/PathMap";
import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "./use-endpoint";
import useSWRSubscription from "swr/subscription";

export interface IMsg {
  amount: string;
  buyer: string;
  item_id: string;
  market_id: string;
  token_amount: string;
  token_mint: string;
  trade_at: number;
  value: string;
  timestamp: number;
}

export function useWsMsgSub(chain: ChainType) {
  const { wssEndPoint } = useEndPoint();

  const res = useSWRSubscription<Array<IMsg>>(
    chain,
    (_key: string, { next }: { next: any }) => {
      // const socket = io(`${wssEndPoint}/${chain}`);
      const socket = {
        on: (_event: string, _cb: any) => {},
        off: (_event: string, _cb: any) => {},
        mock: () => {
          return wssEndPoint || io;
        },
      };

      function onConnect() {
        console.log("connected");
      }

      function onDisconnect() {
        console.log("disconnected");
      }

      function onMsgEvent(value: any) {
        next(null, (prev: Array<IMsg>) =>
          (prev || []).concat({
            ...value,
            timestamp: Date.now(),
          }),
        );
      }

      function onError(error: Error) {
        if (isProduction) {
          console.warn("Socket.IO error:", error);
        }
      }

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("message", onMsgEvent);
      socket.on("error", (event: any) => next(event.error));

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("message", onMsgEvent);
        socket.off("error", onError);
      };
    },
  );

  return res;
}
