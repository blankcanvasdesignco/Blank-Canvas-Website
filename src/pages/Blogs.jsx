import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../lib/prismic";
import { PrismicImage, PrismicText } from "@prismicio/react";

export default function Blogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .getAllByType("blog_posts", {
        orderings: [{ field: "my.blog_posts.publish_date", direction: "desc" }],
      })
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div className="min-h-screen font-unbounded bg-black text-white">
      <div className="max-w-6xl mx-auto py-12 space-y-12">
        <h1 className="text-3xl font-semibold">Blog</h1>

        <ul className="space-y-12">
          {posts.map((p) => (
            <li
              key={p.uid}
              className="flex flex-col md:flex-row items-start gap-6"
            >
              {/* Image */}
              {p.data.cover_image && (
                <Link to={p.url} className="flex-shrink-0">
                  <PrismicImage
                    field={p.data.cover_image}
                    className="w-[350px] h-[200px] rounded-xl object-cover"
                  />
                </Link>
              )}

              {/* Text content */}
              <div className="flex flex-col items-start h-[200px] justify-around">
                <Link to={p.url}>
                  <h2 className="text-2xl mb-3">
                    <PrismicText field={p.data.title} />
                  </h2>
                </Link>

                {/* Subtext / Description */}
                <p className="opacity-60 text-sm max-w-xl mb-4 line-clamp-3">
                  <PrismicText field={p.data.seo_title} />
                </p>

                {/* Meta info */}
                <div className="text-xs opacity-60 flex flex-wrap gap-4 mb-4">
                  <span>
                    {p.data.reading_time} min read | {p.data.author_name}{" "}
                  </span>
                </div>

                {/* Read More button */}
                <Link
                  to={p.url}
                  className="inline-block bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  Read more
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
