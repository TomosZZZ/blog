import React from "react";

type Props = {
  params: { slug: string };
};

const PostPage = ({ params }: Props) => {
  const { slug } = params;
  return <div className="text-white">PostPage: {slug}</div>;
};

export default PostPage;
