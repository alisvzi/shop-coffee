import React from "react";
import { Size } from "../../types/size.type";
import { Badge } from "../badge/badge";
import { PriceProps } from "./price.types";

const sizeClasses: Record<Size, { textSize: string; svgSize: number }> = {
  tiny: { textSize: "text-md", svgSize: 16 },
  small: { textSize: "text-xl", svgSize: 18 },
  normal: { textSize: "text-2xl", svgSize: 20 },
  large: { textSize: "text-3xl", svgSize: 22 },
  xl: { textSize: "text-4xl", svgSize: 24 },
};

export const Price: React.FC<PriceProps> = ({
  size = "normal",
  text = "رایگان",
  price,
  className,
}) => {
  return (
    <>
      {price != null && price > 0 ? (
        <span
          className={`gap-1 font-bold flex items-center ${sizeClasses[size].textSize} ${className}`}
        >
          {price.toLocaleString()}
          <span className="text-base-400 text-sm mr-1">تومان</span>
        </span>
      ) : (
        <Badge variant="success" size="small">
          {text}
        </Badge>
      )}
    </>
  );
};
