import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../lib/prismic";
import { PrismicRichText, PrismicImage } from "@prismicio/react";

export default function Blog() {
  const { uid } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    client.getByUID("BlankCanvasBlog", uid).then((data) => {
      setPost(data);
    });
  }, [uid]);

  if (!post)
    return (
      <p className="text-center min-h-screen bg-black text-white py-10">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen bg-black text-white font-unbounded">
      <article className="max-w-4xl mx-auto px-6 pt-16 py-20">
        {/* Title */}
        <h1 className="text-4xl mb-4 leading-tight">
          <PrismicRichText field={post.data.title} />
        </h1>

        {/* Cover Image */}
        {post.data.cover_image && (
          <PrismicImage
            field={post.data.cover_image}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
        )}

        {/* Meta info */}
        <div className="flex flex-col opacity-60 space-y-1 text-xs mb-10">
          <span>By: {post.data.author_name}</span>
          <span>Published on: {post.data.publish_date}</span>
        </div>

        {/* Content */}
        <div
          style={{ lineHeight: 2 }}
          className="prose prose-invert text-sm max-w-none prose-p:text-gray-200 prose-li:text-gray-200"
        >
          <PrismicRichText field={post.data.content} />
        </div>
      </article>
    </div>
  );
}
