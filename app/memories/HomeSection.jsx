"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export default function HomeSection() {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Menghitung posisi kursor relatif terhadap container
  function handleMouseMove(event) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden flex items-center">
      {/* Background Glow Hangat (Amber) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* SISI KIRI: TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="z-10 order-2 lg:order-1"
        >
          <span className="text-amber-400/60 font-sans tracking-[0.4em] text-[10px] uppercase">
            Homesick
          </span>
          <h2 className="font-serif italic text-5xl md:text-7xl text-white mt-6 mb-8 leading-[1.1]">
            Rindu Rumah & <br />
            <span className="text-amber-200">Pulang.</span>
          </h2>
          <p className="font-sans text-white/50 leading-loose text-base md:text-lg max-w-md">
            Aku tahu kamu sering kangen rumah sampe nangis. Dari rasa kangenmu
            sama masakan rumah & Kay. Tapi inget, kamu lagi berjuang di Malang
            buat mereka bangga. Setiap langkahmu hadiah untuk mereka di rumah.
          </p>
          <div className="mt-8 flex items-center gap-4 text-amber-200/30 italic font-serif">
            <span className="h-[1px] w-8 bg-amber-200/20"></span>
            <span>Kamu kuat & kamu hebat, Sayang.</span>
          </div>
        </motion.div>

        {/* SISI KANAN: INTERACTIVE FADE/REVEAL (2 LAPISAN FOTO) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={(e) => {
            // Support untuk touch di HP
            handleMouseMove(e.touches[0]);
            setIsRevealed(true); // Tampilkan teks panduan saat disentuh
          }}
          onMouseEnter={() => setIsRevealed(true)} // Tampilkan teks panduan saat hover
          onMouseLeave={() => setIsRevealed(false)} // Sembunyikan saat mouse pergi
          className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center cursor-none group"
        >
          {/* TEKS PANDUAN (Akan Fade Out saat kursor masuk) */}
          <motion.p
            animate={{ opacity: isRevealed ? 0 : 0.3 }}
            className="absolute top-0 text-white font-sans text-[10px] tracking-widest uppercase z-30 pointer-events-none"
          >
            *Gunakan jarimu untuk menyembuhkan rindu
          </motion.p>

          {/* LAPISAN 1: FOTO BURAM (Latar Belakang - Homesick) */}
          <div className="absolute w-full h-[85%] overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl">
            <Image
              fill
              src="/family/famili.png" // Contoh: Foto keponakan/makanan Mama (BURAM/BW)
              alt="Rumah"
              className="object-cover grayscale blur-xl opacity-40 scale-105 pointer-events-none"
            />
          </div>

          {/* LAPISAN 2: FOTO TAJAM (Yang Akan Di-reveal - Healing) */}
          <motion.div
            style={{
              position: "absolute",
              width: "100%",
              height: "85%",
              overflow: "hidden",
              borderRadius: "2.5rem",
              // SVG Masking: Membuat lingkaran tajam di posisi kursor
              maskImage: useTransform(
                [x, y],
                ([latestX, latestY]) =>
                  `radial-gradient(150px circle at ${latestX}px ${latestY}px, black 100%, transparent 100%)`,
              ),
              WebkitMaskImage: useTransform(
                [x, y],
                ([latestX, latestY]) =>
                  `radial-gradient(150px circle at ${latestX}px ${latestY}px, black 100%, transparent 100%)`,
              ),
            }}
            className="border border-white/10 shadow-2xl"
          >
            <Image
              fill
              src="/family/famili.png" // FOTO YANG SAMA (TAJAM/WARNA)
              alt="Rumah Tajam"
              className="object-cover pointer-events-none scale-105"
            />
          </motion.div>

          {/* CUSTOM KURSOR (Lingkaran Glow Hangat) */}
          <motion.div
            style={{ x, y }}
            className="absolute top-0 left-0 w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 border-2 border-amber-200/50 rounded-full shadow-[0_0_30px_rgba(255,191,0,0.4)] pointer-events-none z-50 transition-opacity group-hover:opacity-100 opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
