"use client";

import React from "react";
import { Slider } from "@/app/_components/ui/slider/slider";

type PriceRangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
};

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, step = 10000, value, onChange }) => {
  const [low, high] = value;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span>حداقل: {low.toLocaleString()} تومان</span>
        <span>حداکثر: {high.toLocaleString()} تومان</span>
      </div>
      <Slider value={[low, high]} min={min} max={max} step={step} onValueChange={(vals: number[]) => onChange([vals[0], vals[1] ?? vals[0]])} />
    </div>
  );
};