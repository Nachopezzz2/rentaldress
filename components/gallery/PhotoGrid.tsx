"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getInstagramFeed, getPostImageUrl, type BeholdPost } from "@/lib/instagram";

export default function PhotoGrid() {
  const [posts, setPosts] = useState<BeholdPost[]>([]);
  const [lightbox, setLightbox] = useState<BeholdPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInstagramFeed().then((data) => {
      setPosts(data.filter((p) => p.mediaType !== "VIDEO"));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="columns-2 md:columns-3 gap-2 space-y-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-border animate-pulse break-inside-avoid"
            style={{ aspectRatio: "3/4", marginBottom: "8px" }}
          />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-sm text-muted">La galería está siendo actualizada.</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 md:columns-3 gap-2 space-y-2">
        {posts.map((post, i) => {
          const imageUrl = getPostImageUrl(post);

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="relative overflow-hidden bg-border cursor-pointer group break-inside-avoid mb-2"
              onClick={() => setLightbox(post)}
            >
              <Image
                src={imageUrl}
                alt={post.prunedCaption ?? "Rental Dress"}
                width={600}
                height={800}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            </motion.div>
          );
        })}
      </div>

      {/* More options CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-20 py-16 border-t border-border flex flex-col items-center gap-8 text-center"
      >
        <div className="w-px h-10 bg-border" />
        <div>
          <p className="font-serif text-5xl font-light mb-2">+350</p>
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            vestidos disponibles
          </p>
        </div>
        <p className="text-sm text-muted max-w-xs leading-relaxed">
          Esto es solo una muestra. Vestidos, trajes, sandalias y accesorios
          esperan por vos en el local.
        </p>
        <a
          href="https://instagram.com/rentaldress.uy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs tracking-[0.3em] uppercase border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Más opciones
        </a>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getPostImageUrl(lightbox)}
                alt={lightbox.prunedCaption ?? "Rental Dress"}
                width={900}
                height={1200}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              {lightbox.prunedCaption && (
                <p className="mt-3 text-background/70 text-xs leading-relaxed line-clamp-2">
                  {lightbox.prunedCaption}
                </p>
              )}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 text-background/70 hover:text-background text-2xl leading-none"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
