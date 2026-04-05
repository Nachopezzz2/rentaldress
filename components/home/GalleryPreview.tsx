"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getInstagramFeed, getPostImageUrl, type BeholdPost } from "@/lib/instagram";

export default function GalleryPreview() {
  const [posts, setPosts] = useState<BeholdPost[]>([]);

  useEffect(() => {
    getInstagramFeed().then((data) => {
      setPosts(data.filter((p) => p.mediaType !== "VIDEO").slice(0, 6));
    });
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-muted mb-4">
            Instagram
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light">
            Nuestra colección
          </h2>
        </div>
        <Link
          href="/galeria"
          className="text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors duration-300 hidden md:block"
        >
          Ver todo →
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="relative aspect-square bg-border overflow-hidden group"
          >
            <Image
              src={getPostImageUrl(post)}
              alt={post.prunedCaption ?? "Rental Dress"}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/galeria"
          className="text-xs tracking-[0.2em] uppercase text-muted hover:text-foreground transition-colors duration-300"
        >
          Ver galería completa →
        </Link>
      </div>
    </section>
  );
}
