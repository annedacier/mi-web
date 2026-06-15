import { Mail, Instagram } from "lucide-react";
import SEO from "@/components/SEO";
import SiteLayout from "@/components/SiteLayout";

const Contact = () => (
  <SiteLayout>
    <SEO 
        title="Contact — Yuri Dacier" 
        description="Get in touch with Yuri Dacier." />
    <div className="px-4 md:px-10 lg:px-16 pt-16 md:pt-24 max-w-xl">
      <h1 className="font-display font-light text-3xl md:text-5xl tracking-wide mb-8">Contact</h1>
      <p className="text-body text-muted-foreground mb-10">
        Available for commercial projects, collaborations, and commissioned
        work. 
        I'd love to hear about your vision.
      </p>
      <div className="flex flex-col gap-4">
        <a
          href="mailto:contact@yuridacier.com"
          className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors"
        >
          <Mail size={16} strokeWidth={1.25} />
          <span className="text-[0.85rem] tracking-wide">contact@yuridacier.com</span>
        </a>
        <a
          href="https://www.instagram.com/yuridacier"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors"
        >
          <Instagram size={16} strokeWidth={1.25} />
          <span className="text-[0.85rem] tracking-wide"> </span>
        </a>
      </div>
    </div>
  </SiteLayout>
);

export default Contact;