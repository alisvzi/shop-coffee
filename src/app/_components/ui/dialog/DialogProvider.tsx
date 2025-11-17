"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Textbox } from "../textbox";
import { Dialog } from "./Dialog";

type Variant = "info" | "success" | "warning" | "error";

interface DialogOptions {
  title: string;
  description?: string;
  variant?: Variant;
  confirmText?: string;
  cancelText?: string;
  isQuestion?: boolean;
  hasInput?: boolean;
}

interface DialogContextValue {
  confirm: (options: DialogOptions) => Promise<boolean>;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog باید داخل DialogProvider استفاده شود");
  return ctx;
};

export function DialogProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<DialogOptions | null>(null);
  const [resolver, setResolver] = useState<
    ((value: boolean | string) => void) | null
  >(null);
  const [inputValue, setInputValue] = useState<string>("");

  const confirm = (opts: DialogOptions) => {
    setOptions(opts);
    setInputValue("");
    return new Promise<boolean | string>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    setOptions(null);
    if (options?.hasInput) {
      resolver?.(inputValue);
    } else {
      resolver?.(true);
    }
  };

  const handleCancel = () => {
    setOptions(null);
    resolver?.(false);
  };

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}
      {options && (
        <Dialog
          open={true}
          title={options.title}
          description={options.description}
          variant={options.variant}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isQuestion={options.isQuestion}
          content={
            options.hasInput ? (
              <Textbox
                type="text"
                className="border rounded p-2 w-full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
            ) : null
          }
        />
      )}
    </DialogContext.Provider>
  );
}
