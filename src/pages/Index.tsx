import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  const getCategoryImages = (cat: any) => {
    if (SHOW_PROJECTS) {
      return cat.projects;
    }

    return cat.projects.flatMap((p: any) => p.images);
  };

  return (
    <SiteLayout>
      <SEO />
      {portfolio.map((cat, sIdx) => (
        <section
          key={cat.id}
          id={cat.id}
          data-category={cat.id}
          className="px-4 md:px-10 lg:px-16 pt-12 md:pt-16 pb-24 md:pb-32 border-b border-border/40 last:border-b-0 first:pt-10 md:first:pt-14 scroll-mt-10"
        >
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 md:mb-16"
          >
            <h2
              className="font-medium tracking-[0.02em] text-[1.4rem] md:text-[2rem] leading-none text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {cat.label}
            </h2>
          </motion.header>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-6 gap-y-10 md:gap-y-16">
            {getCategoryImages(cat).map((project: any, i: number) => {
              const v = variants[(sIdx + i) % variants.length];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.12,
                  }}
                  className={v.offset}
                >
                  <Link to={`/projects/${project.id}`} className="group block">
                    <div
                      className={`relative overflow-hidden bg-muted ${v.aspect}`}
                    >
                      <img
                        src={project.cover ?? project}
                        alt={project.title ?? ""}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <h3
                      className="mt-3 text-[0.95rem] md:text-[1.05rem] tracking-[0.02em] text-foreground"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {project.title}
                    </h3>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}
    </SiteLayout>
  );
};

export default Index;
