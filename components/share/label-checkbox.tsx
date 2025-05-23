import { cn } from "@/lib/utils/common";
import { Checkbox } from "../ui/checkbox";

export default function LabelCheckbox({
  label,
  disabled = false,
  checked,
  onChange,
}: {
  label: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "flex h-8 flex-1 items-center justify-between rounded border border-border-black px-[10px]",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
      )}
      onClick={() => {
        if (disabled) return;
        onChange(!checked);
      }}
    >
      <div className="select-none text-xs leading-[18px] text-title-white">
        {label}
      </div>
      <Checkbox
        className={cn(disabled ? "pointer-events-none" : "cursor-pointer")}
        checked={checked}
        onCheckedChange={() => {
          if (disabled || checked) return;
          onChange(!checked);
        }}
      />
    </div>
  );
}
