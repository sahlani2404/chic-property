import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { MapSection } from "@/components/MapSection";
import { PropertyCard } from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Linear Property — Hunian Pilihan di Seluruh Indonesia" },
      { name: "description", content: "Villa tropis, rumah keluarga, dan apartemen kota — kurasi properti pilihan dari Jakarta, Bali, dan Bandung." },
    ],
  }),
  component: Home,
});

function Home() {
  const { items: properties } = useProperties();
  const featured = properties.slice(0, 3);
  return (
    <main>
      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              <span className="h-px w-8 bg-accent" /> Studio Properti
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
              Hunian yang<br />
              <span className="italic text-accent">menenangkan</span> jiwa.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              Kami mengkurasi rumah, villa, dan apartemen terpilih di kota-kota
              terbaik Indonesia — agar setiap keluarga menemukan ruang untuk
              tumbuh.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/properties" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">
                Jelajahi Properti <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:bg-secondary transition">
                Tentang Kami
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
              <img src={heroImg} alt="Villa tropis modern Linear Property" width={1600} height={1100} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border py-8">
          {[
            ["120+", "Properti Terkurasi"],
            ["12", "Kota di Indonesia"],
            ["98%", "Klien Puas"],
            ["15 Th", "Pengalaman"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl md:text-4xl">{n}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Pilihan Editor</div>
            <h2 className="font-display text-4xl md:text-5xl">Properti Unggulan</h2>
          </div>
          <Link to="/properties" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-accent transition">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Klik salah satu foto untuk membuka detail rumah dalam pop-up.
        </p>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Filosofi Kami</div>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Rumah bukan sekadar bangunan,<br />ia adalah <span className="italic">cerita</span>.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Selama 15 tahun, Linear Property membantu ratusan keluarga menemukan
            ruang yang merefleksikan nilai mereka. Setiap properti yang kami
            kurasi melewati standar arsitektur, lokasi, dan kualitas hidup
            yang ketat.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {properties.slice(3, 7).map((p) => (
            <div key={p.id} className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={p.images[0]} alt={p.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>
    
      {/* LOKASI KAMI */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-32 mb-16">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Kunjungi Kami</div>
          <h2 className="font-display text-4xl md:text-5xl">Lokasi Kantor</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Jl. Rambutan No.10, RT.002/RW.011, Jatimekar, Kec. Jatiasih, Kota Bekasi, Jawa Barat 17422</p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
          <MapSection />
        </div>
        <div className="mt-6 text-center">
          <a href="https://maps.app.goo.gl/JbnkVUb856w7mNmN9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">Buka di Google Maps</a>
        </div>
      </section>
    </main>
  );
}
