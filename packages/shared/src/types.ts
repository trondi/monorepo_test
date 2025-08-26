/**
 * 공통 사용자 타입
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API 응답 타입
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * 페이지네이션 타입
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * 페이지네이션된 응답 타입
 */
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: Pagination;
}

/**
 * 로딩 상태 타입
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * 테마 타입
 */
export type Theme = 'light' | 'dark' | 'system';
