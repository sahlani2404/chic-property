import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Upload, X, Save, RotateCcw, GripVertical } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import type { Property } from "@/data/properties";
import { AdminGate } from "@/components/AdminGate";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Linear Property" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  return (
    <AdminGate>
      <AdminPage />
    </AdminGate>
  );
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyProperty(): Property {
  return {
    id: uid(),
    title: "Properti Baru",
    location: "",
    price: "",
    images: [],
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "Rumah",
    description: "",
    highlights: [],
  };
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function compressImage(file: File, maxW = 1200, maxH = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxW) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          }
        } else {
          if (height > maxH) {
            width = Math.round((width * maxH) / height);
            height = maxH;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AdminPage() {
  const { items, save, reset } = useProperties();
  const [draft, setDraft] = useState<Property[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const list = draft ?? items;
  const dirty = draft !== null;

  const update = (id: string, patch: Partial<Property>) => {
    setDraft((list).map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const setDraftAll = (next: Property[]) => setDraft(next);

  const remove = (id: string) => setDraftAll(list.filter((p) => p.id !== id));
  const add = () => setDraftAll([emptyProperty(), ...list]);

  const move = (id: string, dir: -1 | 1) => {
    const i = list.findIndex((p) => p.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    const copy = [...list];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setDraftAll(copy);
  };

  const onUpload = async (id: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const loadingToast = toast.loading("Mengompresi dan mengunggah foto...");
    try {
      const urls = await Promise.all(Array.from(files).map((f) => compressImage(f)));
      const target = list.find((p) => p.id === id)!;
      update(id, { images: [...target.images, ...urls] });
      toast.success(`${files.length} foto berhasil diunggah!`, { id: loadingToast });
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengunggah foto.", { id: loadingToast });
    }
  };

  const removeImage = (id: string, index: number) => {
    const target = list.find((p) => p.id === id)!;
    update(id, { images: target.images.filter((_, i) => i !== index) });
  };

  const moveImage = (id: string, index: number, dir: -1 | 1) => {
    const target = list.find((p) => p.id === id)!;
    const j = index + dir;
    if (j < 0 || j >= target.images.length) return;
    const imgs = [...target.images];
    [imgs[index], imgs[j]] = [imgs[j], imgs[index]];
    update(id, { images: imgs });
  };

  const handleSave = () => {
    setSaving(true);
    try {
      save(list);
      setDraft(null);
      setSavedAt(Date.now());
      toast.success("Perubahan berhasil disimpan!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan perubahan. Ukuran foto terlalu besar untuk memori browser.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Kembalikan ke data awal? Semua perubahan akan hilang.")) {
      reset();
      setDraft(null);
      toast.success("Data berhasil direset ke pengaturan awal.");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Panel Admin</div>
          <h1 className="font-display text-4xl md:text-5xl">Kelola Properti</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={add}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Tambah Properti
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-sm hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!dirty || saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm hover:opacity-90 disabled:opacity-40"
          >
            <Save className="h-4 w-4" /> Simpan Perubahan
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        Semua perubahan disimpan otomatis di browser ini ({" "}
        <code className="text-xs">localStorage</code>). Tidak perlu database.
        {savedAt && !dirty && <span className="ml-2 text-accent">✓ Tersimpan</span>}
        {dirty && <span className="ml-2 text-accent">• Perubahan belum disimpan</span>}
      </p>

      <div className="space-y-6">
        {list.map((p, i) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                <span>#{i + 1}</span>
                <button onClick={() => move(p.id, -1)} className="px-2 py-1 rounded hover:bg-secondary">↑</button>
                <button onClick={() => move(p.id, 1)} className="px-2 py-1 rounded hover:bg-secondary">↓</button>
              </div>
              <button
                onClick={() => remove(p.id)}
                className="inline-flex items-center gap-1.5 text-sm text-destructive hover:underline"
              >
                <Trash2 className="h-4 w-4" /> Hapus
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <Field label="Nama Properti">
                <input className="input" value={p.title} onChange={(e) => update(p.id, { title: e.target.value })} />
              </Field>
              <Field label="Lokasi">
                <input className="input" value={p.location} onChange={(e) => update(p.id, { location: e.target.value })} />
              </Field>
              <Field label="Harga">
                <input className="input" value={p.price} onChange={(e) => update(p.id, { price: e.target.value })} placeholder="Rp 5 M" />
              </Field>
              <Field label="Tipe">
                <select className="input" value={p.type} onChange={(e) => update(p.id, { type: e.target.value })}>
                  <option>Villa</option>
                  <option>Rumah</option>
                  <option>Apartemen</option>
                  <option>Townhouse</option>
                </select>
              </Field>
              <Field label="Kamar Tidur">
                <input type="number" className="input" value={p.bedrooms} onChange={(e) => update(p.id, { bedrooms: +e.target.value })} />
              </Field>
              <Field label="Kamar Mandi">
                <input type="number" className="input" value={p.bathrooms} onChange={(e) => update(p.id, { bathrooms: +e.target.value })} />
              </Field>
              <Field label="Luas (m²)">
                <input type="number" className="input" value={p.area} onChange={(e) => update(p.id, { area: +e.target.value })} />
              </Field>
              <Field label="Fasilitas (pisahkan dengan koma)">
                <input
                  className="input"
                  value={p.highlights.join(", ")}
                  onChange={(e) => update(p.id, { highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                />
              </Field>
            </div>

            <Field label="Deskripsi">
              <textarea
                className="input min-h-[100px]"
                value={p.description}
                onChange={(e) => update(p.id, { description: e.target.value })}
              />
            </Field>

            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Foto ({p.images.length})</label>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary text-secondary-foreground text-xs cursor-pointer hover:opacity-90">
                  <Upload className="h-3.5 w-3.5" /> Unggah foto
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      onUpload(p.id, e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              {p.images.length === 0 ? (
                <div className="text-sm text-muted-foreground bg-muted rounded-lg p-6 text-center">
                  Belum ada foto. Unggah satu atau beberapa foto sekaligus.
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {p.images.map((src, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-accent text-accent-foreground text-[10px] font-medium">
                          Cover
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => moveImage(p.id, idx, -1)}
                          className="h-7 w-7 rounded-full bg-background grid place-items-center text-xs"
                          title="Geser kiri"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => moveImage(p.id, idx, 1)}
                          className="h-7 w-7 rounded-full bg-background grid place-items-center text-xs"
                          title="Geser kanan"
                        >
                          →
                        </button>
                        <button
                          onClick={() => removeImage(p.id, idx)}
                          className="h-7 w-7 rounded-full bg-destructive text-destructive-foreground grid place-items-center"
                          title="Hapus"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .input {
          width: 100%;
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          padding: 0.55rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus { border-color: hsl(var(--accent)); }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground block mb-1.5">{label}</span>
      {children}
    </label>
  );
}
