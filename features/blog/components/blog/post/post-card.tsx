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
      className="group flex flex-col rounded-lg bg-neutral-900 border border-neutral-700 hover:border-violet-600 transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/10"
    >
      <div className="w-full h-48 relative rounded-t-lg overflow-hidden">
        <Image
          src={thumbnail}
          alt={`Thumbnail for ${title}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        {" "}
        <h2 className="text-lg font-bold text-gray-100">{title}</h2>
        <p className="text-gray-400 text-sm mt-2 line-clamp-3 flex-grow">
          {" "}
          {description}
        </p>
        <div className="flex justify-end mt-4">
          {" "}
          <p className="text-gray-500 text-xs">{date}</p>
        </div>
      </div>
    </Link>
  );
};
