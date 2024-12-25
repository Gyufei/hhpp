"use client";

import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useAtom } from "jotai";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useEffect } from "react";

export default function GlobalActionTip() {
  const [globalMessage, setGlobalMessage] = useAtom(GlobalMessageAtom);
  const { type, message } = globalMessage || {};

  useEffect(() => {
    if (globalMessage) {
      const d = setTimeout(() => {
        setGlobalMessage(null);
      }, globalMessage?.duration || 5000);
      return () => clearTimeout(d);
    }
  }, [globalMessage, setGlobalMessage]);

  const colorMap = {
    success: {
      bg: "#D8F0E9",
      border: "#85DFC4",
      icon: "#07D498",
    },
    warning: {
      bg: "#F1E5D1",
      border: "#DFCA9C",
      icon: "#B38828",
    },
    error: {
      bg: "#F8DEDA",
      border: "#DEA69C",
      icon: "#D42C1F",
    },
  };

  return (
    <>
      {message && type ? (
        <div
          className="fixed bottom-6 left-1/2 z-[1000] mt-4 flex w-11/12 -translate-x-1/2 items-center gap-x-2 rounded-md border px-5 py-3 sm:w-auto"
          style={{
            borderColor: colorMap[type].border,
            backgroundColor: colorMap[type].bg,
            zIndex: globalMessage?.zIndex || 1000,
            bottom: globalMessage?.bottom || "24px",
          }}
        >
          {((type) => {
            switch (type) {
              case "success":
                return (
                  <CheckCircle2
                    style={{
                      color: colorMap[type].icon,
                    }}
                    className="h-6 w-6"
                  />
                );
              case "warning":
                return (
                  <AlertCircle
                    style={{
                      color: colorMap[type].icon,
                    }}
                    className="h-6 w-6"
                  />
                );
              case "error":
                return (
                  <XCircle
                    className="h-6 w-6"
                    style={{
                      color: colorMap[type].icon,
                    }}
                  />
                );
              default:
                return null;
            }
          })(type)}
          <div className="text-title-color leading-6">{message}</div>
        </div>
      ) : null}
    </>
  );
}
