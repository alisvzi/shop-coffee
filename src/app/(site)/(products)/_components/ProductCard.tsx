import { IconStar } from "@/app/_components/icons/icons";
import { Price } from "@/app/_components/ui/price";
import { CourseSummary } from "@/types/course-summary.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type CourseCardProps = CourseSummary & {};

// export const ProductCard: React.FC<CourseCardProps> = ({
//   coverImageId,
//   title,
//   subTitle,
//   level,
//   recordStatus,
//   basePrice,
//   duration,
//   slug,
// })
export const ProductCard: React.FC = ({
  img,
  price,
  score,
  name,
  weight,
  _id,
}) => {
  return (
    <div className="card">
      <Link href={`/shop/${_id}`}>
        <figure>
          <Image
            src={img}
            alt={name}
            width={300}
            height={200}
            className="w-full h-[200px] object-cover mx-auto"
          />
        </figure>
        {/* <div className="mt-2 flex gap-2 font-semibold dark:text-info px-3 py-2">
        <Badge variant="info">recordStatus</Badge>
        <Badge variant="accent">level</Badge>
      </div> */}
        <div className="card-body">
          <p className="card-title">{name}</p>
          <p>({weight}گرمی)</p>

          <div className="flex items-center justify-center gap-0.5 text-warning">
            <IconStar fill="currentColor" />
            <IconStar fill="currentColor" />
            <IconStar fill="currentColor" />
            <IconStar fill="currentColor" />
          </div>
          <div className="card-footer">
            <Price price={price} />
          </div>
        </div>
      </Link>
    </div>
  );
};
