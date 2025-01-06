"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRpcLatency } from "@/lib/hooks/web3/use-rpc-latency";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { useRpc } from "@/lib/hooks/web3/use-rpc";
import { ChainType } from "@/lib/types/chain";
import { isValidRpcUrl } from "@/lib/utils/common";
import HoverIcon from "@/components/share/hover-icon";
import { isProduction } from "@/lib/PathMap";

interface Network {
  id: ChainType;
  name: string;
  rpcs: RPC[];
}

interface RPC {
  id: string;
  url: string;
  name?: string;
  isCustom: boolean;
  isActive: boolean;
}

export default function RpcManage() {
  const ct = useTranslations("pop-Setting");
  const { globalRpcs, setCustomRpcAction, testRpcLatency } = useRpc();

  const [networks, setNetworks] = useState<Network[]>(() => {
    const storedNetworks = localStorage.getItem(
      isProduction ? "networks" : "networks_dev",
    );
    return storedNetworks
      ? JSON.parse(storedNetworks)
      : [
          {
            id: ChainType.HYPER,
            name: "Arbitrum",
            rpcs: [
              {
                id: "1",
                name: "Arbitrum's RPC",
                url: globalRpcs[ChainType.HYPER],
                isCustom: false,
                isActive: true,
              },
            ],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("networks", JSON.stringify(networks));
  }, [networks]);

  const [addingRpcTo, setAddingRpcTo] = useState<string | null>(null);
  const [newRpcUrl, setNewRpcUrl] = useState("");
  const [editingRpc, setEditingRpc] = useState<RPC | null>(null);
  const [inputRpcError, setInputRpcError] = useState(false);

  const handleAddRpc = (networkId: string) => {
    setAddingRpcTo(networkId);
    setNewRpcUrl("");
    setEditingRpc(null);
  };

  const handleSaveRpc = async (networkId: ChainType) => {
    if (!newRpcUrl) return;

    if (!isValidRpcUrl(newRpcUrl)) {
      setInputRpcError(true);
      return;
    }

    try {
      const latency = await testRpcLatency(networkId, newRpcUrl);

      setCustomRpcAction(networkId, newRpcUrl);

      setNetworks(
        networks.map((network) => {
          if (network.id === networkId) {
            const updatedRpcs = network.rpcs.map((rpc) => ({
              ...rpc,
              isActive: false,
            }));
            if (editingRpc) {
              return {
                ...network,
                rpcs: updatedRpcs.map((rpc) =>
                  rpc.id === editingRpc.id
                    ? { ...rpc, url: newRpcUrl, isActive: true }
                    : rpc,
                ),
              };
            } else {
              const newRpc = {
                id: Math.random().toString(),
                url: newRpcUrl,
                isCustom: true,
                isActive: true,
              };
              return {
                ...network,
                rpcs: [...updatedRpcs, newRpc],
              };
            }
          }
          return network;
        }),
      );

      setAddingRpcTo(null);
      setEditingRpc(null);
      setNewRpcUrl("");
      return latency;
    } catch (e) {
      setInputRpcError(true);
    }
  };

  const handleEditRpc = (networkId: string, rpc: RPC) => {
    setEditingRpc(rpc);
    setNewRpcUrl(rpc.url);
    setAddingRpcTo(networkId);
  };

  const handleDeleteRpc = (networkId: string) => {
    setNetworks(
      networks.map((network) => {
        if (network.id === networkId) {
          return {
            ...network,
            rpcs: [network.rpcs[0]],
          };
        }
        return network;
      }),
    );
  };

  const handleSetActiveRpc = (networkId: string, rpcId: string) => {
    setNetworks(
      networks.map((network) => {
        if (network.id === networkId) {
          return {
            ...network,
            rpcs: network.rpcs.map((rpc) => ({
              ...rpc,
              isActive: rpc.id === rpcId,
            })),
          };
        }
        return network;
      }),
    );
  };

  const handleRpcChange = (value: any) => {
    setNewRpcUrl(value);
    setInputRpcError(false);
  };

  return (
    <div className="space-y-4">
      {networks.map((network) => (
        <div key={network.id} className="space-y-2">
          <div className="flex items-center justify-start">
            <span className="text-[14px] font-medium">{network.name}</span>
            {network.rpcs.length < 2 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleAddRpc(network.id)}
              >
                <Plus className="h-4 w-4 hover:text-green" />
              </Button>
            )}
          </div>

          {network.rpcs.map((rpc) => (
            <RpcItem
              key={rpc.id}
              rpc={rpc}
              chain={network.id}
              onSetActiveRpc={handleSetActiveRpc}
              onEditRpc={handleEditRpc}
            />
          ))}

          {addingRpcTo === network.id && (
            <div className="relative mt-4 border-t border-dashed border-[#eee] pt-4">
              <Input
                data-error={inputRpcError}
                placeholder={ct("pl-InputYourCustomRPC")}
                style={{ fontSize: "12px" }}
                value={newRpcUrl}
                onChange={(e) => handleRpcChange(e.target.value)}
                className="h-10 w-[256px] rounded-lg border-none bg-bg-black pl-3 pr-[40px] data-[error]:border-red"
              />
              <Image
                onClick={() => handleSaveRpc(network.id)}
                src={
                  newRpcUrl ? "/icons/rpc-link.svg" : "/icons/rpc-link-gray.svg"
                }
                width={24}
                height={24}
                alt="link"
                className="absolute right-[50px] top-6 cursor-pointer"
              />
              <div className="absolute right-2 top-6 flex items-center justify-center">
                <HoverIcon
                  onClick={() => {
                    setAddingRpcTo(null);
                    setEditingRpc(null);
                    setNewRpcUrl("");
                    handleDeleteRpc(network.id);
                  }}
                  src="/icons/delete2.svg"
                  hoverSrc="/icons/delete2-red.svg"
                  width={24}
                  height={24}
                  alt="delete"
                />
              </div>
              {inputRpcError && (
                <div className="pl-2 text-[10px] text-red">
                  {ct("txt-UnsupportedRPC")}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RpcItem({ chain, rpc, onEditRpc, onSetActiveRpc }: any) {
  const { data: ms } = useRpcLatency(chain, rpc.url);

  return (
    <div
      key={rpc.id}
      data-active={rpc.isActive}
      className="bg-gray-50 flex items-center justify-between rounded-lg p-3 data-[active=true]:bg-bg-black"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm" title={rpc.name ? undefined : rpc.url}>
            {rpc.name ||
              (rpc.url.length > 20 ? `${rpc.url.slice(0, 20)}...` : rpc.url)}
          </span>
          <MsDisplay ms={ms} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {rpc.isCustom && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditRpc(chain, rpc)}
          >
            <Image
              src="/icons/edit.svg"
              className="size-5 "
              width={24}
              height={24}
              alt="link"
            />
          </Button>
        )}

        <Checkbox
          checked={rpc.isActive}
          onCheckedChange={() => onSetActiveRpc(chain, rpc.id)}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

function MsDisplay({ ms }: { ms: number | undefined }) {
  const msColor = useMemo(() => {
    if (!ms) return "#3DD866";
    if (ms < 100) return "#3DD866";
    if (ms > 99 && ms < 200) return "#FFA95B";
    if (ms > 200) return "#EF5350";
  }, [ms]);

  if (!ms) return null;

  return (
    <div
      style={{
        color: msColor,
      }}
    >
      {ms}ms
    </div>
  );
}
