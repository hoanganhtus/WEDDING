// API utilities
const API_URL = "http://localhost:8000/api";

export interface RsvpData {
  name: string;
  is_attending: 'co' | 'khong';
  guest_count: number;
  side: 'co-dau' | 'chu-re';
}

export interface WishData {
  name: string;
  message: string;
  side: 'co-dau' | 'chu-re';
}

export interface RsvpEntry {
  id: string;
  name: string;
  thamDu: 'co' | 'khong';
  soLuong: number;
  phia: 'co-dau' | 'chu-re';
  createdAt: string;
}

export interface WishEntry {
  id: string;
  name: string;
  message: string;
  side: 'co-dau' | 'chu-re';
  created_at: string;
}

// RSVP
export async function submitRsvp(data: RsvpData) {
  const response = await fetch(`${API_URL}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit RSVP');
  return response.json();
}

export async function getRsvpList(side?: 'co-dau' | 'chu-re'): Promise<RsvpEntry[]> {
  const url = side ? `${API_URL}/rsvp?side=${side}` : `${API_URL}/rsvp`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch RSVP');
  return response.json();
}

export async function deleteRsvp(id: string | number) {
  const response = await fetch(`${API_URL}/rsvp/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete RSVP');
  return response.json();
}

// Wishes
export async function submitWish(data: WishData) {
  const response = await fetch(`${API_URL}/wishes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit wish');
  return response.json();
}

export async function getWishesList(side?: 'co-dau' | 'chu-re'): Promise<WishEntry[]> {
  const url = side ? `${API_URL}/wishes?side=${side}` : `${API_URL}/wishes`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch wishes');
  return response.json();
}

export async function deleteWish(id: string | number) {
  const response = await fetch(`${API_URL}/wishes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete wish');
  return response.json();
}
