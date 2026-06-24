import { createFileRoute, Link } from "@tanstack/react-router";
import rezaImg from "@/assets/team/reza.jpg";
import anggaImg from "@/assets/team/angga.jpg";
import raynaldoImg from "@/assets/team/raynaldo.jpg";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Linear Property" },
      { name: "description", content: "Linear Property adalah unit bisnis dari Linear Indonesia — Project Planning with Creative Solution Product Branding." },
    ],
  }),
  component: About,
});

const units = [
  {
    name: "Linear Development",
    tagline: "Management Development Project",
    desc: "Mengembangkan dan mengelola lahan serta modal klien untuk dijadikan proyek properti. Linear Development juga menyiapkan lahan yang akan dikembangkan bersama investor.",
    services: [
      "Perencanaan Project",
      "Perizinan & Legalitas",
      "Pengawasan & Pembangunan",
      "Promosi & Penjualan",
      "Maintenance After Sales",
    ],
  },
  {
    name: "Linear Property",
    tagline: "Sale & Rent Property",
    desc: "Bertindak sebagai perantara antara penjual dan pembeli dalam transaksi properti — jual beli atau sewa rumah, apartemen, tanah, hingga bangunan komersial.",
    services: [
      "Pemasaran properti multi-channel",
      "Analisis pasar & penilaian harga",
      "Dokumen legal jual beli / sewa",
      "Konsultasi regulasi & investasi",
      "Pendampingan proses KPR",
    ],
  },
  {
    name: "Linear Media",
    tagline: "Digital Media Development",
    desc: "Menyediakan layanan digital media development untuk bisnis — dari konten media sosial hingga strategi digital yang menyeluruh.",
    services: [
      "Strategic Social Media",
      "Content Development (IG / TikTok / YouTube)",
      "Media Rilis + Spreading",
      "360 Video Render & Real",
      "Review Property (YouTube & Reels)",
      "Google, YouTube & Meta Ads",
      "Video Profile, Booklet & Brosur",
    ],
  },
];

const team = [
  { name: "M. Reza Rangkuti", role: "Div. Bisnis & Development", photo: rezaImg },
  { name: "R. Angga Syafiadi", role: "Div. Operasional", photo: anggaImg },
  { name: "Raynaldo Faulana", role: "Div. Media & Promotion", photo: raynaldoImg },
];


function About() {
  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-24">
      <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Tentang Kami</div>
      <h1 className="font-display text-5xl md:text-6xl leading-tight max-w-3xl">
        Project Planning with <span className="italic">Creative Solution</span> Product Branding.
      </h1>

      <div className="mt-10 grid md:grid-cols-2 gap-10 text-muted-foreground leading-relaxed">
        <p>
          Linear Indonesia — PT. Linear Solusi Indonesia — didirikan pada tahun
          2022 sebagai perusahaan yang bergerak di bidang
          <em> Project Planning with Creative Solution Product Branding</em>.
          Kami hadir untuk membantu menciptakan dan merencanakan project yang
          meningkatkan <em>value</em> dan <em>brand image</em> dari setiap
          produk klien.
        </p>
        <p>
          Kami mengemas produk dengan desain yang sederhana dan kreatif,
          didukung strategi pemasaran yang terarah dan sistematis — sehingga
          mampu meningkatkan awareness dan penjualan produk itu sendiri.
          Linear Indonesia memiliki tiga unit bisnis utama:
          <strong> Linear Development</strong>,{" "}
          <strong>Linear Property</strong>, dan{" "}
          <strong>Linear Media</strong>.
        </p>
      </div>

      {/* Three business units */}
      <section className="mt-24">
        <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Our Service</div>
        <h2 className="font-display text-4xl md:text-5xl mb-10">Tiga Pilar Bisnis</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {units.map((u) => (
            <div key={u.name} className="p-8 rounded-2xl bg-secondary/50 border border-border flex flex-col">
              <h3 className="font-display text-2xl">{u.name}</h3>
              <div className="text-xs uppercase tracking-wider text-accent mt-1 mb-4">{u.tagline}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{u.desc}</p>
              <ul className="mt-auto space-y-2 text-sm">
                {u.services.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mt-24 grid md:grid-cols-3 gap-8">
        {[
          ["Kurasi", "Hanya properti dengan standar arsitektur dan lokasi terbaik yang kami tawarkan."],
          ["Transparansi", "Dokumen, harga, dan riwayat properti dibuka penuh kepada klien."],
          ["Pendampingan", "Konsultan personal mendampingi hingga proses serah terima selesai."],
        ].map(([t, d]) => (
          <div key={t} className="p-6 rounded-2xl bg-secondary/50">
            <h3 className="font-display text-2xl mb-2">{t}</h3>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className="mt-24">
        <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Our Team</div>
        <h2 className="font-display text-4xl md:text-5xl mb-10">Orang-orang di balik Linear</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl bg-card border border-border text-center overflow-hidden">
              <div className="aspect-square overflow-hidden bg-secondary">
                <img src={m.photo} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="font-display text-xl">{m.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-20 text-center">
        <Link
          to="/portfolio"
          className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Lihat Portofolio Kami
        </Link>
      </div>
    </main>
  );
}
