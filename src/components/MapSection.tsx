import { useEffect, useRef } from "react";
export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapRef.current || mapRef.current.dataset.initialized) return;
    mapRef.current.dataset.initialized = "true";
    if (!document.querySelector("link[href*=leaflet]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;
      const map = L.map(mapRef.current).setView([-6.2833619, 106.9567047], 16);
      L.tileLayer("https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=6BZeoKkec36IvFDYsUTj", { attribution: "MapTiler" }).addTo(map);
      L.marker([-6.2833619, 106.9567047]).addTo(map).bindPopup("<b>Linear Property</b><br>Jl. Rambutan No.10").openPopup();
    };
    document.body.appendChild(script);
  }, []);
  return <div ref={mapRef} className="w-full h-[400px] rounded-2xl" />;
}
