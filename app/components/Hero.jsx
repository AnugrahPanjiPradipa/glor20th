"use client"; // Wajib ditambahkan karena Framer Motion butuh client component

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  // Variasi animasi untuk container (mengatur jeda antar elemen child)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Jeda 0.3 detik antar elemen
      },
    },
  };

  // Variasi animasi untuk setiap elemen teks/button
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* 1. Background Image dengan Fade In Halus */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }} // Redup ke 0.5
        transition={{ duration: 1.5 }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/hero.jpeg"
          alt="Gloria 20th Birthday"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/40" />
      </motion.div>

      {/* 2. Content Layer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative h-full flex flex-col justify-between p-8 md:p-12 lg:pr-12 lg:pl-24"
      >
        {/* POJOK KANAN ATAS */}
        <motion.div variants={itemVariants} className="flex justify-end">
          <div className="text-right text-white">
            <p className="font-sans tracking-[0.3em] text-xs md:text-sm uppercase opacity-70 mb-2">
              The Celebration of
            </p>
            <h1 className="font-serif italic text-6xl md:text-7xl lg:text-8xl leading-none drop-shadow-2xl">
              Gloria&apos;s
            </h1>
            <div className="flex justify-end items-center gap-4 mt-2">
              <span className="h-[1px] w-12 bg-amber-200/50"></span>
              <p className="font-serif text-2xl md:text-3xl italic text-amber-200">
                20th Birthday
              </p>
            </div>
          </div>
        </motion.div>

        {/* POJOK KIRI BAWAH */}
        <div className="flex justify-start items-end">
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-8"
          >
            {/* Quote dengan Animasi Reveal */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-white/80 max-w-xs text-sm md:text-base italic leading-relaxed border-l-2 border-amber-200 pl-4"
            >
              &quot;Two decades of grace, and a lifetime more to go. Happy 20th
              to the one who makes my world a whole lot brighter.&quot;
            </motion.p>

            {/* BUTTON dengan Hover & Tap Animation */}
            <Link href="/memories">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 w-fit overflow-hidden rounded-full bg-white text-black font-sans font-bold tracking-widest transition-all shadow-lg"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  SEE THE MEMORIES
                </span>
                <div className="absolute inset-0 translate-y-full bg-black transition-transform duration-300 ease-out group-hover:translate-y-0"></div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
