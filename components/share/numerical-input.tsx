import React, { forwardRef } from "react";
import { cn, escapeRegExp } from "@/lib/utils/common";

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

interface InputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as"> {
  value: string | number;
  onUserInput: (input: string) => void;
  error?: boolean;
  prependSymbol?: string;
}

const NumericalInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, onUserInput, placeholder, prependSymbol, ...rest }: InputProps,
    ref,
  ) => {
    const enforcer = (nextUserInput: string) => {
      if (
        nextUserInput === "" ||
        inputRegex.test(escapeRegExp(nextUserInput))
      ) {
        onUserInput(nextUserInput);
      }
    };

    return (
      <input
        {...rest}
        className={cn(
          "pointer-events-auto relative flex-1 overflow-hidden text-ellipsis whitespace-nowrap p-0  text-xl text-black transition-colors data-[state=disabled]:pointer-events-none data-[state=error]:text-red",
          rest?.className,
        )}
        style={{
          appearance: "textfield",
        }}
        data-state={
          rest.error ? "error" : rest.disabled ? "disabled" : "default"
        }
        ref={ref}
        value={prependSymbol && value ? prependSymbol + value : value}
        onChange={(event) => {
          if (prependSymbol) {
            const value = event.target.value;

            // cut off prepended symbol
            const formattedValue = value.toString().includes(prependSymbol)
              ? value.toString().slice(1, value.toString().length + 1)
              : value;

            // replace commas with periods, because uniswap exclusively uses period as the decimal separator
            enforcer(formattedValue.replace(/,/g, "."));
          } else {
            enforcer(event.target.value.replace(/,/g, "."));
          }
        }}
        // universal input options
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        // text-specific options
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || "0"}
        minLength={1}
        maxLength={79}
        spellCheck="false"
      />
    );
  },
);

NumericalInput.displayName = "NumericalInput";

const MemoizedInput = React.memo(NumericalInput);
export { MemoizedInput as NumericalInput };
// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
