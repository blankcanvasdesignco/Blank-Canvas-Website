import * as prismic from "@prismicio/client";

const repoName = import.meta.env.VITE_PRISMIC_REPO_NAME;
const endpoint = prismic.getRepositoryEndpoint(repoName);

export const client = prismic.createClient(endpoint, {
  accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN, // only if repo is private
  routes: [{ type: "blog_posts", path: "/blogs/:uid" }],
});
