import { useEffect, useState, useCallback } from "react";
import { defaultProperties, type Property } from "@/data/properties";

const STORAGE_KEY = "linearproperty:properties:v2";

function load(): Property[] {
  if (typeof window === "undefined") return defaultProperties;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProperties;
    const parsed = JSON.parse(raw) as Property[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultProperties;
    return parsed.map((p) => ({
      ...p,
      images: Array.isArray(p.images) ? p.images : [],
      highlights: Array.isArray(p.highlights) ? p.highlights : [],
    }));
  } catch {
    return defaultProperties;
  }
}

export function useProperties() {
  const [items, setItems] = useState<Property[]>(defaultProperties);

  useEffect(() => {
    setItems(load());
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(load());
    };
    const onCustom = () => setItems(load());
    window.addEventListener("storage", onStorage);
    window.addEventListener("linearproperty:properties-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("linearproperty:properties-changed", onCustom);
    };
  }, []);

  const save = useCallback((next: Property[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new Event("linearproperty:properties-changed"));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setItems(defaultProperties);
    window.dispatchEvent(new Event("linearproperty:properties-changed"));
  }, []);

  return { items, save, reset };
}
