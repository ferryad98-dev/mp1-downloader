import { History, Play } from "lucide-react";
import { motion } from "framer-motion";
import type { NexusResult } from "@/lib/nexus-api";

interface Props {
  items: NexusResult[];
  onSelect: (item: NexusResult) => void;
}

export const HistoryList = ({ items, onSelect }: Props) => {
  if (items.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
        <History className="w-4 h-4" />
        <span className="font-medium">Riwayat Terakhir</span>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(item)}
            className="group text-left p-2 rounded-2xl bg-card/60 border border-border hover:border-primary/40 hover:shadow-neon transition-all"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary mb-2">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Play className="w-8 h-8 text-primary" />
              </div>
            </div>
            <p className="text-xs font-medium line-clamp-2 px-1">{item.title}</p>
            <p className="text-[10px] text-primary uppercase tracking-wider px-1 mt-1">{item.source}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
};
