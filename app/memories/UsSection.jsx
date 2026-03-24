"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useMemo } from "react";

// 1. TAMBAHKAN BANYAK SLOT FOTO (Bisa ditambah sesuai keinginan)
const memories = [
  { id: 1, src: "/us/first.jpg", title: "Ngedate Pertama", desc: "Momen awal kita.", x: "10%", delay: 0 },
  { id: 2, src: "/us/swim.jpg", title: "Olahraga bareng", desc: "Kegiatan sehat la sekali kali.", x: "75%", delay: 0.2 },
  { id: 3, src: "/us/motor.jpg", title: "Motoran", desc: "Motoran keliling kota bareng.", x: "25%", delay: 0.1 },
  { id: 4, src: "/us/wisata.jpg", title: "Berwisata", desc: "Wisata asik dicoba.", x: "85%", delay: 0.3 },
  { id: 5, src: "/us/mam.jpg", title: "Kulineran", desc: "Kuliner enak kita samper.", x: "50%", delay: 0.15 },
  { id: 6, src: "/us/photo.jpeg", title: "Photobooth", desc: "Photobooth unik kita gass.", x: "5%", delay: 0.25 },
  { id: 7, src: "/us/anniv.jpg", title: "1st Anniversary", desc: "Anniversary setahun kita.", x: "65%", delay: 0.05 },
  { id: 8, src: "/us/wish.jpg", title: "Our wish", desc: "Semoga tercapai apa yang kita inginkan.", x: "40%", delay: 0.35 },
];

function MemoryCard({ item, index, scrollYProgress }) {
  // Parallax: Semakin tinggi index, semakin cepat gerakannya agar ada efek depth
  const speed = (index % 3) + 2; 
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [1000 * (index * 0.2 + 1), -1000 * (index * 0.1 + 1)]
  );
  
  const rotate = useTransform(
    scrollYProgress, 
    [0, 1], 
    [index % 2 === 0 ? -15 : 15, index % 2 === 0 ? 15 : -15]
  );

  return (
    <motion.div
      style={{ 
        y, 
        rotate,
        left: item.x, // Menggunakan posisi X yang sudah menyebar
        zIndex: index 
      }}
      className="absolute top-0 w-40 md:w-60 aspect-[3/4] group shadow-2xl"
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 bg-[#1a1a1a]">
        <Image 
          fill
          src={item.src}
          alt={item.title}
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 flex flex-col justify-end">
          <h4 className="text-white font-serif italic text-sm md:text-base">{item.title}</h4>
          <p className="text-white/60 text-[10px] md:text-xs font-sans mt-1">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdventureSection() {
  const containerRef = useRef(null);
  
  // Durasi scroll dibuat lebih panjang (400vh) agar foto tidak lewat terlalu cepat
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xText = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);

  return (
    <section ref={containerRef} className="min-h-[400vh] bg-[#0a0a0a] relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Text */}
        <motion.div 
          style={{ x: xText }}
          className="absolute whitespace-nowrap text-[18vw] font-serif italic text-white/[0.03] pointer-events-none select-none z-0"
        >
          TOGETHER FOREVER • KITA MAIN BARENG • MEMORIES • ADVENTURE
        </motion.div>

        {/* Header Tetap di Tengah */}
        <div className="z-20 text-center pointer-events-none">
          <span className="text-pink-400/60 font-sans tracking-[0.4em] text-[10px] uppercase">Kencan</span>
          <h2 className="font-serif italic text-5xl md:text-7xl text-white mt-4 drop-shadow-lg">
            Ke Mana Pun <br />
            <span className="text-pink-200 text-3xl md:text-5xl">Asal Sama Kamu.</span>
          </h2>
        </div>

        {/* Container Foto yang Menyebar */}
        <div className="absolute inset-0 w-full h-full z-10 overflow-hidden">
          {memories.map((item, index) => (
            <MemoryCard 
              key={item.id} 
              item={item} 
              index={index} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
        
        {/* Visual Guide */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-30">
          <span className="text-white text-[9px] tracking-[0.3em] uppercase">Keep Scrolling</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
}