"use client";

import { Fragment, useState } from "react";
import { IconStar } from "../../icons/icons";
import { Size } from "../../types/size.type";
import { RatingProps } from "./radio-rating.types";

const sizeClasses: Record<Size, number> = {
  tiny: 14,
  small: 18,
  normal: 24,
  large: 30,
  xl: 34,
};

type ControlledRatingProps = RatingProps & {
  value: number | null;
  onChange: (value: number) => void;
};

export const RadioRating: React.FC<ControlledRatingProps> = ({
  className,
  size = "normal",
  variant = "warning",
  value,
  onChange,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const getStarColor = (index: number) => {
    if (hovered !== null) {
      return index <= hovered
        ? `var(--color-${variant})`
        : "var(--color-base-300)";
    }
    if (value !== null) {
      return index <= value
        ? `var(--color-${variant})`
        : "var(--color-base-300)";
    }
    return "var(--color-base-300)";
  };

  return (
    <div
      className={`flex gap-1 justify-start ${className}`}
      style={{ direction: "rtl" }}
    >
      {[1, 2, 3, 4, 5].map((index) => (
        <Fragment key={`star-${index}`}>
          <input
            className="hidden"
            value={index}
            name="rating"
            id={`star${index}`}
            type="radio"
            onChange={() => onChange(index)}
            checked={value === index}
          />
          <label
            htmlFor={`star${index}`}
            className="cursor-pointer transition-colors duration-300"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <IconStar
              width={sizeClasses[size]}
              height={sizeClasses[size]}
              color={getStarColor(index)}
            />
          </label>
        </Fragment>
      ))}
    </div>
  );
};
