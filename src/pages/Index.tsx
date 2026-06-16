import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import SiteLayout from "@/components/SiteLayout";
import { portfolio } from "@/data/portfolio";

// Subtle editorial rhythm for project thumbnails.
const variants = [
  { aspect: "aspect-[3/4]", offset: "" },
  { aspect: "aspect-[4/5]", offset: "md:mt-10" },
  { aspect: "aspect-[3/4]", offset: "md:mt-4" },
  { aspect: "aspect-[4/5]", offset: "md:-mt-4" },
];

const Index = () => {
  // 🚫 PROYECTOS (true = proyectos / false = fotos sueltas)
  const SHOW_PROJECTS = false;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [flatImages, setFlatImages] = useState<string[]>([]);

  const getCategoryImages = (cat: any) => {
    if (SHOW_PROJECTS) {
      return cat.projects.map((p: any) => ({
        type: "project",
        id: p.id,
        title: p.title,
        image: p.cover,
      }));
    }

    const seen = new Set();

    return cat.projects
      .flatMap((p: any) =>
        (p.images || []).map((img: string) => ({
          type: "image",
          id: img,
          title: p.title,
          image: img,
        }))
      )
      .filter((item: any) => {
        if (seen.has(item.image)) return false;
        seen.add(item.image);
        return true;
      });
  };

  const goNext = () => {
    if (selectedIndex === null) return;

    setIsAnimating(true);

    const next = (selectedIndex + 1) % flatImages.length;

    setTimeout(() => {
      setSelectedIndex(next);
      setSelectedImage(flatImages[next]);
      setIsAnimating(false);
    }, 150);
  };

  const goPrev = () => {
    if (selectedIndex === null) return;

    setIsAnimating(true);

    const prev =
      (selectedIndex - 1 + flatImages.length) % flatImages.length;

    setTimeout(() => {
      setSelectedIndex(prev);
      setSelectedImage(flatImages[prev]);
      setIsAnimating(false);
    }, 150);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, selectedIndex, flatImages]);

  return (
    <SiteLayout>
      <SEO />

      {portfolio.map((cat, sIdx) => {
        const items = getCategoryImages(cat);

        return (
          <section
            key={cat.id}
            id={cat.id}
            data-category={cat.id}
            className="px-4 md:px-10 lg:px-16 pt-12 md:pt-16 pb-24 md:pb-32 border-b border-border/40 last:border-b-0 first:pt-10 md:first:pt-14 scroll-mt-10"
          >
            <motion.header
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-10 md:mb-16"
            >
              <h2
                className="font-medium tracking-[0.02em] text-[1.4rem] md:text-[2rem] text-foreground"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {cat.label}
              </h2>
            </motion.header>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-6 gap-y-10 md:gap-y-16">
              {items.map((item: any, i: number) => {
                const v = variants[(sIdx + i) % variants.length];

                return (
                  <motion.div
                    key={item.id}
                    className={v.offset}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.12,
                    }}
                  >
                    <div
                      className="cursor-pointer group"
                      onClick={() => {
                        if (item.type !== "project") {
                          const images = items
                            .filter((i: any) => i.type === "image")
                            .map((i: any) => i.image);

                          const index = images.indexOf(item.image);

                          setFlatImages(images);
                          setSelectedIndex(index);
                          setSelectedImage(item.image);
                        }
                      }}
                    >
                      <div
                        className={`relative overflow-hidden bg-muted ${v.aspect}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title || ""}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.04]"
                        />
                      </div>

                      {item.type === "project" && (
                        <h3
                          className="mt-3 text-[0.95rem] md:text-[1.05rem]"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                          }}
                        >
                          {item.title}
                        </h3>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}
      {/* LIGHTBOX */}
      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.img
              key={selectedImage}
              src={selectedImage}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
};

export default Index;