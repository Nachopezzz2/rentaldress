const BEHOLD_FEED_URL = "https://feeds.behold.so/ConFG3OOtjS5YhMqB4Cn";

export interface BeholdPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  permalink: string;
  caption: string | null;
  prunedCaption: string | null;
  timestamp: string;
  sizes: {
    small: { mediaUrl: string };
    medium: { mediaUrl: string };
    large: { mediaUrl: string };
    full: { mediaUrl: string };
  };
  children?: BeholdPost[];
}

export interface BeholdFeed {
  username: string;
  posts: BeholdPost[];
}

export async function getInstagramFeed(): Promise<BeholdPost[]> {
  try {
    const res = await fetch("/api/instagram");
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts ?? [];
  } catch {
    return [];
  }
}

// Expands CAROUSEL_ALBUM posts into their individual child images
export function flattenPosts(posts: BeholdPost[]): BeholdPost[] {
  return posts.flatMap((post) => {
    if (post.mediaType === "CAROUSEL_ALBUM" && post.children?.length) {
      return post.children.filter((c) => c.mediaType !== "VIDEO");
    }
    return post.mediaType !== "VIDEO" ? [post] : [];
  });
}

export function getPostImageUrl(post: BeholdPost): string {
  return (
    post.sizes?.large?.mediaUrl ||
    post.sizes?.medium?.mediaUrl ||
    post.sizes?.full?.mediaUrl ||
    post.mediaUrl
  );
}
