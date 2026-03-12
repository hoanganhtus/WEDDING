// localStorage keys & helpers for RSVP and Wishes data

export const STORAGE_KEYS = {
  RSVP: 'wedding_rsvp',
  WISHES: 'wedding_wishes',
} as const;

export interface RsvpEntry {
  id: string;
  ten: string;
  thamDu: 'co' | 'khong';
  soLuong: number;
  phia: 'nha-trai' | 'nha-gai';
  createdAt: string;
}

export interface WishEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ── RSVP ──
export function getRsvpList(): RsvpEntry[] {
  return read<RsvpEntry>(STORAGE_KEYS.RSVP);
}

export function addRsvp(entry: RsvpEntry) {
  const list = getRsvpList();
  list.unshift(entry);
  write(STORAGE_KEYS.RSVP, list);
}

export function deleteRsvp(id: string) {
  const list = getRsvpList().filter((e) => e.id !== id);
  write(STORAGE_KEYS.RSVP, list);
}

export function clearAllRsvp() {
  localStorage.removeItem(STORAGE_KEYS.RSVP);
}

// ── Wishes ──
export function getWishesList(): WishEntry[] {
  return read<WishEntry>(STORAGE_KEYS.WISHES);
}

export function addWish(entry: WishEntry) {
  const list = getWishesList();
  list.unshift(entry);
  write(STORAGE_KEYS.WISHES, list);
}

export function deleteWish(id: string) {
  const list = getWishesList().filter((e) => e.id !== id);
  write(STORAGE_KEYS.WISHES, list);
}

export function clearAllWishes() {
  localStorage.removeItem(STORAGE_KEYS.WISHES);
}
