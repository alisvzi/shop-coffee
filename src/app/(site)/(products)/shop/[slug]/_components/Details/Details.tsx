import { IconCheck } from "@/app/_components/icons/icons";
import { Price } from "@/app/_components/ui/price";
import { Rating } from "@/app/_components/ui/rating";
import { IProduct } from "@/types/product.interface";
import AddToCart from "./AddToCart";

const Details = ({ product }: IProduct) => {
  const commentsNumb = product.comments.filter((comment) => comment.isAccept);
  return (
    <div className="flex-grow">
      <div>BreadCrump</div>
      <div>
        <h1 className="text-center xl:text-right text-2xl lg:text-3xl font-black leading-10">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-0.5 text-warning">
          {product.score && product.score > 0 && (
            <div className="comment-footer">
              <Rating variant="warning" rate={product.score!} />
            </div>
          )}

          <span className="text-base-content mx-2">
            (دیدگاه کاربر {commentsNumb.length})
          </span>
        </div>
        <div className="mt-4">
          <Price price={product.price} size="xl" />
        </div>

        <p className="py-4 text-justify leading-9 border-b border-base-content/20">
          {product.shortDesc}
        </p>

        <p className="my-6 flex items-center gap-2">
          <IconCheck />
          موجود در انبار
        </p>
        <AddToCart product={product} />
        <div className="my-6 py-6 border-y border-base-content/20">
          <p className=" ">
            <strong>شناسه : </strong> {product._id}
          </p>
          <p className="mt-4">
            <strong>برچسب : </strong> {product.tags.join(" , ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
