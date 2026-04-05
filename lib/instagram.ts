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

export function getPostImageUrl(post: BeholdPost): string {
  return (
    post.sizes?.large?.mediaUrl ||
    post.sizes?.medium?.mediaUrl ||
    post.sizes?.full?.mediaUrl ||
    post.mediaUrl
  );
}
