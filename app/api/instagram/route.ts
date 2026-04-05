const BEHOLD_FEED_URL = "https://feeds.behold.so/ConFG3OOtjS5YhMqB4Cn";

export async function GET() {
  try {
    const res = await fetch(BEHOLD_FEED_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return Response.json({ posts: [] }, { status: 200 });
    }

    const data = await res.json();
    return Response.json({ posts: data.posts ?? [] });
  } catch {
    return Response.json({ posts: [] }, { status: 200 });
  }
}
