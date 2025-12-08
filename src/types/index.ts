// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  avatar: string;
  role: 'student' | 'admin';
  clubs: string[];
  createdAt: string;
}

// Club Types
export interface ClubMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Club {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  projects: string[];
  members: ClubMember[];
  memberCount: number;
  createdAt: string;
}

// Post Types
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  title: string;
  content: string;
  clubId?: string;
  clubName: string;
  audience: 'public' | string;
  audienceName: string;
  taggedMembers: string[];
  media: string[];
  image?: string;
  likes: number;
  likedBy: string[];
  isLiked?: boolean;
  comments: number;
  createdAt: string;
}

// Request Types
export type RequestType = 'join' | 'create' | 'update';
export type RequestStatus = 'pending' | 'approved' | 'denied';

export interface Request {
  id: string;
  type: RequestType;
  status: RequestStatus;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  clubId: string;
  clubName: string;
  requestDate: string;
  processedDate?: string;
  denialReason?: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees?: number;
}

// Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Filter Types
export interface AdminFilters {
  requestType: RequestType | 'all';
  status: RequestStatus | 'all';
  startDate: string;
  endDate: string;
  search: string;
}

export interface PostFilters {
  audience: 'all' | 'public' | string;
  sort: 'latest' | 'popular';
}

// Form Types
export interface JoinClubFormData {
  studentId: string;
  fullName: string;
}

export interface CreatePostFormData {
  title: string;
  content: string;
  audience: 'public' | string;
  taggedMembers: string[];
  media: string[];
}
