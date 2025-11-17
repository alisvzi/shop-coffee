import { ReactNode } from "react";
import { Button } from "../button/button";

type Variant = "info" | "success" | "warning" | "error";

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  variant?: Variant;
  confirmText?: string;
  cancelText?: string;
  isQuestion?: boolean;
  content?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Dialog({
  open,
  title,
  description,
  variant = "info",
  confirmText = "تایید",
  cancelText = "لغو",
  isQuestion = true,
  content,
  onConfirm,
  onCancel,
}: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <h2 className={`text-${variant} text-lg font-semibold`}>{title}</h2>
        </div>

        {description && <p className="text-sm mb-6">{description}</p>}

        {content && <div className="mb-4">{content}</div>}

        {isQuestion ? (
          <div className="flex justify-end gap-3">
            <Button onClick={onCancel} variant="neutral" size="small">
              {cancelText}
            </Button>
            <Button onClick={onConfirm} variant={variant} size="small">
              {confirmText}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-3">
            <Button onClick={onConfirm} variant={variant} size="small">
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
