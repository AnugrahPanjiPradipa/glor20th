"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// 1. KOMPONEN TEKS KETIK (Optimasi efisiensi)
function TypingText({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isInView && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [isInView, currentIndex, text]);

  return (
    <div ref={ref} className="relative px-4">
      <p className="font-sans text-white/80 leading-[2.2] text-lg md:text-2xl text-center max-w-3xl mx-auto tracking-wide italic">
        &quot;{displayedText}&quot;
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[2px] h-6 bg-pink-400 ml-2 translate-y-1"
        />
      </p>
    </div>
  );
}

export default function BirthdayClosingSection() {
  const birthdayMessage = `
    Selamat ulang tahun, Sayang! Di hari spesialmu ini, aku cuma mau bilang betapa bersyukurnya aku punya kamu. 
    Melihatmu tumbuh, berjuang, dan selalu berhasil melewati semua sejauh ini adalah hal-hal yang membuatku yakin kalau kamu tambah dewasa. 
    Semoga tahun ini membawa lebih banyak tawa, keberhasilan untuk studimu, dan tentu saja, lebih banyak petualangan bareng aku. 
    Aku akan selalu di sini, mendukungmu dan menemanimu di semua kegiatan, halangan, serta kejadianmu. Tidak lupa juga jadi rumah tempatmu pulang. 
    I love you, more than all the stars in the sky.
  `;

  return (
    <section className="min-h-screen bg-[#121212] relative overflow-hidden flex items-center justify-center py-20 px-6">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 opacity-50" />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-5xl w-full z-10 text-center">
        {/* Judul Utama */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="text-pink-400/40 font-sans tracking-[0.6em] text-[10px] md:text-xs uppercase block mb-6">
            A Final Letter For You
          </span>
          {/* PERBAIKAN: Warna font dibuat tegas (Solid White) tanpa gradient */}
          <h2 className="font-serif italic text-6xl md:text-[10rem] text-white leading-none tracking-tighter">
            Our{" "}
            <span className="text-pink-400">
              Future.
            </span>
          </h2>
        </motion.div>

        {/* Typing Message Container */}
        <div className="flex justify-center min-h-[300px] md:min-h-[200px]">
          <TypingText text={birthdayMessage} />
        </div>

        {/* Signature & Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 2 }}
          className="mt-24 flex flex-col items-center gap-8"
        >
          <div className="h-[1px] w-16 bg-white/20"></div>

          <div className="text-center">
            <p className="font-serif italic text-2xl md:text-3xl text-white/90 mb-2">
              Dari Panji, untuk Dunianya.
            </p>
            <p className="font-sans text-[10px] tracking-[0.4em] text-white/20 uppercase mt-4">
              25 Maret • 2026
            </p>
          </div>

          {/* Tombol Back to Top */}
          <motion.button
            whileHover={{
              letterSpacing: "0.5em",
              color: "rgba(255,255,255,0.8)",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 text-white/20 font-sans text-[9px] tracking-[0.3em] uppercase transition-all duration-500 cursor-pointer"
          >
            [ Kembali ke Awal ]
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}