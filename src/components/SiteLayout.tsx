import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export const categories = portfolio.map((c) => ({ id: c.id, label: c.label }));

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // After navigating to "/" from another page with a category target in
  // location.state, scroll to the matching section.
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
      if (location.pathname !== "/") return;
      if (!state?.scrollTo) return;

      const id = state.scrollTo;
    // evita scroll automático del navegador interfiriendo
      window.scrollTo(0, 0);

      const timeout = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);

      return () => clearTimeout(timeout);
    }, [location.pathname]);

  // Scroll-spy: observe sections on the home page and highlight the
  // matching sidebar entry. Sections are <section id={categoryId}> in Index.
  useEffect(() => {
    setActiveId(null);
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-category]")
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId((visible[0].target as HTMLElement).dataset.category ?? null);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block uppercase tracking-[0.18em] text-[0.78rem] font-medium transition-colors ${
      isActive ? "text-foreground" : "text-muted-foreground/70 hover:text-foreground"
    }`;

  const categoryClass = () =>
  "block tracking-[0.04em] text-[1.05rem] font-medium text-foreground hover:opacity-60 transition-opacity";

  const categoryFontStyle = { fontFamily: "'Cormorant Garamond', serif" };
  const sublabelFontStyle = { fontFamily: "'Inter', sans-serif" };
  const brandFontStyle = { fontFamily: "'Cormorant Garamond', serif" };

  const goToCategory = (id: string) => {
    setOpen(false);
    if (location.pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const SidebarContent = (
    <div className="flex flex-col md:flex-col h-full py-4 md:py-8 px-4 md:pl-4 md:pr-6 text-left gap-1 md:gap-0">
      {/* Brand */}
      <div className="flex-1">
        <Link
          to="/"
          onClick={(e) => {
            setOpen(false);
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="hidden md:block text-center mb-2 md:mb-0"
        >
          <span
            className="block text-[1.4rem] leading-none text-foreground font-bold uppercase tracking-[0.08em]"
            style={brandFontStyle}
          >
            Yuri Dacier
          </span>
        </Link>

        {/* Categories (desktop + mobile) */}
        <nav className="flex flex-col mt-4 md:mt-10">
          {portfolio.map((c) => {
            const routeActive =
              location.pathname === `/projects/${c.id}` ||
              location.pathname === `/${c.id}`;
            const isActive = routeActive || activeId === c.id;
            const isProjectOfCategory = c.projects.some(
              (p) => location.pathname === `/projects/${p.id}`
            );

// 🚫 PROYECTOS (true = proyectos / false = fotos sueltas)
            const SHOW_PROJECTS = false;
            
            const showProjects = SHOW_PROJECTS && (
              c.projects.length > 0 && isActive || isProjectOfCategory
            );            
            return (
              <div key={c.id} className="py-0.5 md:py-1">
                <button
                  type="button"
                  className={`${categoryClass()} text-left w-full`}
                  style={categoryFontStyle}
                  onClick={() => goToCategory(c.id)}
                >
                  {c.label}
                </button>
                <AnimatePresence initial={false}>
                  {showProjects && (
                    <motion.ul className="hidden md:block overflow-hidden ml-3 space-y-1">
                      <li className="h-1" aria-hidden />
                      {c.projects.map((p) => {
                    const projActive =
                      location.pathname === `/projects/${p.id}`;
                    return (
                      <li key={p.id}>
                        <Link
                          to={`/projects/${p.id}`}
                          onClick={() => setOpen(false)}
                          className={`block text-[0.85rem] leading-snug transition-colors ${
                            projActive
                              ? "text-foreground"
                              : "text-muted-foreground/60 hover:text-foreground"
                          }`}
                          style={categoryFontStyle}
                        >
                          {p.title}
                        </Link>
                      </li>
                    );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Contact info */}
      <div className="mt-4 md:mt-8 text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">
        <NavLink
          to="/contact"
          className="block text-[1.20rem] font-medium tracking-[0.04em] text-foreground normal-case hover:opacity-60 transition-opacity"
          style={categoryFontStyle}
          onClick={() => setOpen(false)}
        >
          Contact
        </NavLink>
        <div className="mt-6 md:mt-80 space-y-2 md:space-y-4">
          <div className="leading-relaxed whitespace-nowrap text-[0.55rem]">
            Frankfurt · Paris · Zürich
          </div>
          <div className="text-[0.50rem]">Available for Commissions</div>
        </div>
        <a
          href="https://www.instagram.com/yuridacier"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="inline-flex items-center mt-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Instagram size={16} strokeWidth={1.50} />
        </a>
        <div className="mt-4 text-[0.55rem]">© {new Date().getFullYear()}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 bg-background/85 backdrop-blur-md border-b border-border/50">
        <Link
          to="/"
          className="text-lg font-bold uppercase tracking-[0.08em]"
          style={brandFontStyle}
        >
          Yuri Dacier
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="text-foreground/70 hover:text-foreground"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Desktop sidebar — LEFT */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-48 z-30 bg-background border-r border-border/40">
        {SidebarContent}
      </aside>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-16 left-0 right-0 w-full max-h-[70vh] overflow-y-auto z-30 bg-background border-t border-border/40"
          >
            {SidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <main className="md:ml-48 pt-20 md:pt-0 pb-safe pb-16 flex-1">
        {children}
      </main>

      {/* Bottom bar */}
      <footer className="md:ml-48 border-t border-border/30 px-6 md:px-8 py-3 flex items-center justify-between text-[0.45rem] tracking-[0.18em] uppercase text-muted-foreground/70 font-light">
        <span style={sublabelFontStyle}>Yuri Dacier · Photographer</span>
        <span style={sublabelFontStyle}>
          © {new Date().getFullYear()}, All Rights Reserved
        </span>
      </footer>
    </div>
  );
};

export default SiteLayout;