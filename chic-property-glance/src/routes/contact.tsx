import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — Linear Property" },
      { name: "description", content: "Hubungi tim Linear Property untuk konsultasi properti gratis." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <main className="max-w-5xl mx-auto px-6 lg:px-10 pt-16">
      <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Hubungi Kami</div>
      <h1 className="font-display text-5xl md:text-6xl leading-tight">
        Mari bercerita tentang <span className="italic">rumah impian</span> Anda.
      </h1>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama</label>
            <input className="mt-1 w-full bg-transparent border-b border-border focus:border-accent outline-none py-2" placeholder="Nama lengkap" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
            <input type="email" className="mt-1 w-full bg-transparent border-b border-border focus:border-accent outline-none py-2" placeholder="email@anda.com" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Pesan</label>
            <textarea rows={4} className="mt-1 w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 resize-none" placeholder="Ceritakan kebutuhan properti Anda…" />
          </div>
          <button className="px-7 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">
            Kirim Pesan
          </button>
        </form>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-accent mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div>halo@linearproperty.id</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-accent mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">Telepon</div>
              <a href="https://wa.me/6285697241050" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                +62 856 9724 1050
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-accent mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">Kantor Pusat</div>
              <div>Jl. Senopati No. 88, Jakarta Selatan</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
