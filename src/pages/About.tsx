import SEO from "@/components/SEO";
import SiteLayout from "@/components/SiteLayout";

const About = () => (
  <SiteLayout>
    <SEO title="About — Yuri Dacier" description="About Yuri Dacier, still life and product photographer." />
    <div className="px-4 md:px-10 lg:px-16 pt-16 md:pt-24 max-w-4xl">
      <h1 className="font-display font-light text-3xl md:text-5xl tracking-wide mb-12">About</h1>
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <img
          src="/images/photo-05.jpg"
          alt="Yuri Dacier"
          className="w-full aspect-[3/4] object-cover bg-muted"
        />
        <div className="space-y-5 text-body text-muted-foreground pt-2">
          <p>
            I'm Yuri Dacier, a still life and product photographer passionate
            about discovering beauty in everyday objects and compositions.
          </p>
          <p>
            My work focuses on the interplay of light, texture, and form —
            transforming simple subjects into compelling visual narratives.
          </p>
          <p>
            Based in Germany, I work with brands and publications to create
            imagery that captures attention and communicates with clarity.
          </p>
        </div>
      </div>
    </div>
  </SiteLayout>
);

export default About;