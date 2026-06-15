import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak \u2014 Linear Property" },
      { name: "description", content: "Hubungi tim Linear Property untuk konsultasi properti gratis." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("nama") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("pesan") as HTMLTextAreaElement)?.value || "";

    if (!name.trim() || !message.trim()) {
      toast.error("Nama dan pesan wajib diisi!");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setSent(true);
        toast.success("Pesan terkirim! Kami akan segera menghubungi Anda.");
        form.reset();
      } else {
        toast.error("Gagal mengirim pesan. Coba lagi.");
      }
    } catch {
      toast.error("Gagal mengirim pesan. Periksa koneksi Anda.");
    }
    setSending(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 lg:px-10 pt-16">
      <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Hubungi Kami</div>
      <h1 className="font-display text-5xl md:text-6xl leading-tight">
        Mari bercerita tentang <span className="italic">rumah impian</span> Anda.
      </h1>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Nama</label>
            <input name="nama" className="mt-1 w-full bg-transparent border-b border-border focus:border-accent outline-none py-2" placeholder="Nama lengkap" required />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
            <input name="email" type="email" className="mt-1 w-full bg-transparent border-b border-border focus:border-accent outline-none py-2" placeholder="email@anda.com" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Pesan</label>
            <textarea name="pesan" rows={4} className="mt-1 w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 resize-none" placeholder="Ceritakan kebutuhan properti Anda…" required />
          </div>
          <button type="submit" disabled={sending} className="px-7 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50">
            {sending ? "Mengirim..." : sent ? "\u2713 Terkirim!" : "Kirim Pesan"}
          </button>
          {sent && (
            <p className="text-sm text-accent">Pesan Anda sudah diterima. Tim kami akan segera menghubungi Anda.</p>
          )}
        </form>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-accent mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div>muhmmdidris11@gmail.com</div>
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
              <div>Jl. Rambutan No.10, Jatimekar, Jatiasih, Bekasi</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
