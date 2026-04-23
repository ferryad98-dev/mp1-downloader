import { useState } from "react";
import { ClipboardPaste, Download, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export const SearchBar = ({ onSubmit, loading }: Props) => {
  const [value, setValue] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue(text);
    } catch {
      /* ignore */
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !loading) onSubmit(value.trim());
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="relative w-full max-w-3xl mx-auto"
    >
      <div className="absolute -inset-1 bg-gradient-primary rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition" />
      <div className="relative flex flex-col sm:flex-row items-stretch gap-2 p-2 bg-card/80 backdrop-blur-xl border border-primary/30 rounded-3xl shadow-neon">
        <div className="flex items-center flex-1 gap-2 px-4">
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <input
            type="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tempel link TikTok, Instagram, Facebook, atau YouTube..."
            className="flex-1 bg-transparent outline-none py-3 text-base placeholder:text-muted-foreground/70"
            required
          />
          <button
            type="button"
            onClick={handlePaste}
            className="p-2 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition shrink-0"
            aria-label="Paste"
          >
            <ClipboardPaste className="w-5 h-5" />
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-neon-strong transition-all min-h-[48px]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memproses</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Unduh</span>
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};
