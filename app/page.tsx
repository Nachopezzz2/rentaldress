"use client";

import { useState } from "react";
import AnimatedTitle from "@/components/home/AnimatedTitle";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <AnimatedTitle onComplete={() => setIntroComplete(true)} />

      <div
        className={`transition-opacity duration-700 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <CategoryCards />
          <GalleryPreview />
        </main>
        <Footer />
      </div>
    </>
  );
}
