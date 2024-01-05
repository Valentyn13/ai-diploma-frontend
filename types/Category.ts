export interface Category {
  id: string;
  title: string;
  info?: string | null;
  height?: string;
  meditations: Record<string, unknown>[];
  order: number;
}
