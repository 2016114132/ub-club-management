'use client';

import { STORAGE_KEYS } from './constants';
import { initialClubs } from './data/clubs';
import { initialPosts } from './data/posts';
import { initialRequests } from './data/requests';
import { initialEvents } from './data/events';
import { initialUsers } from './data/users';
import type { Club, Post, Request, Event, User } from '@/types';

// Generic storage functions
function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Initialize data on first load
export function initializeData(): void {
  if (typeof window === 'undefined') return;

  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (initialized) return;

  setItem(STORAGE_KEYS.CLUBS, initialClubs);
  setItem(STORAGE_KEYS.POSTS, initialPosts);
  setItem(STORAGE_KEYS.REQUESTS, initialRequests);
  setItem(STORAGE_KEYS.EVENTS, initialEvents);
  setItem(STORAGE_KEYS.USERS, initialUsers);

  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
}

// Reset all data to initial state
export function resetData(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  initializeData();
}

// Club operations
export function getClubs(): Club[] {
  return getItem<Club[]>(STORAGE_KEYS.CLUBS, initialClubs);
}

export function getClubById(id: string): Club | undefined {
  const clubs = getClubs();
  return clubs.find((club) => club.id === id);
}

export function saveClubs(clubs: Club[]): void {
  setItem(STORAGE_KEYS.CLUBS, clubs);
}

// Post operations
export function getPosts(): Post[] {
  return getItem<Post[]>(STORAGE_KEYS.POSTS, initialPosts);
}

export function savePosts(posts: Post[]): void {
  setItem(STORAGE_KEYS.POSTS, posts);
}

export function addPost(post: Post): void {
  const posts = getPosts();
  savePosts([post, ...posts]);
}

export function updatePost(postId: string, updates: Partial<Post>): void {
  const posts = getPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    savePosts(posts);
  }
}

// Request operations
export function getRequests(): Request[] {
  return getItem<Request[]>(STORAGE_KEYS.REQUESTS, initialRequests);
}

export function saveRequests(requests: Request[]): void {
  setItem(STORAGE_KEYS.REQUESTS, requests);
}

export function addRequest(request: Request): void {
  const requests = getRequests();
  saveRequests([...requests, request]);
}

export function updateRequest(requestId: string, updates: Partial<Request>): void {
  const requests = getRequests();
  const index = requests.findIndex((r) => r.id === requestId);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    saveRequests(requests);
  }
}

export function updateRequestsBulk(requestIds: string[], updates: Partial<Request>): void {
  const requests = getRequests();
  const updatedRequests = requests.map((r) =>
    requestIds.includes(r.id) ? { ...r, ...updates } : r
  );
  saveRequests(updatedRequests);
}

// Event operations
export function getEvents(): Event[] {
  return getItem<Event[]>(STORAGE_KEYS.EVENTS, initialEvents);
}

// User operations
export function getUsers(): User[] {
  return getItem<User[]>(STORAGE_KEYS.USERS, initialUsers);
}

export function getUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find((user) => user.id === id);
}
