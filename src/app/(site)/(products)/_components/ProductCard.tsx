import { Price } from "@/app/_components/ui/price";
// Removed unused CourseSummary type; define explicit props for this card
import { Rating } from "@/app/_components/ui/rating";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductCardProps = {
  _id: string | { toString(): string };
  img: string;
  price: number;
  score?: number;
  name: string;
  weight: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  img,
  price,
  score,
  name,
  weight,
  _id,
}) => {
  return (
    <div className="card">
      <Link href={`/shop/${String(_id)}`}>
        <figure>
          <Image
            src={img}
            alt={name}
            width={300}
            height={200}
            className="w-full h-[200px] object-contain mx-auto"
          />
        </figure>
        <div className="card-body">
          <p className="card-title">{name}</p>
          <p>({weight}گرمی)</p>
          <Rating
            rate={Number(score ?? 0)}
            size="tiny"
            className="justify-center"
          />
          <div className="card-footer">
            <Price price={price} />
          </div>
        </div>
      </Link>
    </div>
  );
};
