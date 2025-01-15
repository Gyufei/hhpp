"use client";

import { cn } from "@/lib/utils/common";
import {
  toast,
  resolveValue,
  Toast,
  Toaster,
  ToastIcon,
} from "react-hot-toast";
import Image from "next/image";

export default function GlobalToast() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 5000,
        removeDelay: 1000,
      }}
    >
      {(t) => (
        <div
          className={cn(
            "flex items-center justify-between space-x-[18px] rounded border border-border-black bg-bg-black p-5 text-title-white",
            t.visible ? "opacity-100" : "opacity-0",
          )}
        >
          <CustomToastIcon t={t} />
          <div className="flex-1 text-sm leading-5">
            {resolveValue(t.message, t)}
          </div>
          <Image
            src="/icons/close.svg"
            alt="close"
            width={20}
            height={20}
            onClick={() => toast.dismiss(t.id)}
            className="cursor-pointer"
          />
        </div>
      )}
    </Toaster>
  );
}

function CustomToastIcon({ t }: { t: Toast }) {
  switch (t.type) {
    case "success":
      return (
        <Image
          src="/icons/success.svg"
          alt="success"
          width={24}
          height={24}
          className="text-title-white"
        />
      );
    case "error":
      return (
        <Image
          src="/icons/error.svg"
          alt="error"
          width={24}
          height={24}
          className="text-title-white"
        />
      );
    default:
      return <ToastIcon toast={t} />;
  }
}
