// app/memories/page.tsx
import { getLocalPhotos } from "./getPhotosServer";
import LifeSections from "./AgriLifeSections";
import MemoriesGalleryClient from "./MemoriesGalleryClient";
import AgriLifeSection from "./AgriLifeSections";
import HomeSection from "./HomeSection";
import UsSection from "./UsSection";
import BirthdayClosingSection from "./BirthdayClosingSection";

export default async function MemoriesPage() {
  const photos = await getLocalPhotos();

  return (
    <main className="min-h-screen bg-black">
      {photos.length > 0 ? (
        <MemoriesGalleryClient initialPhotos={photos} />
      ) : (
        <div className="flex items-center justify-center h-screen text-white/50 italic">
          No memories yet. Add photos to /public/memories folder.
        </div>
      )}
      <AgriLifeSection />
      <HomeSection />
      <UsSection />
      <BirthdayClosingSection />
    </main>
  );
}
