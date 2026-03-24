"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const MarqueeRow = ({ photos, reverse = false, speed = "60s" }) => {
  const duplicatedPhotos = [...photos, ...photos];
  return (
    <div className="flex overflow-hidden select-none gap-8 py-4 w-full">
      <div
        className={`flex flex-nowrap gap-8 shrink-0 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: speed }}
      >
        {duplicatedPhotos.map((photo, index) => (
          <div
            key={`${photo.src}-${index}`}
            className="relative w-72 h-96 md:w-[400px] md:h-[550px] shrink-0 overflow-hidden rounded-[2rem] shadow-2xl border border-white/10 group"
          >
            <Image
              fill
              src={photo.src}
              alt="Memory"
              sizes="(max-w-768px) 300px, 450px"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function MemoriesGalleryClient({ initialPhotos }) {
  console.log("Jumlah foto yang diterima:", initialPhotos.length);
  const half = Math.ceil(initialPhotos.length / 2);
  const row1 = initialPhotos.slice(0, half);
  const row2 = initialPhotos.slice(half);

  // Variasi Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen bg-black">
      
      {/* 1. HEADER TITLE (Pindahan dari page.tsx agar bisa dianimasikan) */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center pt-20 pb-10 px-6"
      >
        <motion.p variants={itemVariants} className="font-sans tracking-[0.4em] text-xs uppercase opacity-60 mb-2">
          A DEBUT INTO TWENTY
        </motion.p>
        <motion.h1 variants={itemVariants} className="font-serif italic text-5xl md:text-7xl leading-tight text-amber-200 drop-shadow-lg">
          Your Memories, <span className="text-white">Gloria</span>
        </motion.h1>
        <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 mt-3">
          <span className="h-[1px] w-16 bg-white/30"></span>
          <p className="font-sans text-sm md:text-base font-light tracking-widest text-white/80">
            A Collection of You
          </p>
          <span className="h-[1px] w-16 bg-white/30"></span>
        </motion.div>
      </motion.div>

      {/* 2. MARQUEE BACKGROUND */}
      <div className="relative z-10 space-y-8 py-10">
        <MarqueeRow photos={row1} speed="70s" />
        <MarqueeRow photos={row2} reverse={true} speed="80s" />
      </div>

      {/* 3. CENTER FLOATING TEXT (OUR STORY) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6 text-center mt-32">
        <motion.div 
          initial="hidden"
          whileInView="visible" // Muncul saat scroll atau load
          viewport={{ once: true }}
          variants={containerVariants}
          className="bg-black/40 backdrop-blur-xl px-12 py-10 rounded-[3rem] border border-white/10 shadow-2xl"
        >
          <motion.p variants={itemVariants} className="font-sans tracking-[0.5em] text-[10px] md:text-xs text-amber-200 uppercase mb-3 opacity-90">
            A Journey into 20
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-white font-serif italic text-6xl md:text-8xl drop-shadow-2xl">
            Here are 3 things that you lately did
          </motion.h2>
          <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 mt-6">
            <span className="h-[1px] w-12 bg-white/20"></span>
            <p className="font-serif italic text-sm md:text-lg text-white/60">Presented to you</p>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}