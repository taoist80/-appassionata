import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Layout = "classic" | "editorial";

const STORAGE_KEY = "site-layout";

interface LayoutContextValue {
  layout: Layout;
  setLayout: (l: Layout) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

/** Holds the active page layout, persisted per-visitor. Default: classic. */
export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<Layout>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "editorial"
        ? "editorial"
        : "classic";
    } catch {
      return "classic";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, layout);
    } catch {
      /* ignore */
    }
  }, [layout]);

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout(): LayoutContextValue {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within a LayoutProvider");
  return ctx;
}
