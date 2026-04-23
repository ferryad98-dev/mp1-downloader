import { motion } from "framer-motion";
import { Download, Music, Video, Zap, Clock, Globe } from "lucide-react";
import { classifyQuality, type NexusResult, type MediaItem } from "@/lib/nexus-api";

interface Props {
  result: NexusResult;
}

const buttonStyles: Record<string, string> = {
  "no-watermark": "bg-success text-success-foreground hover:shadow-[0_0_25px_hsl(var(--success)/0.5)]",
  "hd": "bg-primary text-primary-foreground hover:shadow-neon-strong",
  "audio": "bg-zinc-700 text-zinc-100 hover:bg-zinc-600",
  "default": "bg-secondary text-secondary-foreground hover:bg-secondary/80",
};

const labelFor = (m: MediaItem, kind: string) => {
  if (kind === "no-watermark") return "Tanpa Watermark";
  if (kind === "audio") return `Audio MP3 ${m.quality ? `• ${m.quality}` : ""}`;
  if (kind === "hd") return `HD ${m.quality ? `• ${m.quality.toUpperCase()}` : ""}`;
  return m.quality || "Download";
};

const iconFor = (kind: string) => {
  if (kind === "audio") return <Music className="w-4 h-4" />;
  if (kind === "no-watermark") return <Zap className="w-4 h-4" />;
  if (kind === "hd") return <Video className="w-4 h-4" />;
  return <Download className="w-4 h-4" />;
};

export const ResultCard = ({ result }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto mt-10 relative"
    >
      <div className="absolute -inset-px bg-gradient-primary rounded-3xl opacity-40 blur-md" />
      <div className="relative p-6 rounded-3xl bg-card/90 backdrop-blur-xl border border-primary/20 shadow-card-premium">
        <div className="grid md:grid-cols-[260px_1fr] gap-6">
          <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-video md:aspect-[3/4] group">
            <img
              src={result.thumbnail}
              alt={result.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {result.duration && (
              <span className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-background/80 backdrop-blur text-xs font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {result.duration}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 min-w-0">
            <div className="flex items-center gap-2 text-xs text-primary uppercase tracking-wider font-semibold">
              <Globe className="w-3 h-3" />
              {result.source}
            </div>
            <h3 className="text-lg md:text-xl font-bold leading-snug line-clamp-3">
              {result.title || "Media siap diunduh"}
            </h3>

            <div className="mt-auto flex flex-col gap-2">
              {result.medias.map((m, i) => {
                const kind = classifyQuality(m);
                return (
                  <a
                    key={i}
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all min-h-[48px] ${buttonStyles[kind]}`}
                  >
                    <span className="flex items-center gap-2">
                      {iconFor(kind)}
                      {labelFor(m, kind)}
                    </span>
                    <span className="flex items-center gap-1 opacity-90">
                      <span className="text-xs uppercase opacity-80">.{m.extension}</span>
                      <Download className="w-4 h-4" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
