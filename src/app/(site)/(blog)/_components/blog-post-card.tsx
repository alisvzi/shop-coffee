"use client";

import {
  IconCalendar,
  IconClock,
  IconComment,
  IconUserProfile,
} from "@/app/_components/icons/icons";
import { Badge } from "@/app/_components/ui/badge";
import { BlogPostSummary } from "@/types/blog-post-summary.interface";
import Link from "next/link";
import React from "react";

export type BlogPostCardProps = BlogPostSummary & {};

// {
//   title,
//   thumbnailUrl,
//   studyTime,
//   author,
//   postDate,
//   numberOfViews,
//   numberOfComments,
//   isNew,
//   slug,
// }

export const BlogPostCard: React.FC = () => {
  return (
    <div className="relative flex flex-col rounded-lg bg-white border border-base-content/20 cursor-pointer overflow-hidden">
      {/* {isNew && (
        <Badge
          variant="ghost"
          size="small"
          className="absolute right-2 top-2 !opacity-100"
        >
          جدید
        </Badge>
      )} */}
      <figure>
        {/* <Image src={thumbnailUrl} alt={"title"} width={550} height={327} /> */}
        <img
          src="https://set-coffee.com/wp-content/uploads/2019/10/KenyacoffeePic8.jpg"
          alt=""
        />
      </figure>
      <div className="p-3 flex flex-col flex-auto gap-2 text-sm font-semibold leading-6">
        <Link href={`/blog/slug}`} className="card-title mb-auto">
          {/* {title} */}
          مقاله اول
        </Link>

        <div className="flex items-center justify-between mt-2">
          <Badge variant="info" size="tiny">
            <IconUserProfile width={16} height={16} />
            {/* {author} */}
            حسن جوادی
          </Badge>
          <Badge variant="neutral">
            <IconCalendar width={16} height={16} />
            {/* {postDate} */}
            1402/2/16
          </Badge>
        </div>
      </div>

      <div className="p-3 font-bold  flex items-center gap-2 py-4 text-current border-t border-base-content/10 text-xs justify-between">
        <div className="flex gap-1">
          <Badge variant="accent">
            <IconComment width={16} height={16} />
            {/* {numberOfComments} */}
            351
          </Badge>
        </div>
        <span className="flex items-center gap-1">
          <IconClock width={16} height={16} />
          زمان مطالعه :{/* {studyTime}  */} 6 دقیقه
        </span>
      </div>
    </div>
  );
};
