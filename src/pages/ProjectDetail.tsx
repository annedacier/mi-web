import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import SiteLayout from "@/components/SiteLayout";
import { findProject } from "@/data/portfolio";

const variants = [
  { aspect: "aspect-[3/4]", offset: "" },
  { aspect: "aspect-[4/5]", offset: "md:mt-16 mt-6" },
  { aspect: "aspect-[3/4]", offset: "md:mt-8 mt-3" },
  { aspect: "aspect-[4/5]", offset: "md:-mt-6" },
  { aspect: "aspect-[3/4]", offset: "md:mt-12 mt-4" },
  { aspect: "aspect-[4/5]", offset: "" },
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const found = id ? findProject(id) : undefined;
  if (!found) return <Navigate to="/" replace />;
  const { project, category } = found;
  const images = project.images.map((src, i) => ({
    src,
    alt: `${project.title} — ${i + 1}`,
  }));

  const handleNext = () =>
    selectedPhoto !== null &&
    setSelectedPhoto((selectedPhoto + 1) % images.length);
  const handlePrev = () =>
    selectedPhoto !== null &&
    setSelectedPhoto(
      (selectedPhoto - 1 + images.length) % images.length
    );

  return (
    <SiteLayout>
      <SEO
        title={`${project.title} — Yuri Dacier`}
        description={`${project.title} — ${category.label} project by Yuri Dacier.`}
      />
      <div className="px-4 md:px-10 lg:px-16 pt-16 md:pt-24">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-20"
        >
          <p
            className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {category.label}
          </p>          
          <h1
            className="font-bold uppercase tracking-[0.04em] text-[2rem] md:text-[3.5rem] leading-none mb-4 text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {project.title}
          </h1>
        </motion.header>

        <div className="grid grid-cols-3 gap-x-3 md:gap-x-6 gap-y-6 md:gap-y-16">
          {images.map((image, index) => {
            const v = variants[index % variants.length];
            return (
              <motion.button
                key={image.src + index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (index % 3) * 0.1,
                }}
                onClick={() => setSelectedPhoto(index)}
                className={`group cursor-pointer block text-left ${v.offset}`}
              >
                <div className={`relative overflow-hidden bg-muted ${v.aspect}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedPhoto !== null && (
        <Lightbox
          photo={images[selectedPhoto]}
          onClose={() => setSelectedPhoto(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          currentIndex={selectedPhoto}
          totalPhotos={images.length}
        />
      )}
    </SiteLayout>
  );
};

export default ProjectDetail;
