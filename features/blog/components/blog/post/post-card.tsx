import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  slug: string;
  className?: string;
}

export const PostCard = (props: PostCardProps) => {
  const { title, description, thumbnail, slug, date } = props;

  return (
    <Link
      href={`/blog/${slug}`}
      className={`h-[350px] basis-[80%] sm:basis-[43%] lg:basis-[30%] 2xl:basis-[20%] group hover:scale-[1.03] transition-transform duration-200 cursor-pointer overflow-hidden`}
    >
      <div className="w-full h-[50%] relative rounded-t-lg overflow-hidden">
        <Image
          src={thumbnail}
          alt={`Thumbnail for ${title}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 23vw"
        />
      </div>

      <div className="p-4 bg-gray-100 h-[45%] rounded-b-lg shadow-md flex flex-col">
        <h2 className="text-md md:text-lg font-bold text-black">{title}</h2>
        <p className="text-gray-800 text-sm sm:text-md mt-2  line-clamp-2">
          {description}
        </p>
        <div className="flex justify-end mt-auto">
          <p className="text-gray-600 text-xs sm:text-sm">{date}</p>
        </div>
      </div>
    </Link>
  );
};
