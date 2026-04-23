export interface MediaItem {
  url: string;
  quality: string;
  extension: string;
  size?: number;
  formattedSize?: string;
  videoAvailable: boolean;
  audioAvailable: boolean;
}

export interface NexusResult {
  url: string;
  title: string;
  thumbnail: string;
  duration?: string;
  source: string;
  medias: MediaItem[];
}

const API_BASE = "https://backend-api-all-social-media-downlo-nu.vercel.app/api/download";

export async function fetchNexus(url: string): Promise<NexusResult> {
  const res = await fetch(`${API_BASE}?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error("Gagal menghubungi server. Coba lagi nanti.");
  const data = await res.json();
  if (!data || !data.medias || data.medias.length === 0) {
    throw new Error("Tautan tidak valid atau media tidak ditemukan.");
  }
  return data as NexusResult;
}

const HISTORY_KEY = "nexus-saver:history";

export function getHistory(): NexusResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as NexusResult[]) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(result: NexusResult) {
  try {
    const current = getHistory().filter((h) => h.url !== result.url);
    const next = [result, ...current].slice(0, 3);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function classifyQuality(m: MediaItem): "no-watermark" | "hd" | "audio" | "default" {
  const q = (m.quality || "").toLowerCase();
  if (m.extension === "mp3" || !m.videoAvailable) return "audio";
  if (q.includes("no_watermark") || q.includes("nowatermark") || q.includes("no watermark")) return "no-watermark";
  if (q.includes("hd") || q.includes("full")) return "hd";
  return "default";
}
