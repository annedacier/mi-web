import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEO from "@/components/SEO";
import SiteLayout from "@/components/SiteLayout";
import Lightbox from "@/components/Lightbox";
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
  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
  // lista global de imágenes (solo fotos sueltas)
  const allImages = portfolio.flatMap((cat) =>
    getCategoryImages(cat)
      .filter((i: any) => i.type === "image")
      .map((i: any) => i.image)
  );
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
            className="px-4 md:px-10 lg:px-16 pt-12 md:pt-16 pb-24 md:pb-32 border-b border-border/40 last:border-b-0 first:pt-10 md:first:pt-14 scroll-mt-0"
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
                          setSelectedIndex(
                            allImages.indexOf(item.image)
                          );
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
      {/* LIGHTBOX (único, limpio) */}
      {selectedIndex !== null && (
        <Lightbox
          photo={{
            src: allImages[selectedIndex],
            alt: "",
          }}
          currentIndex={selectedIndex}
          totalPhotos={allImages.length}
          onClose={() => setSelectedIndex(null)}
          onNext={() =>
            setSelectedIndex((selectedIndex + 1) % allImages.length)
          }
          onPrev={() =>
            setSelectedIndex(
              (selectedIndex - 1 + allImages.length) % allImages.length
            )
          }
        />
      )}
    </SiteLayout>
  );
};

export default Index;