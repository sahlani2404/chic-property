  import { useState } from "react";
  import { Bed, Bath, Maximize2, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
  import type { Property } from "@/data/properties";
  import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

  export function PropertyCard({ property }: { property: Property }) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);

    const images = property.images.length > 0 ? property.images : [""];
    const cover = images[0];
    const total = images.length;
    const prev = () => setIdx((i) => (i - 1 + total) % total);
    const next = () => setIdx((i) => (i + 1) % total);

    return (
      <>
        <button
          onClick={() => {
            setIdx(0);
            setOpen(true);
          }}
          className="group text-left block w-full"
        >
          <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/5]">
            <img
            src={cover}
            alt={property.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-80" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 text-foreground text-xs font-medium">
              {property.type}
            </div>
            {total > 1 && (
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-background/90 text-foreground text-xs font-medium">
                {total} foto
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <div className="flex items-center gap-1 text-xs opacity-90 mb-1">
                <MapPin className="h-3 w-3" /> {property.location}
              </div>
              <h3 className="font-display text-2xl leading-tight">{property.title}</h3>
              <div className="mt-1 text-accent font-medium">{property.price}</div>
            </div>
          </div>
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0 gap-0 border-0" hideClose>
  <DialogTitle className="sr-only">{property.title}</DialogTitle>

  <div className="relative bg-black h-[75vh] flex items-center justify-center">
    <img
      src={images[idx]}
      alt={`${property.title} — foto ${idx + 1}`}
      className="max-h-full max-w-full object-contain"
    />

    {total > 1 && (
      <>
        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 hover:bg-background grid place-items-center"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 hover:bg-background grid place-items-center"
          aria-label="Foto berikutnya"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Lihat foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 text-foreground text-xs">
          {idx + 1} / {total}
        </div>
      </>
    )}

    <button
      onClick={() => setOpen(false)}
      className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 hover:bg-background grid place-items-center"
      aria-label="Tutup"
    >
      <X className="h-4 w-4" />
    </button>
  </div>

  {total > 1 && (
    <div className="px-6 pt-4 flex gap-2 overflow-x-auto">
      {images.map((src, i) => (
        <button
          key={i}
          onClick={() => setIdx(i)}
          className={`shrink-0 h-16 w-20 rounded-md overflow-hidden border-2 transition ${
            i === idx
              ? "border-accent"
              : "border-transparent opacity-70 hover:opacity-100"
          }`}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>
  )}

  <div className="p-6 md:p-8">
    <div className="mb-5">
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
        <MapPin className="h-3 w-3" />
        {property.location}
      </div>

      <h2 className="font-display text-3xl md:text-4xl">
        {property.title}
      </h2>
    </div>

    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="text-2xl font-display text-accent">
        {property.price}
      </div>

      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Bed className="h-4 w-4" />
          {property.bedrooms} Kamar
        </span>

        <span className="flex items-center gap-1.5">
          <Bath className="h-4 w-4" />
          {property.bathrooms} Mandi
        </span>

        <span className="flex items-center gap-1.5">
          <Maximize2 className="h-4 w-4" />
          {property.area} m²
        </span>
      </div>
    </div>

    <p className="text-foreground/80 leading-relaxed mb-6">
      {property.description}
    </p>

    {property.highlights.length > 0 && (
      <div>
        <h4 className="text-sm font-semibold mb-3">
          Fasilitas Unggulan
        </h4>

        <div className="flex flex-wrap gap-2">
          {property.highlights.map((h) => (
            <span
              key={h}
              className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    )}

    <button className="mt-8 w-full md:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">
      Jadwalkan Kunjungan
    </button>
  </div>
</DialogContent>
        </Dialog>
      </>
    );
  }
