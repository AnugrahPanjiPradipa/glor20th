"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  { id: 1, src: "/AgriLife/Prak.jpeg", angle: -8, label: "Praktikum" },
  { id: 2, src: "/AgriLife/fieldtrip.jpeg", angle: 4, label: "Field Trip" },
  { id: 3, src: "/AgriLife/tugas.jpeg", angle: -2, label: "Pacar Keduamu" },
  { id: 4, src: "/AgriLife/scientist.jpeg", angle: 10, label: "The Scientist!" },
];

export default function AgriLifeSection() {
  return (
    <section className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden flex items-center">
      
      {/* Glow Hijau Pertanian di Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* SISI KIRI: TEXT */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <span className="text-green-400/60 font-sans tracking-[0.4em] text-[10px] uppercase">Kuliah</span>
          <h2 className="font-serif italic text-5xl md:text-7xl text-white mt-6 mb-8 leading-[1.1]">
            Laprak, Begadang, & <br />
            <span className="text-green-200">Lahan.</span>
          </h2>
          <p className="font-sans text-white/50 leading-loose text-base md:text-lg max-w-md">
            Dari panas-panasan di lahan sampai begadang demi tugas. 
            Dari kapok berorganisasi sampai mau KKN, 
            Aku tetep bangga sama kamu sayang, semoga dilancarkan urusanmu.
          </p>
          <div className="mt-8 flex items-center gap-4 text-green-200/30 italic font-serif">
            <span className="h-[1px] w-8 bg-green-200/20"></span>
            <span>YOU CAN ALWAYS DO IT!</span>
          </div>
        </motion.div>

        {/* SISI KANAN: INTERACTIVE STACK (FREE DRAG) */}
        <div className="relative h-[600px] w-full flex items-center justify-center cursor-crosshair">
          <p className="absolute top-0 text-white/20 font-sans text-[10px] tracking-widest uppercase animate-pulse">
            *Geser foto-foto ini untuk merapikan meja
          </p>
          
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              drag // Drag bebas tanpa constraints
              whileDrag={{ scale: 1.05, rotate: 0, zIndex: 100 }}
              initial={{ opacity: 0, rotate: photo.angle, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // Supaya saat di-click/touch, foto yang dipegang otomatis naik ke paling atas
              onPointerDown={(e) => e.currentTarget.style.zIndex = "50"}
              className="absolute w-72 h-[400px] bg-[#f9f9f9] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing border-b-[40px] border-white rounded-sm"
            >
              {/* Gambar Polaroid */}
              <div className="relative w-full h-[85%] bg-neutral-200 overflow-hidden pointer-events-none">
                <Image 
                  fill
                  src={photo.src} 
                  alt={photo.label}
                  className="object-cover"
                />
              </div>
              
              {/* Label Tulisan Tangan */}
              <div className="mt-4 text-center">
                <span className="font-serif italic text-neutral-700 text-base md:text-lg select-none">
                  {photo.label}
                </span>
              </div>

              {/* Aksen "Selotip" di atas foto agar makin estetik */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-green-200/20 backdrop-blur-sm -rotate-3 border border-white/10" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}