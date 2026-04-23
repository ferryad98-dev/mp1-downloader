import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Zap } from "lucide-react";
import { SearchBar } from "@/components/nexus/SearchBar";
import { ResultCard } from "@/components/nexus/ResultCard";
import { SkeletonCard } from "@/components/nexus/SkeletonCard";
import { HistoryList } from "@/components/nexus/HistoryList";
import { fetchNexus, getHistory, saveToHistory, type NexusResult } from "@/lib/nexus-api";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NexusResult | null>(null);
  const [history, setHistory] = useState<NexusResult[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await fetchNexus(url);
      setResult(data);
      saveToHistory(data);
      setHistory(getHistory());
    } catch (e: any) {
      setError(e?.message || "Terjadi kesalahan tak terduga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-glow pointer-events-none" />

      <div className="relative container mx-auto px-4 py-10 md:py-20">
        {/* Brand chip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/60 border border-primary/30 backdrop-blur text-xs font-medium">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-75 pulse-ring" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
            </span>
           <span className="text-muted-foreground">Powered by MP1 Downloader</span>
          </div>
        </motion.div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span className="text-gradient">MP1 Downloader</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Unduh Video <span className="text-foreground font-semibold">Unduh Video TikTok, Instagram, Facebook, YouTube, X, Threads, Snapchat, Reddit & 40+ Platform</span>{" "}
            Tanpa Watermark secara Instan.
          </p>
        </motion.section>

        {/* Search */}
        <SearchBar onSubmit={handleSubmit} loading={loading} />

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-6 text-xs text-muted-foreground"
        >
          {["100% Gratis", "Tanpa Watermark", "Kualitas HD", "MP3 Audio"].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-card/40 border border-border flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* States */}
        {loading && <SkeletonCard />}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto mt-10 p-5 rounded-3xl bg-destructive/10 border border-destructive/40 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Gagal memuat media</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {result && !loading && <ResultCard result={result} />}

        {/* History */}
        <HistoryList items={history} onSelect={(item) => setResult(item)} />

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
          <p>
            <span className="text-gradient font-semibold">MP1 Downloader</span> • By @PelerMonyetProject
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
