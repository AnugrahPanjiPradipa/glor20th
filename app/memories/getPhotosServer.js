// app/memories/getPhotosServer.ts
import fs from "fs";
import path from "path";

export async function getLocalPhotos() {
  const memoriesDir = path.join(process.cwd(), "public", "memories");
  
  if (!fs.existsSync(memoriesDir)) return [];

  const filenames = fs.readdirSync(memoriesDir);

  // Ambil semua file gambar
  const imageFilenames = filenames.filter((file) =>
    /\.(jpe?g|png|webp)$/i.test(file)
  );

  return imageFilenames.map((filename) => ({
    src: `/memories/${filename}`,
    // Kita set default ukuran portrait agar Masonry tetap cantik
    width: 1080, 
    height: 1350,
    alt: "Gloria Memory"
  }));
}