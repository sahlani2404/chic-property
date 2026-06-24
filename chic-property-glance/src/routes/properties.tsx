import { createFileRoute } from "@tanstack/react-router";
import { PropertyCard } from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properti — Linear Property" },
      { name: "description", content: "Koleksi villa, rumah, dan apartemen terpilih dari Linear Property." },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const { items: properties } = useProperties();
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-10 pt-16">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Koleksi 2026</div>
        <h1 className="font-display text-5xl md:text-6xl leading-tight">
          Setiap properti memiliki <span className="italic">jiwanya</span> sendiri.
        </h1>
        <p className="mt-6 text-muted-foreground text-lg">
          Klik foto rumah untuk melihat deskripsi lengkap dalam pop-up.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
      </div>
    </main>
  );
}
