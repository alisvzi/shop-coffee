"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SliderProps = {
  className?: string;
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (values: number[]) => void;
};

export function Slider({ className, defaultValue, value, min = 0, max = 100, step = 1, disabled, onValueChange }: SliderProps) {
  const isControlled = Array.isArray(value);
  const [internal, setInternal] = React.useState<number[]>(() => (Array.isArray(defaultValue) ? defaultValue : [min]));
  const values = isControlled ? (value as number[]) : internal;
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState<number | null>(null);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const snap = (v: number) => clamp(Math.round(v / step) * step);
  const percent = (v: number) => ((v - min) / (max - min)) * 100;

  const setValues = (next: number[]) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const startDrag = (index: number, clientX: number) => {
    setActive(index);
    moveThumb(index, clientX);
  };

  const moveThumb = (index: number, clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const ratio = x / rect.width;
    const raw = min + ratio * (max - min);
    const nextVal = snap(raw);
    const next = [...values];
    next[index] = nextVal;
    if (next.length === 2) {
      if (index === 0) next[0] = Math.min(next[0], next[1]);
      else next[1] = Math.max(next[1], next[0]);
    }
    setValues(next);
  };

  const onPointerDownThumb = (index: number, e: React.PointerEvent) => {
    if (disabled) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startDrag(index, e.clientX);
  };

  const onPointerMoveThumb = (index: number, e: React.PointerEvent) => {
    if (disabled) return;
    if (active !== index) return;
    moveThumb(index, e.clientX);
  };

  const onPointerUpThumb = () => {
    setActive(null);
  };

  const onKeyDownThumb = (index: number, e: React.KeyboardEvent) => {
    if (disabled) return;
    const key = e.key;
    let delta = 0;
    if (key === "ArrowRight" || key === "ArrowUp") delta = step;
    else if (key === "ArrowLeft" || key === "ArrowDown") delta = -step;
    else if (key === "Home") delta = min - values[index];
    else if (key === "End") delta = max - values[index];
    if (delta !== 0) {
      e.preventDefault();
      const next = [...values];
      next[index] = snap(next[index] + delta);
      if (next.length === 2) {
        if (index === 0) next[0] = Math.min(next[0], next[1]);
        else next[1] = Math.max(next[1], next[0]);
      }
      setValues(next);
    }
  };

  const rangeStart = values.length === 2 ? percent(Math.min(values[0], values[1])) : 0;
  const rangeEnd = values.length === 2 ? percent(Math.max(values[0], values[1])) : percent(values[0]);

  return (
    <div
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        disabled && "opacity-50",
        className
      )}
    >
      <div
        ref={trackRef}
        data-slot="slider-track"
        className={cn("bg-base-200 relative grow overflow-hidden rounded-full h-1.5 w-full")}
      >
        <div
          data-slot="slider-range"
          className={cn("bg-primary absolute h-full")}
          style={{ left: `${rangeStart}%`, width: `${Math.max(0, rangeEnd - rangeStart)}%` }}
        />
      </div>
      {values.map((v, index) => (
        <button
          type="button"
          key={index}
          data-slot="slider-thumb"
          className={cn(
            "border-primary ring-primary/30 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-none",
            disabled && "pointer-events-none opacity-50"
          )}
          style={{ position: "absolute", left: `calc(${percent(v)}% - 8px)` }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={v}
          aria-disabled={disabled}
          onPointerDown={(e) => onPointerDownThumb(index, e)}
          onPointerMove={(e) => onPointerMoveThumb(index, e)}
          onPointerUp={onPointerUpThumb}
          onKeyDown={(e) => onKeyDownThumb(index, e)}
        />
      ))}
    </div>
  );
}