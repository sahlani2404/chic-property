import { createFileRoute } from "@tanstack/react-router";

import gevana from "@/assets/portfolio/gevana-1.png";
import gevana2 from "@/assets/portfolio/gevana-2.png";
import gevana3 from "@/assets/portfolio/gevana-3.png";
import naputa from "@/assets/portfolio/naputa-1.png";
import naputa2 from "@/assets/portfolio/naputa-2.jpg";
import naputa3 from "@/assets/portfolio/naputa-3.png";
import linaya from "@/assets/portfolio/linaya-1.png";
import linaya2 from "@/assets/portfolio/linaya-2.png";
import linaya3 from "@/assets/portfolio/linaya-3.png";
import tohami from "@/assets/portfolio/tohami.png";
import ir from "@/assets/portfolio/ir.png";
import aksara from "@/assets/portfolio/aksara.png";
import jp from "@/assets/portfolio/JP.png";
import maison from "@/assets/portfolio/maison.png";
import lb from "@/assets/portfolio/lb.png";
import amaranta from "@/assets/portfolio/amaranta.png";
import tebet from "@/assets/portfolio/tebet.png";
import multi from "@/assets/portfolio/multi.png";
import jms from "@/assets/portfolio/jms.png";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portofolio — Linear Property" },
      { name: "description", content: "Portofolio proyek Linear Indonesia — Development Project, Design Product, dan Media & Promotion." },
    ],
  }),
  component: PortfolioPage,
});

type Project = {
  name: string;
  type: string;
  location: string;
  area?: string;
  units?: string;
  desc?: string;
  image: string;
  gallery?: string[];
};

const developmentProjects: Project[] = [
  {
    name: "Gevana Residence",
    type: "Perumahan",
    location: "Cirendeu, Tangerang Selatan",
    area: "3.500 m²",
    units: "28 Unit",
    desc: "Hunian modern dengan aksen kayu dan jendela besar — interior hangat untuk keluarga muda.",
    image: gevana,
    gallery: [gevana, gevana2, gevana3],
  },
  {
    name: "Naputa",
    type: "Perumahan",
    location: "Ciputat, Tangerang Selatan",
    area: "1.383 m²",
    units: "14 Unit",
    desc: "Townhouse modern dengan fasad abu-abu, dinding hijau, dan area bermain komunal.",
    image: naputa,
    gallery: [naputa, naputa2, naputa3],
  },
  {
    name: "Linaya Community Living",
    type: "Perumahan",
    location: "Ciputat, Tangerang Selatan",
    area: "3.300 m²",
    units: "33 Unit",
    desc: "Hunian komunitas dengan gerbang berlapis ivy, plafon tinggi, dan ruang open-plan.",
    image: linaya,
    gallery: [linaya, linaya2, linaya3],
  },
];

const designProjects: Project[] = [
  { name: "Tahomi Town House", type: "Perumahan", location: "Tapos, Depok", image: tohami },
  { name: "IR Town House", type: "Perumahan", location: "Ciputat, Tangerang Selatan", image: ir },
  { name: "Aksara Bricks", type: "Perumahan", location: "Pasar Minggu, Jakarta Selatan", image: aksara },
  { name: "JP Town House", type: "Perumahan", location: "Jati Padang, Jakarta Selatan", image: jp },
  { name: "Maison Aksara", type: "Perumahan", location: "Kebagusan, Jakarta Selatan", image: maison },
  { name: "LB House", type: "Perumahan", location: "Lebak Bulus, Jakarta Selatan", image: lb },
  { name: "Amaranta Residence", type: "Perumahan", location: "Sukabumi, Jawa Barat", image: amaranta },
  { name: "Tebet Kost", type: "Komersial / Boarding House", location: "Tebet, DKI Jakarta", image: tebet },
  { name: "Multi Layer House", type: "Residential", location: "Samarinda", image: multi },
  { name: "JMS Land Bandung", type: "Kawasan Terpadu", location: "Bandung", image: jms },
];

const mediaWorks = [
  { title: "Instagram Content", desc: "Reel review properti dengan engagement ribuan reach per post." },
  { title: "YouTube Property Review", desc: "Channel Rumah Impian — review hunian unik & rumah tumbuh." },
  { title: "360 Video Render", desc: "Walkthrough virtual untuk unit show-case sebelum dibangun." },
  { title: "Company Profile & Brosur", desc: "Produksi video profile, booklet, dan brosur marketing." },
];

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-20">
      <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">{eyebrow}</div>
      <h2 className="font-display text-4xl md:text-5xl mb-10">{title}</h2>
      {children}
    </section>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-soft)] transition group">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      {p.gallery && p.gallery.length > 1 && (
        <div className="grid grid-cols-3 gap-1 p-1">
          {p.gallery.slice(0, 3).map((g, i) => (
            <div key={i} className="aspect-video overflow-hidden bg-muted">
              <img src={g} alt={`${p.name} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
      <div className="p-6">
        <div className="text-xs uppercase tracking-wider text-accent">{p.type}</div>
        <h3 className="font-display text-2xl mt-2">{p.name}</h3>
        <div className="text-sm text-muted-foreground mt-2">{p.location}</div>
        {(p.area || p.units) && (
          <div className="flex gap-4 mt-4 text-sm">
            {p.area && (
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Luas</div>
                <div className="font-display">{p.area}</div>
              </div>
            )}
            {p.units && (
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Unit</div>
                <div className="font-display">{p.units}</div>
              </div>
            )}
          </div>
        )}
        {p.desc && <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>}
      </div>
    </div>
  );
}

function DesignCard({ p }: { p: Project }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-soft)] transition group">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider text-accent">{p.type}</div>
        <h3 className="font-display text-xl mt-1">{p.name}</h3>
        <div className="text-sm text-muted-foreground mt-1">{p.location}</div>
      </div>
    </div>
  );
}

function PortfolioPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Our Portofolio</div>
        <h1 className="font-display text-5xl md:text-6xl leading-tight">
          Karya yang kami <span className="italic">banggakan</span>.
        </h1>
        <p className="mt-6 text-muted-foreground text-lg">
          Kumpulan proyek dari tiga unit bisnis Linear Indonesia — mulai dari
          pengembangan kawasan, desain produk, hingga produksi media.
        </p>
      </div>

      <Section eyebrow="Development Project" title="Proyek yang Kami Bangun">
        <div className="grid md:grid-cols-3 gap-6">
          {developmentProjects.map((p) => <FeaturedCard key={p.name} p={p} />)}
        </div>
      </Section>

      <Section eyebrow="Design Product" title="Desain & Konsep Hunian">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designProjects.map((p) => <DesignCard key={p.name} p={p} />)}
        </div>
      </Section>

      <Section eyebrow="Media & Promotion" title="Karya Media Linear">
        <div className="grid md:grid-cols-2 gap-6">
          {mediaWorks.map((m) => (
            <div key={m.title} className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <h3 className="font-display text-2xl">{m.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
